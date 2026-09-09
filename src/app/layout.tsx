import type { Metadata, Viewport } from 'next';
import { site } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Puertas cortafuego y de emergencia | Montiuk',
  description: 'Puertas cortafuego con homologación INTI FR30, FR60, FR90 y FR120, puertas de emergencia y accesorios. Asesoramiento para tu obra y envíos a todo el país.',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Montiuk · Puertas que protegen. Soluciones que dan tranquilidad.',
    description: 'Puertas cortafuego, de emergencia y accesorios. Encontrá la solución para tu obra con asesoramiento especializado.',
    type: 'website', locale: 'es_AR', url: '/', siteName: site.name,
    images: [{ url: '/images/puerta-emergencia.jpg', width: 1920, height: 700, alt: 'Puertas de emergencia Montiuk' }],
  },
  twitter: { card: 'summary_large_image' },
};
export const viewport: Viewport = { themeColor: '#20211f' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Manrope:wght@400;500;600;650;700;750;800&display=swap" rel="stylesheet" />
  </head><body>{children}</body></html>;
}
