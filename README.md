# Montiuk · Landing de conversión

Landing en español de Argentina con Next.js App Router, React, TypeScript y Tailwind CSS 4. Lista para importar en Vercel.

## Desarrollo

Requiere Node.js 20.9 o superior (recomendado: 22 LTS).

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000.

## Validación

```sh
npm run build
npm run typecheck
npx playwright install chromium
npm run test:e2e
```

Las pruebas cubren escritorio y móvil, imágenes, navegación, preguntas frecuentes, campos obligatorios y el mensaje de WhatsApp. Interceptan la apertura de WhatsApp: no envían consultas.

## Desplegar en Vercel

1. Subir este proyecto a un repositorio de GitHub, GitLab o Bitbucket.
2. En Vercel, seleccionar **Add New → Project** e importar el repositorio.
3. Seleccionar **Next.js**, usar la raíz del repositorio y mantener los valores predeterminados: instalación con npm, compilación `npm run build`, salida administrada por Next.js.
4. Hacer **Deploy** y revisar la URL de vista previa. Vincular el dominio desde **Settings → Domains** cuando corresponda reemplazar la web actual.

No requiere variables de entorno ni base de datos. La web se prerenderiza; las interacciones del menú y la cotización usan componentes cliente. Next.js optimiza las imágenes locales.

Los comandos de desarrollo y compilación usan Webpack, compatible con Vercel, para evitar una restricción de puertos internos de Turbopack en el entorno local.

## Contenido y conversiones

- Mensaje principal: puertas cortafuego y de emergencia, asesoramiento y presupuesto.
- WhatsApp de contacto: **+54 9 11 6279 9615**. Configuración en `src/lib/site.ts`.
- Botones directos a WhatsApp, consultas específicas por producto y formulario de cuatro campos (dos obligatorios).
- El formulario prepara un mensaje y abre WhatsApp; el visitante debe confirmar el envío. No almacena datos ni afirma que la consulta ya fue enviada. Incluye enlace alternativo si el navegador bloquea la ventana.
- Catálogo: enlace al PDF original de Montiuk; se mantiene remoto por su tamaño (aproximadamente 75 MB).
- Metadatos para buscadores y redes sociales, sitemap, robots, navegación por teclado y adaptación a movimiento reducido.
- No se instalaron rastreadores ni se inventaron testimonios, métricas o plazos de entrega. Para medir conversiones reales hay que conectar la herramienta de analítica que el negocio elija.

## Fuentes y datos a mantener

Se usaron el logo proporcionado y las fotos, oferta y datos públicos de [Montiuk](https://www.montiukaberturas.com/), [puertas](https://www.montiukaberturas.com/puertas.html), [accesorios](https://www.montiukaberturas.com/accesorios.html) y el [pie de contacto](https://www.montiukaberturas.com/includes/footer.html).

Las certificaciones se describen por línea/configuración, no como certificación de todos los productos. Conviene mantener actualizados el alcance de cada certificado, los modelos, el catálogo y la disponibilidad de instalación. No se agregó una cifra de antigüedad porque la web original presentaba datos inconsistentes.

Componentes principales: `src/app/page.tsx`, `src/components/header.tsx`, `src/components/contact.tsx`. Diseño y tema Tailwind: `src/app/globals.css`. Metadatos: `src/app/layout.tsx`.

Configuración basada en la [documentación de Next.js](https://nextjs.org/docs/app/getting-started/installation) y la [integración oficial de Tailwind con Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
