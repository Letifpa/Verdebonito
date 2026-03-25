import { ChevronRight, Bell, MapPin, CreditCard, HelpCircle, LogOut, Leaf } from 'lucide-react';
import { Link } from 'react-router';

const C = {
  green: '#1B7F4A',
  red: '#E63329',
  yellow: '#F5C800',
  dark: '#1A1A1A',
  light: '#F2F0E8',
};
const F = {
  black: { fontFamily: "'Roboto', sans-serif", fontWeight: 900 },
  bold: { fontFamily: "'Roboto', sans-serif", fontWeight: 700 },
  reg: { fontFamily: "'Roboto', sans-serif", fontWeight: 400 },
  dancing: { fontFamily: "'Dancing Script', cursive", fontStyle: 'italic' as const },
};

const RECENT_ORDERS = [
  { date: '15 mar 2026', plan: '10 kg — Semanal', status: 'Entregado', statusColor: C.green },
  { date: '08 mar 2026', plan: '10 kg — Semanal', status: 'Entregado', statusColor: C.green },
  { date: '01 mar 2026', plan: '10 kg — Semanal', status: 'Entregado', statusColor: C.green },
];

const MENU_ITEMS = [
  { icon: Bell, label: 'Notificaciones', sub: 'WhatsApp activo' },
  { icon: MapPin, label: 'Dirección de entrega', sub: 'Av. Italia 1050, Providencia' },
  { icon: CreditCard, label: 'Método de pago', sub: 'Webpay / Transferencia' },
  { icon: HelpCircle, label: 'Ayuda y soporte', sub: 'Contactar equipo' },
];

export function AccountPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ backgroundColor: C.green, padding: '36px 24px 32px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative shapes */}
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', backgroundColor: C.dark, opacity: 0.2 }} />
        <div style={{ position: 'absolute', bottom: '0', left: '80px', width: '8px', height: '60px', backgroundColor: C.yellow, opacity: 0.5 }} />

        <p style={{ ...F.bold, fontSize: '11px', color: C.yellow, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
          Perfil
        </p>

        {/* User avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '68px', height: '68px', borderRadius: '50%',
            backgroundColor: C.yellow,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            border: `4px solid ${C.dark}`,
          }}>
            <span style={{ ...F.black, fontSize: '26px', color: C.green }}>MG</span>
          </div>
          <div>
            <h1 style={{ ...F.black, fontSize: '24px', color: C.light, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '4px' }}>
              María García
            </h1>
            <p style={{ ...F.reg, fontSize: '13px', color: 'rgba(242,240,232,0.75)' }}>
              maria@email.com
            </p>
            <p style={{ ...F.dancing, fontSize: '16px', color: C.yellow, marginTop: '2px' }}>
              Cliente desde enero 2026
            </p>
          </div>
        </div>
      </div>

      {/* Subscription card */}
      <div style={{ backgroundColor: C.dark, margin: '0', padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Leaf size={14} color={C.yellow} strokeWidth={2.5} />
              <span style={{ ...F.bold, fontSize: '11px', color: C.yellow, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Plan activo
              </span>
            </div>
            <p style={{ ...F.black, fontSize: '22px', color: C.light, textTransform: 'uppercase', lineHeight: 1.1 }}>
              10 KG SEMANAL
            </p>
            <p style={{ ...F.reg, fontSize: '12px', color: 'rgba(242,240,232,0.55)', marginTop: '2px' }}>
              $17.900 / semana · Próximo: 29 mar
            </p>
          </div>
          {/* Active badge */}
          <div style={{ backgroundColor: C.green, padding: '6px 12px', flexShrink: 0 }}>
            <span style={{ ...F.bold, fontSize: '10px', color: C.light, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Activo</span>
          </div>
        </div>

        {/* Progress to next delivery */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ ...F.reg, fontSize: '11px', color: 'rgba(242,240,232,0.5)' }}>Próxima entrega</span>
            <span style={{ ...F.bold, fontSize: '11px', color: C.yellow }}>5 días</span>
          </div>
          <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <div style={{ height: '100%', width: '28%', backgroundColor: C.yellow }} />
          </div>
        </div>

        <Link to="/suscribirse" style={{
          display: 'block', marginTop: '16px',
          backgroundColor: C.red, color: C.light,
          ...F.bold, fontSize: '12px', letterSpacing: '0.12em',
          textTransform: 'uppercase', padding: '12px',
          textDecoration: 'none', textAlign: 'center',
        }}>
          Cambiar plan
        </Link>
      </div>

      {/* Stats row */}
      <div style={{ backgroundColor: C.yellow, display: 'flex' }}>
        {[
          { value: '12', label: 'Cajas\nrecibidas' },
          { value: '~120', label: 'Kilos de\nproduce' },
          { value: '3', label: 'Meses\nsuscrito' },
        ].map(({ value, label }, i) => (
          <div key={i} style={{
            flex: 1, padding: '18px 8px', textAlign: 'center',
            borderRight: i < 2 ? `2px solid rgba(26,26,26,0.2)` : undefined,
          }}>
            <div style={{ ...F.black, fontSize: '26px', color: C.dark, lineHeight: 1 }}>{value}</div>
            <div style={{ ...F.reg, fontSize: '11px', color: C.dark, marginTop: '4px', whiteSpace: 'pre-line', opacity: 0.7 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Menu items */}
      <div style={{ backgroundColor: C.light, padding: '16px 0' }}>
        <p style={{ ...F.bold, fontSize: '11px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0 24px', marginBottom: '8px' }}>
          Configuración
        </p>
        {MENU_ITEMS.map(({ icon: Icon, label, sub }) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            padding: '14px 24px',
            backgroundColor: '#FFFFFF',
            borderBottom: `1px solid rgba(0,0,0,0.05)`,
            cursor: 'pointer',
          }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={16} color={C.yellow} strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ ...F.bold, fontSize: '14px', color: C.dark, margin: 0 }}>{label}</p>
              <p style={{ ...F.reg, fontSize: '11px', color: 'rgba(26,26,26,0.45)', margin: 0 }}>{sub}</p>
            </div>
            <ChevronRight size={18} color="rgba(26,26,26,0.3)" />
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div style={{ backgroundColor: C.light, padding: '20px 0' }}>
        <p style={{ ...F.bold, fontSize: '11px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0 24px', marginBottom: '8px' }}>
          Historial de pedidos
        </p>
        {RECENT_ORDERS.map((order, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 24px', backgroundColor: '#FFFFFF',
            borderBottom: `1px solid rgba(0,0,0,0.05)`,
          }}>
            <div>
              <p style={{ ...F.bold, fontSize: '13px', color: C.dark, margin: 0 }}>{order.date}</p>
              <p style={{ ...F.reg, fontSize: '12px', color: 'rgba(26,26,26,0.5)', margin: 0 }}>{order.plan}</p>
            </div>
            <span style={{
              backgroundColor: order.statusColor, color: C.light,
              ...F.bold, fontSize: '9px', letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '4px 10px',
            }}>
              {order.status}
            </span>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div style={{ padding: '20px 24px 16px', backgroundColor: C.light }}>
        <button style={{
          width: '100%', backgroundColor: 'transparent',
          border: `2px solid ${C.dark}`, color: C.dark,
          ...F.bold, fontSize: '13px', letterSpacing: '0.12em',
          textTransform: 'uppercase', padding: '14px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
        }}>
          <LogOut size={16} strokeWidth={2} />
          Cerrar sesión
        </button>

        {/* Design system link */}
        <Link
          to="/design-system"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            marginTop: '12px', padding: '10px',
            backgroundColor: C.dark,
            textDecoration: 'none',
          }}
        >
          <div style={{ width: '14px', height: '14px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              <div style={{ flex: 1, height: '5px', backgroundColor: C.yellow }} />
              <div style={{ flex: 1, height: '5px', backgroundColor: C.red }} />
            </div>
            <div style={{ display: 'flex', gap: '2px' }}>
              <div style={{ flex: 1, height: '5px', backgroundColor: C.green }} />
              <div style={{ flex: 1, height: '5px', backgroundColor: C.light, opacity: 0.6 }} />
            </div>
          </div>
          <span style={{ ...F.bold, fontSize: '10px', color: C.yellow, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Design System
          </span>
        </Link>
      </div>
    </div>
  );
}