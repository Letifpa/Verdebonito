import { useState } from 'react';
import {
  Home, ShoppingBag, Package, User, ShoppingCart,
  Plus, Minus, Check, Eye, EyeOff, ChevronDown,
  ArrowLeft, Leaf, Bell, MapPin, CreditCard, Trash2,
  Star, ChevronRight,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  green:  '#1B7F4A',
  red:    '#E63329',
  yellow: '#F5C800',
  dark:   '#1A1A1A',
  light:  '#F2F0E8',
  white:  '#FFFFFF',
};
const F: Record<string, React.CSSProperties> = {
  black:   { fontFamily: "'Roboto', sans-serif", fontWeight: 900 },
  bold:    { fontFamily: "'Roboto', sans-serif", fontWeight: 700 },
  reg:     { fontFamily: "'Roboto', sans-serif", fontWeight: 400 },
  dancing: { fontFamily: "'Dancing Script', cursive", fontStyle: 'italic' },
};

const formatCLP = (n: number) => `$${n.toLocaleString('es-CL')}`;

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function DSPageHeader() {
  return (
    <div style={{ backgroundColor: C.dark, position: 'relative', overflow: 'hidden' }}>
      {/* Bauhaus geometry */}
      <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', backgroundColor: C.yellow, opacity: 0.1 }} />
      <div style={{ position: 'absolute', bottom: '0', left: '50px', width: '6px', height: '100%', backgroundColor: C.green, opacity: 0.25 }} />
      <div style={{ position: 'absolute', top: '20px', right: '24px', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: C.red, opacity: 0.4 }} />

      {/* 4-color top bar */}
      <div style={{ height: '6px', display: 'flex' }}>
        {[C.green, C.red, C.yellow, C.light].map((col, i) => (
          <div key={i} style={{ flex: 1, backgroundColor: col, opacity: col === C.light ? 0.5 : 1 }} />
        ))}
      </div>

      <div style={{ padding: '32px 24px 36px', position: 'relative', zIndex: 1 }}>
        {/* Brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <div style={{ width: '36px', height: '36px', backgroundColor: C.yellow, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ ...F.black, fontSize: '20px', color: C.green }}>V</span>
          </div>
          <span style={{ ...F.black, fontSize: '14px', color: C.light, textTransform: 'uppercase', letterSpacing: '0.14em' }}>VERDE </span>
          <span style={{ ...F.dancing, fontSize: '18px', color: C.yellow }}>Bonito</span>
        </div>

        <div style={{ display: 'inline-block', backgroundColor: C.green, padding: '4px 10px', marginBottom: '14px' }}>
          <span style={{ ...F.bold, fontSize: '9px', color: C.light, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Design System — v1.0</span>
        </div>

        <h1 style={{ ...F.black, fontSize: '36px', color: C.light, textTransform: 'uppercase', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '14px' }}>
          SISTEMA<br />DE DISEÑO
        </h1>
        <p style={{ ...F.reg, fontSize: '13px', color: 'rgba(242,240,232,0.55)', lineHeight: 1.6 }}>
          Todos los tokens, componentes y patrones visuales que conforman la experiencia de Verde Bonito.
        </p>
      </div>

      {/* Section index strip */}
      <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', borderTop: `1px solid rgba(255,255,255,0.08)`, padding: '12px 16px', gap: '4px' }}>
        {['01 Identidad','02 Colores','03 Tipografía','04 Botones','05 Formularios','06 Chips','07 Tarjetas','08 Navegación','09 Feedback','10 Decorativos'].map(s => (
          <div key={s} style={{ ...F.bold, fontSize: '9px', color: 'rgba(242,240,232,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ num, title, bg = C.dark, fg = C.light, accent = C.yellow }: { num: string; title: string; bg?: string; fg?: string; accent?: string }) {
  return (
    <div style={{ backgroundColor: bg, padding: '20px 24px 18px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: `3px solid ${accent}` }}>
      <div style={{ ...F.black, fontSize: '11px', color: accent, letterSpacing: '0.15em', minWidth: '28px' }}>{num}</div>
      <div style={{ width: '1px', height: '20px', backgroundColor: `${fg}30` }} />
      <h2 style={{ ...F.black, fontSize: '16px', color: fg, textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>{title}</h2>
    </div>
  );
}

function ComponentLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...F.bold, fontSize: '9px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px' }}>
      {children}
    </div>
  );
}

function TokenLabel({ children }: { children: React.ReactNode }) {
  return (
    <code style={{ ...F.reg, fontSize: '10px', color: 'rgba(26,26,26,0.5)', backgroundColor: 'rgba(0,0,0,0.06)', padding: '2px 6px', letterSpacing: '0.02em' }}>
      {children}
    </code>
  );
}

function ShowcaseBox({ children, bg = C.light, pad = '20px 16px' }: { children: React.ReactNode; bg?: string; pad?: string }) {
  return (
    <div style={{ backgroundColor: bg, padding: pad }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 01 — IDENTIDAD
// ─────────────────────────────────────────────────────────────────────────────
function IdentidadSection() {
  return (
    <section>
      <SectionHeader num="01" title="Identidad" />
      <ShowcaseBox>

        {/* Logo horizontal */}
        <ComponentLabel>Logo — Horizontal</ComponentLabel>
        <div style={{ backgroundColor: C.dark, padding: '20px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ width: '44px', height: '44px', backgroundColor: C.yellow, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ ...F.black, fontSize: '24px', color: C.green, lineHeight: 1 }}>V</span>
          </div>
          <div>
            <div style={{ ...F.black, fontSize: '17px', color: C.light, textTransform: 'uppercase', letterSpacing: '0.16em', lineHeight: 1 }}>VERDE <span style={{ ...F.dancing, fontSize: '20px', color: C.yellow, textTransform: 'none' }}>Bonito</span></div>
            <div style={{ ...F.reg, fontSize: '10px', color: 'rgba(242,240,232,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '3px' }}>Delivery de campo</div>
          </div>
        </div>

        {/* Logo en verde */}
        <div style={{ backgroundColor: C.green, padding: '20px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: C.yellow, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ ...F.black, fontSize: '22px', color: C.green, lineHeight: 1 }}>V</span>
          </div>
          <div>
            <div style={{ ...F.black, fontSize: '16px', color: C.light, textTransform: 'uppercase', letterSpacing: '0.16em', lineHeight: 1 }}>VERDE <span style={{ ...F.dancing, fontSize: '18px', color: C.yellow, textTransform: 'none' }}>Bonito</span></div>
            <div style={{ ...F.reg, fontSize: '9px', color: C.yellow, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>Delivery de campo</div>
          </div>
        </div>

        {/* Logomark solo */}
        <ComponentLabel>Logomark — Solo</ComponentLabel>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          {[C.dark, C.green, C.yellow, C.red].map((bg, i) => (
            <div key={i} style={{ width: '52px', height: '52px', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ ...F.black, fontSize: '28px', color: bg === C.yellow ? C.green : C.yellow, lineHeight: 1 }}>V</span>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <ComponentLabel>Tagline — Dancing Script</ComponentLabel>
        <div style={{ backgroundColor: C.white, padding: '16px', borderLeft: `4px solid ${C.yellow}` }}>
          <p style={{ ...F.dancing, fontSize: '22px', color: C.green }}>Directo del campo a tu mesa, cada semana.</p>
          <p style={{ ...F.dancing, fontSize: '19px', color: C.red }}>Sin permanencia. Cancela cuando quieras.</p>
          <p style={{ ...F.dancing, fontSize: '20px', color: C.dark }}>Lo mejor de cada estación, recién cosechado.</p>
        </div>
      </ShowcaseBox>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 02 — COLORES
// ─────────────────────────────────────────────────────────────────────────────
const COLOR_TOKENS = [
  { name: 'Verde Principal', role: 'Primary', hex: '#1B7F4A', bg: C.green, fg: C.light, token: 'C.green' },
  { name: 'Rojo Acción', role: 'Secondary', hex: '#E63329', bg: C.red, fg: C.light, token: 'C.red' },
  { name: 'Amarillo Acento', role: 'Accent', hex: '#F5C800', bg: C.yellow, fg: C.dark, token: 'C.yellow' },
  { name: 'Negro Bauhaus', role: 'Dark', hex: '#1A1A1A', bg: C.dark, fg: C.light, token: 'C.dark' },
  { name: 'Crema Base', role: 'Light', hex: '#F2F0E8', bg: C.light, fg: C.dark, token: 'C.light' },
];

function ColoresSection() {
  return (
    <section>
      <SectionHeader num="02" title="Colores" />
      <ShowcaseBox>

        {/* Main swatches */}
        <ComponentLabel>Paleta principal</ComponentLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '20px' }}>
          {COLOR_TOKENS.map(({ name, role, hex, bg, fg, token }) => (
            <div key={hex} style={{ backgroundColor: bg, padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ ...F.black, fontSize: '14px', color: fg, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{name}</div>
                <div style={{ ...F.reg, fontSize: '10px', color: fg, opacity: 0.55, letterSpacing: '0.05em' }}>{role}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ ...F.bold, fontSize: '13px', color: fg, fontFamily: 'monospace' }}>{hex}</div>
                <div style={{ ...F.reg, fontSize: '9px', color: fg, opacity: 0.45, marginTop: '2px' }}>{token}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Color combinations */}
        <ComponentLabel>Combinaciones válidas</ComponentLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { bg: C.green, fg: C.yellow, label: 'Verde + Amarillo', use: 'CTA secundario' },
            { bg: C.red, fg: C.light, label: 'Rojo + Crema', use: 'Botón CTA' },
            { bg: C.yellow, fg: C.dark, label: 'Amarillo + Negro', use: 'Chips activos' },
            { bg: C.dark, fg: C.yellow, label: 'Negro + Amarillo', use: 'Nav + precios' },
            { bg: C.light, fg: C.dark, label: 'Crema + Negro', use: 'Body default' },
            { bg: C.green, fg: C.light, label: 'Verde + Crema', use: 'Headers sección' },
          ].map(({ bg, fg, label, use }) => (
            <div key={label} style={{ backgroundColor: bg, padding: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ ...F.bold, fontSize: '11px', color: fg }}>{label}</span>
              <span style={{ ...F.reg, fontSize: '9px', color: fg, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{use}</span>
            </div>
          ))}
        </div>

        {/* Bauhaus color bar */}
        <div style={{ marginTop: '20px' }}>
          <ComponentLabel>Barra cromática Bauhaus</ComponentLabel>
          <div style={{ height: '12px', display: 'flex' }}>
            {[C.green, C.red, C.yellow, C.dark].map(c => <div key={c} style={{ flex: 1, backgroundColor: c }} />)}
          </div>
          <div style={{ height: '12px', display: 'flex' }}>
            {[C.dark, C.yellow, C.red, C.green].map(c => <div key={c} style={{ flex: 1, backgroundColor: c }} />)}
          </div>
        </div>
      </ShowcaseBox>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 03 — TIPOGRAFÍA
// ─────────────────────────────────────────────────────────────────────────────
function TipografiaSection() {
  return (
    <section>
      <SectionHeader num="03" title="Tipografía" />
      <ShowcaseBox bg={C.white}>

        {/* Roboto Black */}
        <div style={{ borderBottom: `2px solid ${C.light}`, paddingBottom: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <TokenLabel>Roboto Black · 900</TokenLabel>
            <div style={{ width: '24px', height: '6px', backgroundColor: C.green }} />
          </div>
          <div style={{ ...F.black, fontSize: '64px', color: C.dark, lineHeight: 1, letterSpacing: '-0.02em' }}>Aa</div>
          <div style={{ ...F.black, fontSize: '24px', color: C.green, textTransform: 'uppercase', letterSpacing: '-0.01em', marginTop: '4px' }}>VERDURAS FRESCAS.</div>
          <div style={{ ...F.black, fontSize: '14px', color: C.dark, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '6px' }}>ELIGE TU PLAN · MÁS POPULAR · $17.900</div>
          <div style={{ marginTop: '10px', ...F.reg, fontSize: '11px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.08em' }}>USO: Headings h1–h3, precios, numerales grandes, step numbers</div>
        </div>

        {/* Roboto Bold */}
        <div style={{ borderBottom: `2px solid ${C.light}`, paddingBottom: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <TokenLabel>Roboto Bold · 700</TokenLabel>
            <div style={{ width: '24px', height: '6px', backgroundColor: C.red }} />
          </div>
          <div style={{ ...F.bold, fontSize: '48px', color: C.dark, lineHeight: 1 }}>Aa</div>
          <div style={{ ...F.bold, fontSize: '16px', color: C.dark, letterSpacing: '0.05em', marginTop: '6px' }}>Frutilla · 250g · Temporada</div>
          <div style={{ ...F.bold, fontSize: '12px', color: C.dark, textTransform: 'uppercase', letterSpacing: '0.18em', marginTop: '4px' }}>CONFIRMAR SUSCRIPCIÓN</div>
          <div style={{ marginTop: '10px', ...F.reg, fontSize: '11px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.08em' }}>USO: Botones, labels, nombres de producto, badges, UI labels</div>
        </div>

        {/* Roboto Regular */}
        <div style={{ borderBottom: `2px solid ${C.light}`, paddingBottom: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <TokenLabel>Roboto Regular · 400</TokenLabel>
            <div style={{ width: '24px', height: '6px', backgroundColor: C.yellow }} />
          </div>
          <div style={{ ...F.reg, fontSize: '40px', color: C.dark, lineHeight: 1 }}>Aa</div>
          <div style={{ ...F.reg, fontSize: '15px', color: C.dark, lineHeight: 1.65, marginTop: '6px' }}>
            Semana a semana o por el mes completo. Sin permanencia. Te vas cuando quieras.
          </div>
          <div style={{ marginTop: '10px', ...F.reg, fontSize: '11px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.08em' }}>USO: Body copy, descripciones, subtexto, fine print</div>
        </div>

        {/* Dancing Script */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <TokenLabel>Dancing Script · Italic</TokenLabel>
            <div style={{ width: '24px', height: '6px', backgroundColor: C.dark }} />
          </div>
          <div style={{ ...F.dancing, fontSize: '52px', color: C.green, lineHeight: 1 }}>Aa</div>
          <div style={{ ...F.dancing, fontSize: '22px', color: C.green, marginTop: '6px' }}>Directo del campo a tu mesa, cada semana.</div>
          <div style={{ ...F.dancing, fontSize: '18px', color: C.red, marginTop: '4px' }}>Sin permanencia. Cancela cuando quieras.</div>
          <div style={{ marginTop: '10px', ...F.reg, fontSize: '11px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.08em' }}>USO: Solo para highlights emocionales — subtítulos de sección, taglines</div>
        </div>

      </ShowcaseBox>

      {/* Scale */}
      <ShowcaseBox bg={C.light}>
        <ComponentLabel>Escala tipográfica</ComponentLabel>
        {[
          { size: '44px', label: 'Display · 44px', sample: 'LISTO', style: F.black },
          { size: '36px', label: 'H1 · 36px', sample: 'ELIGE TU PLAN', style: F.black },
          { size: '28px', label: 'H2 · 28px', sample: 'DE TEMPORADA', style: F.black },
          { size: '20px', label: 'H3 · 20px', sample: 'PLAN COSECHA', style: F.black },
          { size: '15px', label: 'Body · 15px', sample: 'Fresquito y listo para cocinar.', style: F.reg },
          { size: '13px', label: 'Small · 13px', sample: 'Entrega: Sábado 29 de marzo', style: F.reg },
          { size: '11px', label: 'Caption · 11px', sample: 'TEMPORADA · ORGÁNICO', style: F.bold },
          { size: '9px',  label: 'Micro · 9px',   sample: 'VER CATÁLOGO · SEMANAL', style: F.bold },
        ].map(({ size, label, sample, style }) => (
          <div key={size} style={{ display: 'flex', alignItems: 'baseline', gap: '12px', paddingBottom: '10px', marginBottom: '10px', borderBottom: `1px solid rgba(0,0,0,0.06)` }}>
            <span style={{ ...F.reg, fontSize: '9px', color: 'rgba(26,26,26,0.35)', width: '100px', flexShrink: 0, letterSpacing: '0.05em' }}>{label}</span>
            <span style={{ ...style, fontSize: size, color: C.dark, lineHeight: 1, textTransform: style === F.bold ? 'uppercase' : 'none', letterSpacing: size === '9px' || size === '11px' ? '0.12em' : 'normal' }}>{sample}</span>
          </div>
        ))}
      </ShowcaseBox>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 04 — BOTONES
// ─────────────────────────────────────────────────────────────────────────────
function BotonesSection() {
  const [pressed, setPressed] = useState<string | null>(null);
  const tap = (id: string) => { setPressed(id); setTimeout(() => setPressed(null), 300); };

  const btnBase: React.CSSProperties = {
    border: 'none', cursor: 'pointer', letterSpacing: '0.15em',
    textTransform: 'uppercase', transition: 'opacity 0.15s', display: 'inline-block',
  };

  return (
    <section>
      <SectionHeader num="04" title="Botones" />
      <ShowcaseBox>

        {/* Primary — Red */}
        <ComponentLabel>Primario · Rojo · CTA Principal</ComponentLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          <button onClick={() => tap('red-lg')} style={{ ...btnBase, ...F.bold, fontSize: '14px', backgroundColor: C.red, color: C.light, padding: '18px 40px', opacity: pressed === 'red-lg' ? 0.8 : 1 }}>
            Ver catálogo
          </button>
          <button onClick={() => tap('red-sm')} style={{ ...btnBase, ...F.bold, fontSize: '12px', backgroundColor: C.red, color: C.light, padding: '12px 28px', opacity: pressed === 'red-sm' ? 0.8 : 1 }}>
            Ver catálogo
          </button>
        </div>

        {/* Primary — Green */}
        <ComponentLabel>Primario · Verde · Confirmación</ComponentLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          <button onClick={() => tap('green-full')} style={{ ...btnBase, ...F.black, fontSize: '14px', backgroundColor: C.green, color: C.light, padding: '20px', width: '100%', position: 'relative', overflow: 'hidden', opacity: pressed === 'green-full' ? 0.85 : 1 }}>
            <span style={{ position: 'absolute', left: 0, top: 0, width: '5px', height: '100%', backgroundColor: C.yellow, opacity: 0.6 }} />
            Confirmar suscripción
          </button>
        </div>

        {/* Accent — Yellow */}
        <ComponentLabel>Acento · Amarillo · CTA Suscripción</ComponentLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          <button onClick={() => tap('yellow')} style={{ ...btnBase, ...F.bold, fontSize: '14px', backgroundColor: C.yellow, color: C.dark, padding: '18px 40px', opacity: pressed === 'yellow' ? 0.8 : 1 }}>
            Quiero suscribirme
          </button>
          <button style={{ ...btnBase, ...F.black, fontSize: '13px', backgroundColor: C.yellow, color: C.dark, padding: '16px' }}>
            Elegir este plan →
          </button>
        </div>

        {/* Outlined */}
        <ComponentLabel>Outlined · 3 variantes</ComponentLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {[
            { border: C.green, color: C.green, label: 'Elegir este plan', outlined: true },
            { border: C.red,   color: C.red,   label: 'Elegir este plan', outlined: true },
            { border: C.dark,  color: C.dark,  label: 'Cerrar sesión',    outlined: true },
          ].map(({ border, color, label }, i) => (
            <button key={i} style={{ ...btnBase, ...F.bold, fontSize: '12px', backgroundColor: 'transparent', color, border: `2.5px solid ${border}`, padding: '13px' }}>
              {label}
            </button>
          ))}
          {/* Outlined on dark bg */}
          <div style={{ backgroundColor: C.dark, padding: '12px' }}>
            <button style={{ ...btnBase, ...F.bold, fontSize: '13px', backgroundColor: 'transparent', color: C.light, border: `2.5px solid ${C.light}`, padding: '16px 40px' }}>
              Ver mi pedido
            </button>
          </div>
        </div>

        {/* Icon buttons */}
        <ComponentLabel>Botón ícono — Round "+" / controles</ComponentLabel>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          {/* Round + add */}
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: C.red, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={16} color={C.white} strokeWidth={2.5} />
          </button>
          {/* Round + green (added) */}
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: C.green, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={15} fill="white" color="white" strokeWidth={0} />
          </button>
          {/* Qty minus */}
          <button style={{ width: '30px', height: '30px', backgroundColor: C.dark, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Minus size={13} color={C.light} />
          </button>
          {/* Qty plus */}
          <button style={{ width: '30px', height: '30px', backgroundColor: C.green, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={13} color={C.light} />
          </button>
          {/* Trash / remove */}
          <button style={{ width: '30px', height: '30px', backgroundColor: C.red, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trash2 size={13} color={C.light} />
          </button>
          {/* Nav link */}
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <ArrowLeft size={15} color={C.dark} strokeWidth={2.5} />
            <span style={{ ...F.bold, fontSize: '10px', color: 'rgba(26,26,26,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Volver</span>
          </button>
        </div>

        {/* States */}
        <ComponentLabel>Estados de botón</ComponentLabel>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button style={{ ...btnBase, ...F.bold, fontSize: '11px', backgroundColor: C.green, color: C.light, padding: '10px 18px' }}>Default</button>
          <button style={{ ...btnBase, ...F.bold, fontSize: '11px', backgroundColor: C.green, color: C.light, padding: '10px 18px', opacity: 0.7 }}>Hover</button>
          <button style={{ ...btnBase, ...F.bold, fontSize: '11px', backgroundColor: C.green, color: C.light, padding: '10px 18px', opacity: 0.5 }}>Active</button>
          <button style={{ ...btnBase, ...F.bold, fontSize: '11px', backgroundColor: 'rgba(0,0,0,0.12)', color: 'rgba(26,26,26,0.35)', padding: '10px 18px', cursor: 'not-allowed' }}>Disabled</button>
        </div>
      </ShowcaseBox>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 05 — FORMULARIOS
// ─────────────────────────────────────────────────────────────────────────────
function FormulariosSection() {
  const [showPw, setShowPw] = useState(false);
  const [freq, setFreq] = useState<'semanal' | 'mensual'>('semanal');

  const inputBase: React.CSSProperties = {
    width: '100%', padding: '14px 16px',
    backgroundColor: C.white, border: `2px solid ${C.dark}`,
    borderRadius: 0, outline: 'none',
    ...F.reg, fontSize: '15px', color: C.dark, boxSizing: 'border-box', appearance: 'none',
  };

  return (
    <section>
      <SectionHeader num="05" title="Formularios" accent={C.red} />
      <ShowcaseBox bg={C.light}>

        {/* Label anatomy */}
        <ComponentLabel>Label + Input — Anatomía</ComponentLabel>
        <div style={{ backgroundColor: C.white, padding: '16px', marginBottom: '16px', borderLeft: `4px solid ${C.green}` }}>
          <div style={{ ...F.bold, fontSize: '10px', color: 'rgba(26,26,26,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>Nombre completo</div>
          <input type="text" placeholder="María González" style={inputBase} readOnly />
          <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
            <span style={{ ...F.reg, fontSize: '9px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.06em' }}>Label: 10px Bold Uppercase</span>
            <span style={{ ...F.reg, fontSize: '9px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.06em' }}>Input: 15px Regular</span>
          </div>
        </div>

        {/* States */}
        <ComponentLabel>Estados del input</ComponentLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {/* Default */}
          <div>
            <div style={{ ...F.bold, fontSize: '9px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Default</div>
            <input style={inputBase} placeholder="Ingresa tu email" readOnly />
          </div>
          {/* Focus */}
          <div>
            <div style={{ ...F.bold, fontSize: '9px', color: C.green, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Focus</div>
            <input style={{ ...inputBase, border: `2px solid ${C.yellow}`, outline: `2px solid ${C.yellow}` }} placeholder="maria@email.com" defaultValue="maria@email.com" readOnly />
          </div>
          {/* Error */}
          <div>
            <div style={{ ...F.bold, fontSize: '9px', color: C.red, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Error</div>
            <input style={{ ...inputBase, border: `2px solid ${C.red}` }} placeholder="Ingresa un email válido" defaultValue="email-invalido" readOnly />
            <p style={{ ...F.reg, fontSize: '11px', color: C.red, marginTop: '4px' }}>Ingresa un email válido</p>
          </div>
        </div>

        {/* Password field */}
        <ComponentLabel>Campo contraseña</ComponentLabel>
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <div style={{ ...F.bold, fontSize: '10px', color: 'rgba(26,26,26,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>Contraseña</div>
          <div style={{ position: 'relative' }}>
            <input type={showPw ? 'text' : 'password'} defaultValue="MiClave123" style={{ ...inputBase, paddingRight: '50px' }} readOnly />
            <button onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,26,26,0.45)' }}>
              {showPw ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Select */}
        <ComponentLabel>Select / Dropdown</ComponentLabel>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ ...F.bold, fontSize: '10px', color: 'rgba(26,26,26,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>Día de entrega preferido</div>
          <div style={{ position: 'relative' }}>
            <select defaultValue="Miércoles" style={{ ...inputBase, paddingRight: '44px', cursor: 'pointer' }}>
              {['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'].map(d => <option key={d}>{d}</option>)}
            </select>
            <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <ChevronDown size={18} color={C.dark} strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Frequency toggle */}
        <ComponentLabel>Toggle Semanal / Mensual</ComponentLabel>
        <div style={{ backgroundColor: C.dark, padding: '4px', display: 'flex', gap: '4px', marginBottom: '20px' }}>
          {(['semanal', 'mensual'] as const).map(f => (
            <button key={f} onClick={() => setFreq(f)} style={{ flex: 1, padding: '12px', backgroundColor: freq === f ? C.yellow : 'transparent', color: freq === f ? C.dark : 'rgba(242,240,232,0.6)', border: 'none', cursor: 'pointer', ...F.black, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', position: 'relative' }}>
              {f.toUpperCase()}
              {f === 'mensual' && <span style={{ position: 'absolute', top: '4px', right: '6px', ...F.bold, fontSize: '7px', color: freq === 'mensual' ? C.green : C.yellow, letterSpacing: '0.05em' }}>−10%</span>}
            </button>
          ))}
        </div>

        {/* Section dividers */}
        <ComponentLabel>Divisor de sección de formulario</ComponentLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flex: 1, height: '2px', backgroundColor: C.dark }} />
          <span style={{ ...F.bold, fontSize: '9px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Entrega</span>
          <div style={{ flex: 1, height: '2px', backgroundColor: C.dark }} />
        </div>
      </ShowcaseBox>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 06 — CHIPS & BADGES
// ─────────────────────────────────────────────────────────────────────────────
function ChipsBadgesSection() {
  const [activeFilter, setActiveFilter] = useState('Frutas');

  return (
    <section>
      <SectionHeader num="06" title="Chips & Badges" accent={C.yellow} />
      <ShowcaseBox>

        {/* Filter chips */}
        <ComponentLabel>Filter chips — Barra de filtros</ComponentLabel>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', backgroundColor: C.light, padding: '10px', marginBottom: '4px', borderBottom: `2px solid ${C.dark}` }}>
          {[
            { label: 'Todos', emoji: '' },
            { label: 'Frutas', emoji: '🍎' },
            { label: 'Verduras', emoji: '🥦' },
            { label: 'Hierbas', emoji: '🌿' },
            { label: 'Hongos', emoji: '🍄' },
          ].map(({ label, emoji }) => (
            <button key={label} onClick={() => setActiveFilter(label)}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px', borderRadius: 0, backgroundColor: activeFilter === label ? C.green : 'transparent', color: activeFilter === label ? C.white : C.dark, border: `2px solid ${activeFilter === label ? C.green : C.dark}`, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, ...F.bold, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {emoji && <span style={{ fontSize: '13px' }}>{emoji}</span>}
              {label}
            </button>
          ))}
        </div>
        <div style={{ backgroundColor: C.light, padding: '8px 12px', marginBottom: '20px' }}>
          <span style={{ ...F.reg, fontSize: '10px', color: 'rgba(26,26,26,0.4)' }}>Activo: <strong>{activeFilter}</strong> — tap para cambiar</span>
        </div>

        {/* Status badges */}
        <ComponentLabel>Badges de estado — Producto</ComponentLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {[
            { label: 'Temporada', bg: C.yellow, fg: C.dark },
            { label: 'Popular',   bg: C.red,    fg: C.light },
            { label: 'Premium',   bg: C.dark,   fg: C.light },
            { label: 'Orgánico',  bg: C.green,  fg: C.light },
          ].map(({ label, bg, fg }) => (
            <div key={label} style={{ backgroundColor: bg, padding: '4px 10px' }}>
              <span style={{ ...F.bold, fontSize: '9px', color: fg, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Plan badges */}
        <ComponentLabel>Badges de plan — Suscripción</ComponentLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          <div style={{ backgroundColor: C.yellow, padding: '7px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Leaf size={12} color={C.dark} strokeWidth={2.5} />
            <span style={{ ...F.black, fontSize: '10px', color: C.dark, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Más Popular</span>
          </div>
          <div style={{ backgroundColor: C.green, padding: '6px 12px' }}>
            <span style={{ ...F.bold, fontSize: '10px', color: C.light, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Activo</span>
          </div>
          <div style={{ backgroundColor: C.green, padding: '4px 10px' }}>
            <span style={{ ...F.bold, fontSize: '9px', color: C.light, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ahorra $8.700 al mes</span>
          </div>
          <div style={{ backgroundColor: C.red, padding: '3px 8px' }}>
            <span style={{ ...F.bold, fontSize: '8px', color: C.light, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Entregado</span>
          </div>
        </div>

        {/* Plan tag inline */}
        <ComponentLabel>Tags de descuento</ComponentLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ ...F.reg, fontSize: '11px', color: 'rgba(26,26,26,0.4)', textDecoration: 'line-through' }}>$39.600</span>
            <span style={{ ...F.black, fontSize: '22px', color: C.yellow }}>$34.900</span>
            <div style={{ backgroundColor: C.green, padding: '2px 8px' }}>
              <span style={{ ...F.bold, fontSize: '9px', color: C.light, letterSpacing: '0.1em' }}>−10%</span>
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(26,26,26,0.08)', display: 'inline-block', padding: '5px 10px' }}>
            <span style={{ ...F.bold, fontSize: '10px', color: C.dark, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Plan COSECHA · 10 KG</span>
          </div>
        </div>
      </ShowcaseBox>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 07 — TARJETAS
// ─────────────────────────────────────────────────────────────────────────────
function TarjetasSection() {
  const [cartQty, setCartQty] = useState(0);

  return (
    <section>
      <SectionHeader num="07" title="Tarjetas" accent={C.green} />
      <ShowcaseBox bg={C.light}>

        {/* Product card */}
        <ComponentLabel>Tarjeta de producto — con estado de caja</ComponentLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', backgroundColor: C.dark, marginBottom: '20px' }}>
          {/* Card with product */}
          {[
            { name: 'Frutilla', weight: '250 g', price: 1490, accent: C.red, seasonal: true, img: 'https://images.unsplash.com/photo-1543158181-e6f9f6712055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
            { name: 'Albahaca', weight: 'atado', price: 890, accent: C.green, seasonal: true, img: 'https://images.unsplash.com/photo-1757111085183-291e46b4e8f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
          ].map((p, i) => (
            <div key={i} style={{ backgroundColor: C.white, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ height: '5px', backgroundColor: p.accent }} />
              <div style={{ position: 'relative', padding: '16px 10px 0', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: `3px solid ${p.accent}`, backgroundColor: C.light }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {p.seasonal && (
                  <div style={{ position: 'absolute', top: '10px', right: '6px', backgroundColor: C.yellow, padding: '2px 6px' }}>
                    <span style={{ ...F.bold, fontSize: '7px', color: C.dark, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Temporada</span>
                  </div>
                )}
              </div>
              <div style={{ padding: '10px 10px 12px', flex: 1 }}>
                <p style={{ ...F.bold, fontSize: '12px', color: C.dark, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2, marginBottom: '2px' }}>{p.name}</p>
                <p style={{ ...F.reg, fontSize: '10px', color: 'rgba(26,26,26,0.45)', marginBottom: '8px' }}>{p.weight}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ ...F.black, fontSize: '15px', color: C.green }}>{formatCLP(p.price)}</span>
                  <button onClick={() => setCartQty(v => v + 1)} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: cartQty > 0 && i === 0 ? C.green : C.red, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={14} color={C.white} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Plan cards */}
        <ComponentLabel>Tarjeta de plan — Regular</ComponentLabel>
        <div style={{ backgroundColor: C.white, borderLeft: `7px solid ${C.green}`, padding: '16px 16px 16px', marginBottom: '10px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '-8px', top: '-14px', ...F.black, fontSize: '90px', color: C.green, opacity: 0.06, lineHeight: 1 }}>5</div>
          <div style={{ ...F.black, fontSize: '9px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '3px' }}>PLAN BROTE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '2px' }}>
            <span style={{ ...F.black, fontSize: '44px', color: C.green, lineHeight: 1 }}>5</span>
            <span style={{ ...F.bold, fontSize: '16px', color: 'rgba(26,26,26,0.4)' }}>kg</span>
          </div>
          <p style={{ ...F.reg, fontSize: '12px', color: 'rgba(26,26,26,0.5)', marginBottom: '10px' }}>Ideal para 1 o 2 personas</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
            <span style={{ ...F.black, fontSize: '24px', color: C.dark }}>$9.900</span>
            <span style={{ ...F.reg, fontSize: '11px', color: 'rgba(26,26,26,0.4)' }}>/semana</span>
          </div>
          <div style={{ display: 'inline-block', backgroundColor: C.green, padding: '3px 8px', marginBottom: '12px' }}>
            <span style={{ ...F.bold, fontSize: '8px', color: C.white, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ahorra $4.700 al mes</span>
          </div>
          <button style={{ width: '100%', backgroundColor: 'transparent', color: C.green, border: `2.5px solid ${C.green}`, cursor: 'pointer', padding: '11px', ...F.bold, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Elegir este plan
          </button>
        </div>

        {/* Popular plan card */}
        <ComponentLabel>Tarjeta de plan — Destacada (Más Popular)</ComponentLabel>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ backgroundColor: C.yellow, padding: '7px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Leaf size={12} color={C.dark} strokeWidth={2.5} />
            <span style={{ ...F.black, fontSize: '10px', color: C.dark, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Más Popular</span>
          </div>
          <div style={{ backgroundColor: C.dark, borderLeft: `7px solid ${C.yellow}`, padding: '16px 16px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '-8px', top: '-16px', ...F.black, fontSize: '110px', color: C.yellow, opacity: 0.07, lineHeight: 1 }}>10</div>
            <div style={{ position: 'absolute', top: 0, right: '36px', width: '4px', height: '100%', backgroundColor: C.yellow, opacity: 0.1 }} />
            <div style={{ ...F.black, fontSize: '9px', color: 'rgba(242,240,232,0.45)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '3px' }}>PLAN COSECHA</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '3px' }}>
              <span style={{ ...F.black, fontSize: '52px', color: C.yellow, lineHeight: 1 }}>10</span>
              <span style={{ ...F.bold, fontSize: '18px', color: 'rgba(242,240,232,0.5)' }}>kg</span>
            </div>
            <p style={{ ...F.reg, fontSize: '12px', color: 'rgba(242,240,232,0.5)', marginBottom: '10px' }}>Para familias pequeñas</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
              <span style={{ ...F.black, fontSize: '26px', color: C.yellow }}>$17.900</span>
              <span style={{ ...F.reg, fontSize: '11px', color: 'rgba(242,240,232,0.4)' }}>/semana</span>
            </div>
            <div style={{ display: 'inline-block', backgroundColor: C.green, padding: '3px 8px', marginBottom: '12px' }}>
              <span style={{ ...F.bold, fontSize: '8px', color: C.white, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ahorra $8.700 al mes</span>
            </div>
            <button style={{ width: '100%', backgroundColor: C.yellow, color: C.dark, border: 'none', cursor: 'pointer', padding: '13px', ...F.black, fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Elegir este plan →
            </button>
          </div>
        </div>

        {/* My box item */}
        <ComponentLabel>Ítem en Mi Caja</ComponentLabel>
        <div style={{ marginBottom: '8px' }}>
          {[
            { name: 'Frutilla', unit: '500g', price: 2900, qty: 2, color: C.red, img: 'https://images.unsplash.com/photo-1543158181-e6f9f6712055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100' },
            { name: 'Albahaca fresca', unit: 'manojo', price: 1200, qty: 1, color: C.green, img: 'https://images.unsplash.com/photo-1757111085183-291e46b4e8f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100' },
          ].map(item => (
            <div key={item.name} style={{ backgroundColor: C.white, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderLeft: `5px solid ${item.color}` }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `2px solid ${item.color}` }}>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ ...F.bold, fontSize: '13px', color: C.dark, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '1px' }}>{item.name}</p>
                <p style={{ ...F.reg, fontSize: '10px', color: 'rgba(26,26,26,0.45)', marginBottom: '2px' }}>{item.unit} × {item.qty}</p>
                <p style={{ ...F.black, fontSize: '13px', color: C.green }}>{formatCLP(item.price * item.qty)}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                <button style={{ width: '26px', height: '26px', backgroundColor: C.dark, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Minus size={11} color={C.light} />
                </button>
                <span style={{ ...F.black, fontSize: '14px', color: C.dark, minWidth: '18px', textAlign: 'center' }}>{item.qty}</span>
                <button style={{ width: '26px', height: '26px', backgroundColor: C.green, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={11} color={C.light} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Zone row */}
        <ComponentLabel>Zona de origen</ComponentLabel>
        <div style={{ backgroundColor: C.dark }}>
          {[
            { num: '01', color: C.yellow, textOnColor: C.dark, name: 'VALLE DE OLMUÉ', desc: 'Frutas y hierbas del litoral central' },
            { num: '02', color: C.red,    textOnColor: C.light, name: 'CAMPOS DE RAÑILCO', desc: 'Verduras de hoja y hongos nativos' },
          ].map(z => (
            <div key={z.num} style={{ borderTop: `1px solid rgba(255,255,255,0.08)`, padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ width: '36px', height: '36px', backgroundColor: z.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ ...F.black, fontSize: '12px', color: z.textOnColor }}>{z.num}</span>
              </div>
              <div>
                <div style={{ ...F.black, fontSize: '14px', color: C.light, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.2, marginBottom: '3px' }}>{z.name}</div>
                <div style={{ ...F.reg, fontSize: '12px', color: 'rgba(242,240,232,0.55)' }}>{z.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Order history row */}
        <ComponentLabel>Ítem historial de pedidos</ComponentLabel>
        <div>
          {[
            { date: '15 mar 2026', plan: '10 kg — Semanal', status: 'Entregado', color: C.green },
            { date: '08 mar 2026', plan: '10 kg — Semanal', status: 'En camino', color: C.yellow },
          ].map((o, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', backgroundColor: C.white, borderBottom: `1px solid rgba(0,0,0,0.05)` }}>
              <div>
                <p style={{ ...F.bold, fontSize: '13px', color: C.dark, margin: 0 }}>{o.date}</p>
                <p style={{ ...F.reg, fontSize: '11px', color: 'rgba(26,26,26,0.5)', margin: 0 }}>{o.plan}</p>
              </div>
              <div style={{ backgroundColor: o.color, padding: '3px 9px' }}>
                <span style={{ ...F.bold, fontSize: '9px', color: o.color === C.yellow ? C.dark : C.light, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseBox>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 08 — NAVEGACIÓN
// ─────────────────────────────────────────────────────────────────────────────
function NavegacionSection() {
  const [activeNav, setActiveNav] = useState('/');

  return (
    <section>
      <SectionHeader num="08" title="Navegación" accent={C.red} />
      <ShowcaseBox bg={C.light}>

        {/* Top App Bar */}
        <ComponentLabel>Top App Bar — Catálogo</ComponentLabel>
        <div style={{ backgroundColor: C.dark, borderBottom: `4px solid ${C.yellow}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', height: '58px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: C.yellow, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ ...F.black, fontSize: '17px', color: C.green, lineHeight: 1 }}>V</span>
            </div>
            <div style={{ lineHeight: 1 }}>
              <span style={{ ...F.black, fontSize: '13px', color: C.light, textTransform: 'uppercase', letterSpacing: '0.1em' }}>VERDE </span>
              <span style={{ ...F.dancing, fontSize: '15px', color: C.yellow }}>Bonito</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ position: 'relative', padding: '7px' }}>
              <ShoppingCart size={22} color={C.light} strokeWidth={1.8} />
              <div style={{ position: 'absolute', top: '2px', right: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${C.dark}` }}>
                <span style={{ ...F.black, fontSize: '8px', color: C.white }}>3</span>
              </div>
            </div>
            <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(242,240,232,0.15)' }} />
            <div style={{ padding: '7px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(242,240,232,0.1)', border: `1.5px solid rgba(242,240,232,0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={14} color={C.light} strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <ComponentLabel>Filter Bar — Sticky</ComponentLabel>
        <div style={{ backgroundColor: C.light, borderBottom: `2px solid ${C.dark}`, display: 'flex', gap: '8px', padding: '10px 14px', overflowX: 'auto', scrollbarWidth: 'none', marginBottom: '16px' }}>
          {[{ l: 'Todos', e: '' }, { l: 'Frutas', e: '🍎' }, { l: 'Verduras', e: '🥦' }, { l: 'Hierbas', e: '🌿' }, { l: 'Hongos', e: '🍄' }].map(({ l, e }) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', borderRadius: 0, backgroundColor: l === 'Frutas' ? C.green : 'transparent', color: l === 'Frutas' ? C.white : C.dark, border: `2px solid ${l === 'Frutas' ? C.green : C.dark}`, whiteSpace: 'nowrap', flexShrink: 0, ...F.bold, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {e && <span style={{ fontSize: '12px' }}>{e}</span>}
              {l}
            </div>
          ))}
        </div>

        {/* Back navigation */}
        <ComponentLabel>Back navigation — Pantalla interna</ComponentLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {[C.green, C.red, C.dark].map((bg, i) => (
            <div key={i} style={{ backgroundColor: bg, padding: '14px 20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={14} color={bg === C.dark ? 'rgba(242,240,232,0.7)' : 'rgba(242,240,232,0.7)'} strokeWidth={2.5} />
              <span style={{ ...F.bold, fontSize: '10px', color: 'rgba(242,240,232,0.65)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Volver</span>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <ComponentLabel>Barra de navegación inferior</ComponentLabel>
        <div style={{ backgroundColor: C.dark, borderTop: `4px solid ${C.yellow}`, display: 'flex' }}>
          {[
            { icon: Home,        label: 'Inicio',    path: '/' },
            { icon: ShoppingBag, label: 'Catálogo',  path: '/catalogo' },
            { icon: Package,     label: 'Mi Caja',   path: '/mi-caja' },
            { icon: User,        label: 'Cuenta',    path: '/cuenta' },
          ].map(({ icon: Icon, label, path }) => {
            const isActive = activeNav === path;
            return (
              <button key={path} onClick={() => setActiveNav(path)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 4px 8px', color: isActive ? C.yellow : C.light, background: 'none', border: 'none', cursor: 'pointer', gap: '4px', borderBottom: isActive ? `3px solid ${C.yellow}` : '3px solid transparent', marginBottom: '-3px' }}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                <span style={{ ...F.bold, fontSize: '9px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
              </button>
            );
          })}
        </div>
        <div style={{ ...F.reg, fontSize: '10px', color: 'rgba(26,26,26,0.4)', padding: '8px 12px' }}>
          Tap para cambiar estado activo ↑
        </div>

        {/* Account menu item */}
        <ComponentLabel>Ítem de menú — Cuenta</ComponentLabel>
        <div style={{ backgroundColor: C.white }}>
          {[
            { icon: Bell,        label: 'Notificaciones',       sub: 'WhatsApp activo' },
            { icon: MapPin,      label: 'Dirección de entrega', sub: 'Av. Italia 1050, Providencia' },
            { icon: CreditCard,  label: 'Método de pago',       sub: 'Webpay / Transferencia' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 16px', borderBottom: `1px solid rgba(0,0,0,0.05)`, cursor: 'pointer' }}>
              <div style={{ width: '34px', height: '34px', backgroundColor: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={15} color={C.yellow} strokeWidth={2} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ ...F.bold, fontSize: '13px', color: C.dark, margin: 0 }}>{label}</p>
                <p style={{ ...F.reg, fontSize: '11px', color: 'rgba(26,26,26,0.45)', margin: 0 }}>{sub}</p>
              </div>
              <ChevronRight size={17} color="rgba(26,26,26,0.3)" />
            </div>
          ))}
        </div>
      </ShowcaseBox>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 09 — FEEDBACK
// ─────────────────────────────────────────────────────────────────────────────
function FeedbackSection() {
  return (
    <section>
      <SectionHeader num="09" title="Feedback" accent={C.yellow} />
      <ShowcaseBox>

        {/* Toast */}
        <ComponentLabel>Toast — Bottom Sheet confirmación</ComponentLabel>
        <div style={{ backgroundColor: C.dark, borderTop: `4px solid ${C.green}`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '28px', height: '28px', backgroundColor: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Check size={15} color={C.white} strokeWidth={3} />
          </div>
          <p style={{ ...F.bold, fontSize: '13px', color: C.light, flex: 1, letterSpacing: '0.02em' }}>
            <span style={{ color: C.yellow }}>Frutilla</span> agregado a tu caja ✓
          </p>
        </div>

        {/* Toast — error */}
        <div style={{ backgroundColor: C.dark, borderTop: `4px solid ${C.red}`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '28px', height: '28px', backgroundColor: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ ...F.black, fontSize: '16px', color: C.white, lineHeight: 1 }}>!</span>
          </div>
          <p style={{ ...F.bold, fontSize: '13px', color: C.light, flex: 1 }}>
            Algo salió mal. Intenta de nuevo.
          </p>
        </div>

        {/* Progress bar */}
        <ComponentLabel>Barra de progreso — Peso de caja</ComponentLabel>
        <div style={{ backgroundColor: C.green, padding: '18px 20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
            <span style={{ ...F.bold, fontSize: '12px', color: C.light, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Peso total</span>
            <span style={{ ...F.black, fontSize: '20px', color: C.yellow }}>8.2 <span style={{ fontSize: '12px' }}>/ 10 kg</span></span>
          </div>
          <div style={{ height: '10px', backgroundColor: 'rgba(0,0,0,0.25)' }}>
            <div style={{ height: '100%', width: '82%', backgroundColor: C.yellow }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <span style={{ ...F.reg, fontSize: '10px', color: 'rgba(242,240,232,0.5)' }}>0 kg</span>
            <span style={{ ...F.reg, fontSize: '10px', color: 'rgba(242,240,232,0.5)' }}>10 kg</span>
          </div>
        </div>

        {/* Delivery strip */}
        <ComponentLabel>Strip de entrega</ComponentLabel>
        <div style={{ backgroundColor: C.yellow, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <Package size={18} strokeWidth={2.5} color={C.dark} />
          <span style={{ ...F.bold, fontSize: '13px', color: C.dark, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Entrega: Sábado 29 de marzo</span>
        </div>

        {/* Confirmación */}
        <ComponentLabel>Pantalla de confirmación — Suscripción</ComponentLabel>
        <div style={{ backgroundColor: C.green, padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', backgroundColor: C.yellow, opacity: 0.12 }} />
          <div style={{ position: 'absolute', bottom: '-15px', left: '-15px', width: '70px', height: '70px', borderRadius: '50%', backgroundColor: C.red, opacity: 0.15 }} />

          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <div style={{ width: '88px', height: '88px', borderRadius: '50%', backgroundColor: C.yellow, border: `4px solid ${C.dark}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={38} color={C.dark} strokeWidth={3.5} />
            </div>
            <div style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', backgroundColor: C.red }} />
            <div style={{ position: 'absolute', bottom: '-6px', left: '-6px', width: '18px', height: '18px', backgroundColor: C.dark }} />
          </div>

          <span style={{ ...F.black, fontSize: '32px', color: C.light, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.0, marginBottom: '2px' }}>¡LISTO,</span>
          <span style={{ ...F.black, fontSize: '32px', color: C.yellow, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.0, marginBottom: '14px' }}>MARÍA!</span>
          <p style={{ ...F.reg, fontSize: '14px', color: 'rgba(242,240,232,0.8)', textAlign: 'center', lineHeight: 1.6, marginBottom: '6px' }}>Tu primera caja está en camino.</p>
          <p style={{ ...F.dancing, fontSize: '17px', color: C.yellow }}>Te avisamos cuando salga.</p>
        </div>

        {/* Empty state */}
        <ComponentLabel>Estado vacío — Mi Caja</ComponentLabel>
        <div style={{ backgroundColor: C.light, textAlign: 'center', padding: '36px 20px' }}>
          <div style={{ width: '72px', height: '72px', backgroundColor: C.yellow, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={32} color={C.dark} strokeWidth={2} />
          </div>
          <p style={{ ...F.black, fontSize: '16px', color: C.dark, textTransform: 'uppercase', marginBottom: '6px' }}>Tu caja está vacía</p>
          <p style={{ ...F.reg, fontSize: '13px', color: 'rgba(26,26,26,0.5)', marginBottom: '20px' }}>Agrega productos desde el catálogo</p>
          <button style={{ backgroundColor: C.green, color: C.light, border: 'none', cursor: 'pointer', ...F.bold, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '13px 28px' }}>
            Ir al catálogo
          </button>
        </div>
      </ShowcaseBox>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10 — ELEMENTOS DECORATIVOS
// ─────────────────────────────────────────────────────────────────────────────
function DecorativosSection() {
  return (
    <section>
      <SectionHeader num="10" title="Decorativos" accent={C.green} />
      <ShowcaseBox>

        {/* Bauhaus geometry vocabulary */}
        <ComponentLabel>Vocabulario geométrico Bauhaus</ComponentLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', backgroundColor: C.dark, marginBottom: '20px' }}>
          {/* Diagonal strip */}
          <div style={{ backgroundColor: C.dark, height: '90px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-30px', width: '80px', height: '150px', backgroundColor: C.yellow, transform: 'rotate(18deg)' }} />
            <span style={{ position: 'absolute', bottom: '8px', left: '8px', ...F.bold, fontSize: '9px', color: 'rgba(242,240,232,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Diagonal strip</span>
          </div>
          {/* Ghost number */}
          <div style={{ backgroundColor: C.green, height: '90px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '-8px', top: '-18px', ...F.black, fontSize: '110px', color: C.yellow, opacity: 0.1, lineHeight: 1 }}>01</div>
            <span style={{ position: 'absolute', bottom: '8px', left: '8px', ...F.bold, fontSize: '9px', color: 'rgba(242,240,232,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ghost number</span>
          </div>
          {/* Left accent border */}
          <div style={{ backgroundColor: C.light, height: '90px', position: 'relative', borderLeft: `7px solid ${C.red}` }}>
            <div style={{ padding: '12px 12px' }}>
              <span style={{ ...F.black, fontSize: '11px', color: C.dark, textTransform: 'uppercase' }}>Left accent border</span>
              <p style={{ ...F.reg, fontSize: '10px', color: 'rgba(26,26,26,0.5)', marginTop: '4px' }}>7px para plan destacado</p>
            </div>
          </div>
          {/* Dot decoration */}
          <div style={{ backgroundColor: C.dark, height: '90px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-12px', right: '-12px', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: C.red, opacity: 0.3 }} />
            <div style={{ position: 'absolute', bottom: '-8px', left: '-8px', width: '44px', height: '44px', borderRadius: '50%', backgroundColor: C.yellow, opacity: 0.25 }} />
            <span style={{ position: 'absolute', bottom: '8px', right: '8px', ...F.bold, fontSize: '9px', color: 'rgba(242,240,232,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Corner circles</span>
          </div>
        </div>

        {/* Corner squares */}
        <ComponentLabel>Cuadrados de esquina</ComponentLabel>
        <div style={{ backgroundColor: C.green, height: '80px', position: 'relative', overflow: 'hidden', marginBottom: '12px' }}>
          <div style={{ position: 'absolute', top: '0', left: '0', width: '22px', height: '22px', backgroundColor: C.red }} />
          <div style={{ position: 'absolute', top: '0', right: '0', width: '22px', height: '22px', backgroundColor: C.yellow }} />
          <div style={{ position: 'absolute', bottom: '0', left: '0', width: '22px', height: '22px', backgroundColor: C.yellow }} />
          <div style={{ position: 'absolute', bottom: '0', right: '0', width: '22px', height: '22px', backgroundColor: C.red }} />
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', ...F.bold, fontSize: '9px', color: 'rgba(242,240,232,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Corner squares</span>
        </div>

        {/* Color bars */}
        <ComponentLabel>Barra cromática — 4 variantes</ComponentLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
          {[
            [C.green, C.red, C.yellow, C.dark],
            [C.yellow, C.red, C.green, C.light],
            [C.dark, C.yellow, C.red, C.green],
            [C.light, C.dark, C.red, C.yellow],
          ].map((cols, i) => (
            <div key={i} style={{ height: '8px', display: 'flex' }}>
              {cols.map((c, j) => <div key={j} style={{ flex: 1, backgroundColor: c, opacity: c === C.light ? 0.6 : 1 }} />)}
            </div>
          ))}
        </div>

        {/* Accent dividers */}
        <ComponentLabel>Divisores de sección</ComponentLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          {/* Horizontal line */}
          <div style={{ height: '3px', backgroundColor: C.dark }} />
          {/* Yellow + dark rule */}
          <div style={{ display: 'flex', gap: '0' }}>
            <div style={{ height: '3px', flex: 2, backgroundColor: C.yellow }} />
            <div style={{ height: '3px', flex: 5, backgroundColor: C.dark }} />
          </div>
          {/* Centered label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1, height: '2px', backgroundColor: C.dark }} />
            <span style={{ ...F.bold, fontSize: '9px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Entrega</span>
            <div style={{ flex: 1, height: '2px', backgroundColor: C.dark }} />
          </div>
          {/* Bauhaus tick + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ height: '3px', width: '36px', backgroundColor: C.green }} />
            <span style={{ ...F.bold, fontSize: '11px', color: C.green, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Productos</span>
          </div>
        </div>

        {/* Step numbers */}
        <ComponentLabel>Step numbers — "Cómo funciona"</ComponentLabel>
        <div style={{ display: 'flex', gap: '2px' }}>
          {[
            { num: '01', bg: C.green, fg: C.yellow },
            { num: '02', bg: C.yellow, fg: C.green },
            { num: '03', bg: C.red, fg: C.yellow },
            { num: '04', bg: C.dark, fg: C.yellow },
          ].map(({ num, bg, fg }) => (
            <div key={num} style={{ flex: 1, backgroundColor: bg, padding: '12px 8px', textAlign: 'center' }}>
              <div style={{ ...F.black, fontSize: '28px', color: fg, lineHeight: 1 }}>{num}</div>
            </div>
          ))}
        </div>

        {/* Circle image crop */}
        <ComponentLabel>Crop geométrico de imagen — Círculo</ComponentLabel>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '16px 0' }}>
          {[
            { size: '96px', border: C.red,   src: 'https://images.unsplash.com/photo-1543158181-e6f9f6712055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
            { size: '80px', border: C.yellow, src: 'https://images.unsplash.com/photo-1560480219-f372389f053d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
            { size: '64px', border: C.green,  src: 'https://images.unsplash.com/photo-1702375783069-40d2ff59e91d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
            { size: '48px', border: C.dark,   src: 'https://images.unsplash.com/photo-1682080124679-b65a314aa26a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
          ].map(({ size, border, src }) => (
            <div key={size} style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${border}`, flexShrink: 0 }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

      </ShowcaseBox>

      {/* Footer */}
      <div style={{ backgroundColor: C.dark, padding: '28px 24px' }}>
        <div style={{ ...F.black, fontSize: '11px', color: C.yellow, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>Verde Bonito · Design System</div>
        <p style={{ ...F.dancing, fontSize: '18px', color: 'rgba(242,240,232,0.6)' }}>Crafted with Bauhaus soul.</p>
        <div style={{ height: '6px', display: 'flex', marginTop: '20px' }}>
          {[C.green, C.red, C.yellow, C.dark, C.light].map((c, i) => (
            <div key={i} style={{ flex: 1, backgroundColor: c, opacity: c === C.light ? 0.4 : 1 }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export function DesignSystemPage() {
  return (
    <div style={{ backgroundColor: C.light }}>
      <DSPageHeader />
      <IdentidadSection />
      <ColoresSection />
      <TipografiaSection />
      <BotonesSection />
      <FormulariosSection />
      <ChipsBadgesSection />
      <TarjetasSection />
      <NavegacionSection />
      <FeedbackSection />
      <DecorativosSection />
    </div>
  );
}
