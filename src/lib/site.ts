export const site = {
  name: 'Montiuk Seguridad Industrial',
  url: 'https://www.montiukaberturas.com',
  whatsapp: '5491162799615',
  email: 'montiuk.aberturas@gmail.com',
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const products = ['Puertas cortafuego', 'Puertas de emergencia', 'Accesorios y herrajes', 'Necesito asesoramiento'];
