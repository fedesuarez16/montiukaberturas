'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { products, whatsappUrl } from '@/lib/site';
import { Icon } from './icon';

export function ProductLink({ product, children }: { product: string; children: React.ReactNode }) {
  return <a className="product-link" href="#contacto" onClick={() => {
    window.dispatchEvent(new CustomEvent('montiuk:product', { detail: product }));
  }}>{children}<Icon name="up-right" /></a>;
}

export function QuoteForm() {
  const [product, setProduct] = useState('');
  const [preparedUrl, setPreparedUrl] = useState('');
  const nameInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const selectProduct = (event: Event) => {
      const selected = (event as CustomEvent<string>).detail;
      if (products.includes(selected)) { setProduct(selected); setPreparedUrl(''); }
    };
    window.addEventListener('montiuk:product', selectProduct);
    return () => window.removeEventListener('montiuk:product', selectProduct);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    if (!name) { nameInput.current?.setCustomValidity('Ingresá tu nombre para continuar.'); nameInput.current?.reportValidity(); return; }
    const location = String(data.get('location') || '').trim();
    const details = String(data.get('message') || '').trim();
    const url = whatsappUrl([
      `Hola, soy ${name}. Quiero pedir un presupuesto.`,
      `Me interesa: ${product}.`,
      location && `Localidad de la obra: ${location}.`,
      details && `Detalles: ${details}`,
    ].filter(Boolean).join('\n'));
    setPreparedUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return <div className="quote-card">
    <h3>Hablemos de tu obra</h3><p>Completá estos datos y continuá por WhatsApp.</p>
    <form id="quote-form" onSubmit={submit} onChange={() => setPreparedUrl('')}>
      <div className="grid grid-cols-1 gap-x-3.5 min-[370px]:grid-cols-2 min-[681px]:grid-cols-1 min-[901px]:grid-cols-2">
        <label htmlFor="name">Tu nombre <span>*</span><input ref={nameInput} id="name" name="name" autoComplete="given-name" placeholder="¿Cómo te llamás?" required maxLength={80} onInput={() => nameInput.current?.setCustomValidity('')} /></label>
        <label htmlFor="location">Localidad de la obra<input id="location" name="location" autoComplete="address-level2" placeholder="Ej. La Plata" maxLength={120} /></label>
      </div>
      <label htmlFor="product">¿Qué estás buscando? <span>*</span><select id="product" name="product" required value={product} onChange={(event) => setProduct(event.target.value)}><option value="" disabled>Seleccioná una opción</option>{products.map((name) => <option key={name}>{name}</option>)}</select></label>
      <label htmlFor="message">Contanos un poco más <span className="optional">(opcional)</span><textarea id="message" name="message" rows={3} maxLength={1800} placeholder="Medidas, cantidad, tipo de obra… Lo que tengas nos ayuda." /></label>
      <button className="button form-submit" type="submit"><Icon name="chat" /> Pedir presupuesto por WhatsApp <Icon name="up-right" /></button>
      <p className="form-note"><Icon name="check" /> Sin cargo y sin compromiso. Vos iniciás la conversación.</p>
      {preparedUrl && <div id="form-feedback" className="mt-3.5 rounded bg-[#f0f5e9] p-3 text-xs leading-relaxed text-[#425337]" role="status">Tu consulta está lista. Completá el envío en WhatsApp. <a id="whatsapp-fallback" className="font-bold underline underline-offset-2" href={preparedUrl} target="_blank" rel="noopener noreferrer">Abrir conversación</a></div>}
      <noscript><p>Para pedir tu presupuesto, <a href={whatsappUrl('Hola, quiero pedir un presupuesto.')} className="underline">escribinos directamente por WhatsApp</a>.</p></noscript>
    </form>
  </div>;
}
