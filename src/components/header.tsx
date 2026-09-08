'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './icon';

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    function keydown(event: KeyboardEvent) {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    }
    function outside(event: MouseEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('keydown', keydown);
    document.addEventListener('click', outside);
    return () => { document.removeEventListener('keydown', keydown); document.removeEventListener('click', outside); };
  }, [open]);

  return <header ref={header} className="header">
    <div className="site-container nav-wrap">
      <a className="brand" href="#inicio" aria-label="Montiuk, inicio" onClick={() => setOpen(false)}><Image src="/images/montiuk-logo.png" width={1244} height={357} alt="Montiuk Seguridad Industrial" priority sizes="190px" /></a>
      <nav className={`navigation ${open ? 'is-open' : ''}`} id="navigation" aria-label="Navegación principal">
        {[['#soluciones', 'Soluciones'], ['#por-que-montiuk', 'Por qué Montiuk'], ['#preguntas', 'Preguntas frecuentes']].map(([href, title]) => <a key={href} href={href} onClick={() => setOpen(false)}>{title}</a>)}
      </nav>
      <a className="button button-small header-cta" href="#contacto" onClick={() => setOpen(false)}>Pedí tu presupuesto <Icon name="up-right" /></a>
      <button ref={toggle} className="menu-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-controls="navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
  </header>;
}
