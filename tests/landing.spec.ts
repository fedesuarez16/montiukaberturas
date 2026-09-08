import { test, expect } from '@playwright/test';

test('the page loads with working assets, metadata, and no horizontal overflow', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page).toHaveTitle(/Puertas cortafuego y de emergencia/);
  await expect(page.locator('h1')).toContainText('buena puerta');
  await page.locator('footer').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(new URL(canonical!).href).toBe('https://www.montiukaberturas.com/');
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: testInfo.outputPath('landing-viewport.png'), scale: 'css' });
  await page.screenshot({ path: testInfo.outputPath('landing-full.png'), fullPage: true, scale: 'css' });
});

test('product selection prepares a correctly addressed, encoded WhatsApp inquiry', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Cotizar puertas cortafuego', exact: true }).click();
  await expect(page.locator('#product')).toHaveValue('Puertas cortafuego');
  await page.getByLabel('Tu nombre').fill('María Pérez');
  await page.getByLabel('Localidad de la obra').fill('Córdoba');
  await page.getByLabel('Contanos un poco más').fill('2 puertas de 90 × 200 cm. Obra A&B.');
  // Capture the handoff locally; never send an actual inquiry.
  await page.evaluate(() => { window.open = (url) => { (window as unknown as { capturedUrl: string }).capturedUrl = String(url); return null; }; });
  await page.getByRole('button', { name: 'Pedir presupuesto por WhatsApp' }).click();
  await expect(page.getByRole('status')).toContainText('Completá el envío en WhatsApp');
  const href = await page.locator('#whatsapp-fallback').getAttribute('href');
  const url = new URL(href!);
  expect(url.hostname).toBe('wa.me');
  expect(url.pathname).toBe('/5491162799615');
  expect(url.searchParams.get('text')).toContain('María Pérez');
  expect(url.searchParams.get('text')).toContain('Puertas cortafuego');
  expect(url.searchParams.get('text')).toContain('Córdoba');
  expect(url.searchParams.get('text')).toContain('Obra A&B.');
  expect(await page.evaluate(() => (window as unknown as { capturedUrl: string }).capturedUrl)).toBe(href);
  await page.getByLabel('Contanos un poco más').fill('Otra consulta');
  await expect(page.getByRole('status')).toHaveCount(0);
});

test('required inputs prevent empty inquiries and FAQ answers expand', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Pedir presupuesto por WhatsApp' }).click();
  await expect(page.locator('#name')).toBeFocused();
  await expect(page.getByRole('status')).toHaveCount(0);
  const question = page.locator('summary').filter({ hasText: '¿Las puertas cortafuego están certificadas?' });
  await question.click();
  await expect(question.locator('..')).toHaveAttribute('open', '');
  await expect(question.locator('..').locator('p')).toBeVisible();
  await question.click();
  await expect(question.locator('..').locator('p')).toBeHidden();
});

test('mobile navigation opens, closes after selection, and handles Escape', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile-only menu');
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Abrir menú' });
  await menu.click();
  await expect(page.locator('#navigation')).toBeVisible();
  await page.locator('#navigation').getByRole('link', { name: 'Soluciones', exact: true }).click();
  await expect(page.locator('#navigation')).toBeHidden();
  await menu.click();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
});
