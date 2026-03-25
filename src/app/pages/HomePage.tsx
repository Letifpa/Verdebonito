import { Link } from 'react-router';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

// ── Color palette ──────────────────────────────────────────────────────────────
const C = {
  green: '#1B7F4A',
  red: '#E63329',
  yellow: '#F5C800',
  dark: '#1A1A1A',
  light: '#F2F0E8',
};

// ── Font shorthand objects (inline style fragments) ────────────────────────────
const F = {
  black: { fontFamily: "'Roboto', sans-serif", fontWeight: 900 },
  bold: { fontFamily: "'Roboto', sans-serif", fontWeight: 700 },
  reg: { fontFamily: "'Roboto', sans-serif", fontWeight: 400 },
  dancing: { fontFamily: "'Dancing Script', cursive", fontStyle: 'italic' as const },
};

// ── Image URLs ─────────────────────────────────────────────────────────────────
const IMGS = {
  hero: 'https://images.unsplash.com/photo-1741517287225-7cd8d44b3cf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  strawberry: 'https://images.unsplash.com/photo-1543158181-e6f9f6712055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  peach: 'https://images.unsplash.com/photo-1560480219-f372389f053d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  watermelon: 'https://images.unsplash.com/photo-1659030177651-cd52b95bb4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  basil: 'https://images.unsplash.com/photo-1757111085183-291e46b4e8f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  mushroom: 'https://images.unsplash.com/photo-1702375783069-40d2ff59e91d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  chard: 'https://images.unsplash.com/photo-1682080124679-b65a314aa26a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
};

// ── Sticky Top App Bar ────────────────────────────────────────────────────────
function HomeAppBar() {
  const { totalItems } = useCart();
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 40,
      backgroundColor: '#1A1A1A', borderBottom: '4px solid #F5C800',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', height: '58px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', backgroundColor: '#F5C800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 900, fontSize: '17px', color: '#1B7F4A', lineHeight: 1 }}>V</span>
        </div>
        <div style={{ lineHeight: 1 }}>
          <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 900, fontSize: '13px', color: '#F2F0E8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>VERDE </span>
          <span style={{ fontFamily: "'Dancing Script',cursive", fontStyle: 'italic', fontSize: '16px', color: '#F5C800' }}>Bonito</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Link to="/mi-caja" style={{ position: 'relative', padding: '8px', display: 'flex' }}>
          <ShoppingCart size={22} color="#F2F0E8" strokeWidth={1.8} />
          {totalItems > 0 && (
            <div style={{ position: 'absolute', top: '2px', right: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#E63329', border: '2px solid #1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 900, fontSize: '8px', color: '#fff', lineHeight: 1 }}>{totalItems}</span>
            </div>
          )}
        </Link>
        <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(242,240,232,0.15)' }} />
        <Link to="/cuenta" style={{ padding: '8px', display: 'flex' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(242,240,232,0.1)', border: '1.5px solid rgba(242,240,232,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={13} color="#F2F0E8" strokeWidth={2} />
          </div>
        </Link>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section style={{ backgroundColor: C.green, position: 'relative', overflow: 'hidden', minHeight: '600px', padding: '32px 24px 52px' }}>

      {/* Yellow diagonal block — upper right */}
      <div style={{
        position: 'absolute', top: '-60px', right: '-70px',
        width: '210px', height: '520px',
        backgroundColor: C.yellow,
        transform: 'rotate(18deg)',
        zIndex: 0,
      }} />

      {/* Red geometric accent — lower left */}
      <div style={{
        position: 'absolute', bottom: '100px', left: 0,
        width: '52px', height: '52px',
        backgroundColor: C.red,
        zIndex: 0,
      }} />

      {/* Red circle accent — top right */}
      <div style={{
        position: 'absolute', top: '24px', right: '24px',
        width: '28px', height: '28px',
        borderRadius: '50%',
        backgroundColor: C.red,
        zIndex: 2,
      }} />

      {/* Dark rectangle — decorative bottom */}
      <div style={{
        position: 'absolute', bottom: 0, right: '80px',
        width: '60px', height: '14px',
        backgroundColor: C.dark,
        zIndex: 0,
      }} />

      {/* ── Logo ── */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '40px', height: '40px',
          backgroundColor: C.yellow, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ ...F.black, fontSize: '20px', color: C.green, lineHeight: 1 }}>V</span>
        </div>
        <div>
          <div style={{ ...F.black, fontSize: '15px', color: C.light, letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: 1.1 }}>VERDE BONITO</div>
          <div style={{ ...F.reg, fontSize: '10px', color: C.yellow, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Delivery de campo</div>
        </div>
      </div>

      {/* ── Hero circle image ── */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', marginBottom: '36px' }}>
        {/* Outer yellow ring */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '244px', height: '244px',
            borderRadius: '50%',
            backgroundColor: C.yellow,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '228px', height: '228px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: `4px solid ${C.dark}`,
            }}>
              <img src={IMGS.hero} alt="Verduras frescas coloridas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          {/* Small decorative square on the circle */}
          <div style={{
            position: 'absolute', bottom: '8px', right: '-8px',
            width: '32px', height: '32px',
            backgroundColor: C.red,
          }} />
        </div>
      </div>

      {/* ── H1 ── */}
      <h1 style={{
        ...F.black, fontSize: '40px', color: C.light,
        textTransform: 'uppercase', lineHeight: 1.0,
        marginBottom: '18px', position: 'relative', zIndex: 2,
        letterSpacing: '-0.02em',
      }}>
        VERDURAS<br />FRESCAS.<br />EN TU<br />PUERTA.
      </h1>

      {/* ── Dancing Script subtitle ── */}
      <p style={{
        ...F.dancing, fontSize: '23px', color: C.yellow,
        marginBottom: '36px', position: 'relative', zIndex: 2,
        lineHeight: 1.4,
      }}>
        Directo del campo a tu mesa,<br />cada semana.
      </p>

      {/* ── CTA Button ── */}
      <Link
        to="/catalogo"
        style={{
          display: 'inline-block',
          backgroundColor: C.red, color: C.light,
          ...F.bold, fontSize: '14px', letterSpacing: '0.15em',
          textTransform: 'uppercase', padding: '16px 44px',
          textDecoration: 'none', position: 'relative', zIndex: 2,
        }}
      >
        Ver catálogo
      </Link>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — HOW IT WORKS
// ═══════════════════════════════════════════════════════════════════════════════
const STEPS = [
  {
    num: '01', title: 'ELIGE TU PLAN',
    desc: 'Semana a semana o por el mes completo. Sin permanencia. Te vas cuando quieras.',
    bg: C.green, textColor: C.light, numColor: C.yellow, accentColor: C.red,
    icon: '📋',
  },
  {
    num: '02', title: 'SELECCIONA TUS KILOS',
    desc: '5 kg para ti, 10 kg para tu familia, 15 kg para los que aman comer bien.',
    bg: C.yellow, textColor: C.dark, numColor: C.green, accentColor: C.dark,
    icon: '⚖️',
  },
  {
    num: '03', title: 'ARMA TU CAJA',
    desc: 'Elige las frutas, verduras, hierbas y hongos que quieres recibir. Tú mandas.',
    bg: C.red, textColor: C.light, numColor: C.yellow, accentColor: C.dark,
    icon: '📦',
  },
  {
    num: '04', title: 'RECIBE EN CASA',
    desc: 'Fresquito y listo para cocinar, donde estés en Chile.',
    bg: C.dark, textColor: C.light, numColor: C.yellow, accentColor: C.green,
    icon: '🚚',
  },
];

function HowItWorksSection() {
  return (
    <section>
      {/* Section label strip */}
      <div style={{
        backgroundColor: C.light, padding: '24px 24px 16px',
        display: 'flex', alignItems: 'center', gap: '12px',
        borderBottom: `4px solid ${C.dark}`,
      }}>
        <div style={{ height: '3px', flex: 1, backgroundColor: C.dark }} />
        <span style={{ ...F.black, fontSize: '12px', color: C.dark, letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          Cómo funciona
        </span>
        <div style={{ height: '3px', flex: 1, backgroundColor: C.dark }} />
      </div>

      {STEPS.map(({ num, title, desc, bg, textColor, numColor, accentColor }) => (
        <div
          key={num}
          style={{
            backgroundColor: bg,
            padding: '36px 24px 36px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Giant ghost number */}
          <div style={{
            position: 'absolute', right: '-6px', top: '-18px',
            ...F.black, fontSize: '160px', color: numColor, opacity: 0.10,
            lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}>
            {num}
          </div>

          {/* Accent right border */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: '8px', height: '100%',
            backgroundColor: accentColor, opacity: 0.5,
          }} />

          {/* Decorative circle outline */}
          <div style={{
            position: 'absolute', bottom: '-24px', right: '32px',
            width: '90px', height: '90px', borderRadius: '50%',
            border: `5px solid ${numColor}`, opacity: 0.2,
          }} />

          {/* Step number */}
          <div style={{
            ...F.black, fontSize: '80px', color: numColor,
            lineHeight: 1, marginBottom: '4px', position: 'relative', zIndex: 1,
          }}>
            {num}
          </div>

          {/* Title */}
          <h3 style={{
            ...F.black, fontSize: '21px', color: textColor,
            textTransform: 'uppercase', letterSpacing: '0.04em',
            lineHeight: 1.15, marginBottom: '12px', position: 'relative', zIndex: 1,
          }}>
            {title}
          </h3>

          {/* Description */}
          <p style={{
            ...F.reg, fontSize: '15px', color: textColor,
            lineHeight: 1.65, position: 'relative', zIndex: 1,
            maxWidth: '270px', opacity: 0.9,
          }}>
            {desc}
          </p>
        </div>
      ))}
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — SEASONAL PRODUCTS
// ═══════════════════════════════════════════════════════════════════════════════
const PRODUCTS = [
  { name: 'Frutilla', img: IMGS.strawberry, topColor: C.red },
  { name: 'Durazno', img: IMGS.peach, topColor: C.yellow },
  { name: 'Sandía', img: IMGS.watermelon, topColor: C.green },
  { name: 'Albahaca fresca', img: IMGS.basil, topColor: C.green },
  { name: 'Hongos portobello', img: IMGS.mushroom, topColor: C.dark },
  { name: 'Acelga', img: IMGS.chard, topColor: C.red },
];

function SeasonalSection() {
  return (
    <section style={{ backgroundColor: C.light, padding: '40px 20px 48px' }}>
      {/* Section header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{ height: '3px', width: '36px', backgroundColor: C.green }} />
          <span style={{ ...F.bold, fontSize: '11px', color: C.green, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Productos</span>
        </div>
        <h2 style={{
          ...F.black, fontSize: '34px', color: C.dark,
          textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.05,
          marginBottom: '10px',
        }}>
          DE TEMPORADA
        </h2>
        <p style={{ ...F.dancing, fontSize: '20px', color: C.green, lineHeight: 1.4 }}>
          Lo mejor de cada estación, recién cosechado.
        </p>
      </div>

      {/* 2-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        {PRODUCTS.map(({ name, img, topColor }) => (
          <Link
            key={name}
            to="/catalogo"
            style={{ textDecoration: 'none', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 0 16px', overflow: 'hidden' }}
          >
            <div style={{ width: '100%', height: '8px', backgroundColor: topColor, marginBottom: '16px' }} />
            <div style={{ width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden', border: `4px solid ${topColor}`, backgroundColor: C.light, marginBottom: '12px' }}>
              <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <p style={{ ...F.bold, fontSize: '13px', color: C.dark, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.25, padding: '0 8px', marginBottom: '10px' }}>
              {name}
            </p>
            <span style={{ backgroundColor: C.yellow, color: C.dark, ...F.bold, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px' }}>
              Temporada
            </span>
          </Link>
        ))}
      </div>

      {/* View all link */}
      <Link to="/catalogo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: C.dark, padding: '14px', textDecoration: 'none' }}>
        <span style={{ ...F.bold, fontSize: '12px', color: C.yellow, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Ver catálogo completo →
        </span>
      </Link>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — COLLECTION ZONES
// ═══════════════════════════════════════════════════════════════════════════════
const ZONES = [
  { num: '01', color: C.yellow, textOnColor: C.dark, name: 'VALLE DE OLMUÉ', desc: 'Frutas y hierbas del litoral central' },
  { num: '02', color: C.red, textOnColor: C.light, name: 'CAMPOS DE RAÑILCO', desc: 'Verduras de hoja y hongos nativos' },
  { num: '03', color: C.green, textOnColor: C.light, name: 'HUERTOS DE NILAHUE', desc: 'Berries y frutas de temporada' },
  { num: '04', color: C.light, textOnColor: C.dark, name: 'TERRAZAS DE PICHIDEGUA', desc: 'Raíces, tubérculos y alliums' },
];

function ZonesSection() {
  return (
    <section style={{ backgroundColor: C.dark }}>
      {/* Header */}
      <div style={{ padding: '40px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{ height: '3px', width: '32px', backgroundColor: C.yellow }} />
          <span style={{ ...F.bold, fontSize: '11px', color: C.yellow, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Origen</span>
        </div>
        <h2 style={{
          ...F.black, fontSize: '30px', color: C.light,
          textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.05,
          marginBottom: '32px',
        }}>
          DESDE EL CORAZÓN<br />DE CHILE
        </h2>
      </div>

      {/* Abstract geometric Chile map */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 24px 32px' }}>
        <svg viewBox="0 0 340 300" width="100%" height="auto" style={{ maxWidth: '340px' }}>
          {/* Background decorative rectangles — Bauhaus style */}
          <rect x="0" y="0" width="340" height="300" fill="none" />

          {/* Abstract Chile shape — stylized thin vertical polygon */}
          <polygon
            points="148,10 192,10 200,80 186,140 194,200 178,262 158,285 136,262 124,200 134,140 122,80"
            fill={C.green} opacity="0.25"
          />
          <polygon
            points="148,10 192,10 200,80 186,140 194,200 178,262 158,285 136,262 124,200 134,140 122,80"
            fill="none" stroke={C.light} strokeWidth="1.5" opacity="0.35"
          />

          {/* Horizontal decorative lines */}
          <line x1="10" y1="68" x2="120" y2="68" stroke={C.yellow} strokeWidth="2" opacity="0.4" />
          <line x1="202" y1="128" x2="330" y2="128" stroke={C.red} strokeWidth="2" opacity="0.4" />
          <line x1="10" y1="185" x2="122" y2="185" stroke={C.green} strokeWidth="2" opacity="0.4" />
          <line x1="196" y1="240" x2="330" y2="240" stroke={C.light} strokeWidth="2" opacity="0.4" />

          {/* Zone 1 — Valle de Olmué: Yellow */}
          <circle cx="170" cy="66" r="18" fill={C.yellow} />
          <text x="170" y="72" textAnchor="middle" fill={C.dark} fontSize="14" fontFamily="Roboto, sans-serif" fontWeight="900">01</text>
          {/* Label left side */}
          <text x="108" y="63" textAnchor="end" fill={C.yellow} fontSize="10" fontFamily="Roboto, sans-serif" fontWeight="700">OLMUÉ</text>

          {/* Zone 2 — Rañilco: Red */}
          <circle cx="160" cy="128" r="18" fill={C.red} />
          <text x="160" y="134" textAnchor="middle" fill={C.light} fontSize="14" fontFamily="Roboto, sans-serif" fontWeight="900">02</text>
          {/* Label right side */}
          <text x="182" y="125" textAnchor="start" fill={C.red} fontSize="10" fontFamily="Roboto, sans-serif" fontWeight="700">RAÑILCO</text>

          {/* Zone 3 — Nilahue: Green */}
          <circle cx="164" cy="188" r="18" fill={C.green} />
          <text x="164" y="194" textAnchor="middle" fill={C.light} fontSize="14" fontFamily="Roboto, sans-serif" fontWeight="900">03</text>
          {/* Label left side */}
          <text x="142" y="185" textAnchor="end" fill="#6fcf97" fontSize="10" fontFamily="Roboto, sans-serif" fontWeight="700">NILAHUE</text>

          {/* Zone 4 — Pichidegua: Light */}
          <circle cx="157" cy="248" r="18" fill={C.light} />
          <text x="157" y="254" textAnchor="middle" fill={C.dark} fontSize="14" fontFamily="Roboto, sans-serif" fontWeight="900">04</text>
          {/* Label right side */}
          <text x="179" y="245" textAnchor="start" fill={C.light} fontSize="10" fontFamily="Roboto, sans-serif" fontWeight="700" opacity="0.8">PICHIDEGUA</text>

          {/* Decorative Bauhaus elements */}
          <rect x="10" y="10" width="40" height="40" fill={C.yellow} opacity="0.15" />
          <circle cx="320" cy="20" r="16" fill={C.red} opacity="0.2" />
          <rect x="298" y="258" width="30" height="30" fill={C.green} opacity="0.15" />
          <circle cx="20" cy="270" r="12" fill={C.yellow} opacity="0.2" />
        </svg>
      </div>

      {/* Zone list */}
      {ZONES.map(({ num, color, textOnColor, name, desc }) => (
        <div
          key={num}
          style={{
            borderTop: `1px solid rgba(255,255,255,0.08)`,
            padding: '20px 24px',
            display: 'flex', alignItems: 'flex-start', gap: '16px',
          }}
        >
          {/* Color marker square */}
          <div style={{
            width: '40px', height: '40px',
            backgroundColor: color,
            flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ ...F.black, fontSize: '13px', color: textOnColor, lineHeight: 1 }}>{num}</span>
          </div>

          {/* Text */}
          <div>
            <div style={{
              ...F.black, fontSize: '15px', color: C.light,
              textTransform: 'uppercase', letterSpacing: '0.05em',
              lineHeight: 1.2, marginBottom: '4px',
            }}>
              {name}
            </div>
            <div style={{
              ...F.reg, fontSize: '13px', color: 'rgba(242,240,232,0.6)',
              lineHeight: 1.45,
            }}>
              {desc}
            </div>
          </div>
        </div>
      ))}

      {/* Bauhaus color bar footer */}
      <div style={{ height: '10px', display: 'flex', marginTop: '8px' }}>
        <div style={{ flex: 1, backgroundColor: C.yellow }} />
        <div style={{ flex: 1, backgroundColor: C.red }} />
        <div style={{ flex: 1, backgroundColor: C.green }} />
        <div style={{ flex: 1, backgroundColor: C.light }} />
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — SUBSCRIPTION CTA BANNER
// ═══════════════════════════════════════════════════════════════════════════════
function CTASection() {
  return (
    <section style={{
      backgroundColor: C.red,
      padding: '52px 24px 56px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px',
        width: '130px', height: '130px', borderRadius: '50%',
        backgroundColor: C.dark, opacity: 0.18,
      }} />
      <div style={{
        position: 'absolute', bottom: '-20px', left: '-20px',
        width: '90px', height: '90px', borderRadius: '50%',
        backgroundColor: C.yellow, opacity: 0.2,
      }} />

      {/* Green decorative rectangle */}
      <div style={{
        position: 'absolute', top: '0', left: '0',
        width: '8px', height: '100%',
        backgroundColor: C.dark, opacity: 0.25,
      }} />

      {/* Headline */}
      <h2 style={{
        ...F.black, fontSize: '38px', color: C.light,
        textTransform: 'uppercase', lineHeight: 1.0,
        marginBottom: '18px', position: 'relative', zIndex: 1,
        letterSpacing: '-0.02em',
      }}>
        SUSCRÍBETE<br />Y COME<br />BIEN
      </h2>

      {/* Subtext */}
      <p style={{
        ...F.bold, fontSize: '17px', color: C.light,
        marginBottom: '12px', position: 'relative', zIndex: 1,
        opacity: 0.95,
      }}>
        Desde $9.900 / semana.
      </p>
      <p style={{
        ...F.reg, fontSize: '14px', color: C.light,
        marginBottom: '36px', position: 'relative', zIndex: 1,
        opacity: 0.75,
      }}>
        Sin letra chica. Sin permanencia.
      </p>

      {/* Yellow CTA Button */}
      <Link
        to="/suscribirse"
        style={{
          display: 'inline-block',
          backgroundColor: C.yellow, color: C.dark,
          ...F.bold, fontSize: '14px', letterSpacing: '0.15em',
          textTransform: 'uppercase', padding: '18px 40px',
          textDecoration: 'none', position: 'relative', zIndex: 1,
        }}
      >
        Quiero suscribirme
      </Link>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export function HomePage() {
  return (
    <div>
      <HomeAppBar />
      <HeroSection />
      <HowItWorksSection />
      <SeasonalSection />
      <ZonesSection />
      <CTASection />
    </div>
  );
}