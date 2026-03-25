import { useState } from 'react';
import { Plus, Minus, Trash2, Package, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';

const C = { green: '#1B7F4A', red: '#E63329', yellow: '#F5C800', dark: '#1A1A1A', light: '#F2F0E8', white: '#FFFFFF' };
const F = {
  black:   { fontFamily: "'Roboto', sans-serif", fontWeight: 900 } as React.CSSProperties,
  bold:    { fontFamily: "'Roboto', sans-serif", fontWeight: 700 } as React.CSSProperties,
  reg:     { fontFamily: "'Roboto', sans-serif", fontWeight: 400 } as React.CSSProperties,
  dancing: { fontFamily: "'Dancing Script', cursive", fontStyle: 'italic' } as React.CSSProperties,
};
const formatCLP = (n: number) => `$${n.toLocaleString('es-CL')}`;

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyBox() {
  return (
    <div style={{ backgroundColor: C.light, padding: '0 20px' }}>
      {/* CTA block */}
      <div style={{ backgroundColor: C.dark, padding: '40px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', backgroundColor: C.yellow, opacity: 0.1 }} />
        <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: C.red, opacity: 0.12 }} />

        <div style={{ width: '72px', height: '72px', backgroundColor: C.yellow, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Package size={32} color={C.dark} strokeWidth={2} />
        </div>

        <h2 style={{ ...F.black, fontSize: '22px', color: C.light, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '10px', position: 'relative', zIndex: 1 }}>
          TU CAJA<br />ESTÁ VACÍA
        </h2>
        <p style={{ ...F.dancing, fontSize: '17px', color: C.yellow, marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          Elige los productos que más te gusten.
        </p>

        <Link
          to="/catalogo"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: C.green, color: C.light, ...F.bold, fontSize: '13px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px 32px', textDecoration: 'none', position: 'relative', zIndex: 1 }}
        >
          <ShoppingBag size={16} strokeWidth={2} />
          Ir al catálogo
        </Link>
      </div>

      {/* No plan? Subscribe nudge */}
      <div style={{ backgroundColor: C.red, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div>
          <p style={{ ...F.black, fontSize: '14px', color: C.light, textTransform: 'uppercase', lineHeight: 1.2, marginBottom: '2px' }}>¿Aún sin plan?</p>
          <p style={{ ...F.reg, fontSize: '12px', color: 'rgba(242,240,232,0.7)' }}>Desde $9.900/semana</p>
        </div>
        <Link
          to="/suscribirse"
          style={{ backgroundColor: C.yellow, color: C.dark, ...F.bold, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '10px 16px', textDecoration: 'none', flexShrink: 0 }}
        >
          Ver planes
        </Link>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function MyBoxPage() {
  const { items, updateQty, removeItem, totalItems, totalPrice, totalKg, planKg, planName } = useCart();
  const [confirmed, setConfirmed] = useState(false);

  const fillPct = Math.min((totalKg / planKg) * 100, 100);
  const remaining = Math.max(0, planKg - totalKg);
  const isOverWeight = totalKg > planKg;

  return (
    <div style={{ backgroundColor: C.light, minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div style={{ backgroundColor: C.dark, padding: '36px 24px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '90px', height: '90px', backgroundColor: C.yellow, opacity: 0.12 }} />
        <div style={{ position: 'absolute', bottom: 0, left: '24px', width: '48px', height: '5px', backgroundColor: C.green }} />
        <div style={{ position: 'absolute', top: '20px', right: '28px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: C.red, opacity: 0.3 }} />

        <p style={{ ...F.bold, fontSize: '11px', color: C.yellow, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px', position: 'relative', zIndex: 1 }}>
          Esta semana
        </p>
        <h1 style={{ ...F.black, fontSize: '36px', color: C.light, textTransform: 'uppercase', lineHeight: 1.0, letterSpacing: '-0.02em', position: 'relative', zIndex: 1 }}>
          MI CAJA
        </h1>
        {items.length > 0 && (
          <p style={{ ...F.dancing, fontSize: '16px', color: 'rgba(242,240,232,0.6)', marginTop: '6px', position: 'relative', zIndex: 1 }}>
            {planName}
          </p>
        )}
      </div>

      {/* ── Weight progress bar ── */}
      {items.length > 0 && (
        <div style={{ backgroundColor: isOverWeight ? C.red : C.green, padding: '20px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
            <span style={{ ...F.bold, fontSize: '13px', color: C.light, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Peso total
            </span>
            <span style={{ ...F.black, fontSize: '22px', color: C.yellow }}>
              {totalKg.toFixed(2)} <span style={{ fontSize: '14px' }}>/ {planKg} kg</span>
            </span>
          </div>
          <div style={{ height: '12px', backgroundColor: 'rgba(0,0,0,0.25)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${fillPct}%`, backgroundColor: isOverWeight ? C.yellow : C.yellow, transition: 'width 0.3s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ ...F.reg, fontSize: '11px', color: 'rgba(242,240,232,0.6)' }}>0 kg</span>
            {isOverWeight
              ? <span style={{ ...F.bold, fontSize: '11px', color: C.yellow }}>+{(totalKg - planKg).toFixed(2)} kg sobre el límite</span>
              : <span style={{ ...F.reg, fontSize: '11px', color: 'rgba(242,240,232,0.6)' }}>Faltan {remaining.toFixed(2)} kg · {planKg} kg</span>
            }
          </div>
        </div>
      )}

      {/* ── Delivery strip ── */}
      {items.length > 0 && (
        <div style={{ backgroundColor: C.yellow, padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Package size={18} strokeWidth={2.5} color={C.dark} />
          <span style={{ ...F.bold, fontSize: '13px', color: C.dark, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Entrega: Sábado 29 de marzo
          </span>
        </div>
      )}

      {/* ── Content ── */}
      {items.length === 0 ? (
        <EmptyBox />
      ) : (
        <>
          {/* Items list */}
          <div style={{ backgroundColor: C.light, padding: '20px 16px' }}>
            {items.map(item => (
              <div
                key={item.id}
                style={{
                  backgroundColor: C.white, marginBottom: '10px',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px', borderLeft: `5px solid ${item.accentColor}`,
                }}
              >
                {/* Image */}
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `2px solid ${item.accentColor}` }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ ...F.bold, fontSize: '14px', color: C.dark, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '2px' }}>
                    {item.name}
                  </p>
                  <p style={{ ...F.reg, fontSize: '11px', color: 'rgba(26,26,26,0.5)', marginBottom: '2px' }}>
                    {item.weight} × {item.qty}
                  </p>
                  <p style={{ ...F.black, fontSize: '14px', color: C.green }}>
                    {formatCLP(item.price * item.qty)}
                  </p>
                </div>

                {/* Qty controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    style={{ width: '28px', height: '28px', backgroundColor: item.qty === 1 ? C.red : C.dark, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.light }}
                  >
                    {item.qty === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                  </button>
                  <span style={{ ...F.black, fontSize: '16px', color: C.dark, minWidth: '20px', textAlign: 'center' }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    style={{ width: '28px', height: '28px', backgroundColor: C.green, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.light }}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}

            {/* Add more */}
            <Link
              to="/catalogo"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'transparent', border: `2px dashed ${C.dark}`, padding: '14px', marginBottom: '20px', textDecoration: 'none' }}
            >
              <Plus size={16} color={C.dark} strokeWidth={2.5} />
              <span style={{ ...F.bold, fontSize: '12px', color: C.dark, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Agregar más productos
              </span>
            </Link>
          </div>

          {/* Order summary */}
          <div style={{ backgroundColor: C.dark, padding: '24px' }}>
            {/* Over-weight warning */}
            {isOverWeight && (
              <div style={{ backgroundColor: C.red, padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ ...F.bold, fontSize: '18px', color: C.light }}>!</span>
                <p style={{ ...F.bold, fontSize: '12px', color: C.light, letterSpacing: '0.04em' }}>
                  Excediste el límite del {planName} ({planKg} kg). Retira algunos productos o cambia de plan.
                </p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ ...F.reg, fontSize: '13px', color: 'rgba(242,240,232,0.6)' }}>Subtotal</span>
              <span style={{ ...F.bold, fontSize: '15px', color: C.light }}>{formatCLP(totalPrice)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ ...F.reg, fontSize: '13px', color: 'rgba(242,240,232,0.6)' }}>Despacho</span>
              <span style={{ ...F.bold, fontSize: '13px', color: C.yellow }}>Gratis</span>
            </div>
            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.12)', margin: '14px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ ...F.black, fontSize: '15px', color: C.light, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</span>
              <span style={{ ...F.black, fontSize: '24px', color: C.yellow }}>{formatCLP(totalPrice)}</span>
            </div>

            {/* Confirm button */}
            <button
              onClick={() => !isOverWeight && setConfirmed(true)}
              style={{
                width: '100%',
                backgroundColor: confirmed ? C.green : isOverWeight ? 'rgba(255,255,255,0.15)' : C.red,
                color: isOverWeight ? 'rgba(242,240,232,0.35)' : C.light,
                border: 'none',
                cursor: isOverWeight ? 'not-allowed' : 'pointer',
                ...F.bold, fontSize: '14px', letterSpacing: '0.15em',
                textTransform: 'uppercase', padding: '18px',
                transition: 'background-color 0.2s',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {!confirmed && !isOverWeight && (
                <span style={{ position: 'absolute', left: 0, top: 0, width: '5px', height: '100%', backgroundColor: C.yellow, opacity: 0.5 }} />
              )}
              {confirmed ? '✓ PEDIDO CONFIRMADO' : isOverWeight ? 'EXCEDE EL LÍMITE' : 'CONFIRMAR PEDIDO'}
            </button>

            {confirmed && (
              <p style={{ ...F.reg, fontSize: '12px', color: 'rgba(242,240,232,0.6)', textAlign: 'center', marginTop: '12px' }}>
                Te notificaremos por WhatsApp cuando tu caja esté en camino. 📦
              </p>
            )}

            {/* Subscribe upsell */}
            {!confirmed && (
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ width: '4px', height: '32px', backgroundColor: C.yellow, flexShrink: 0 }} />
                <p style={{ ...F.reg, fontSize: '11px', color: 'rgba(242,240,232,0.45)', lineHeight: 1.5, flex: 1 }}>
                  Suscríbete y ahorra hasta <span style={{ color: C.yellow, ...F.bold }}>$11.700/mes</span>
                </p>
                <Link
                  to="/suscribirse"
                  style={{ backgroundColor: C.yellow, color: C.dark, ...F.bold, fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '8px 12px', textDecoration: 'none', flexShrink: 0 }}
                >
                  Ver planes
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
