import { Link, useLocation } from 'react-router';
import { Home, ShoppingBag, Package, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const C = { yellow: '#F5C800', dark: '#1A1A1A', light: '#F2F0E8', red: '#E63329' };
const F = { bold: { fontFamily: "'Roboto', sans-serif", fontWeight: 700 } };

const navItems = [
  { icon: Home,        label: 'Inicio',   path: '/' },
  { icon: ShoppingBag, label: 'Catálogo', path: '/catalogo' },
  { icon: Package,     label: 'Mi Caja',  path: '/mi-caja' },
  { icon: User,        label: 'Cuenta',   path: '/cuenta' },
];

export function BottomNav() {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '390px',
        backgroundColor: C.dark,
        borderTop: `4px solid ${C.yellow}`,
        display: 'flex',
        zIndex: 100,
      }}
    >
      {navItems.map(({ icon: Icon, label, path }) => {
        const isActive = location.pathname === path;
        const showBadge = path === '/mi-caja' && totalItems > 0;

        return (
          <Link
            key={path}
            to={path}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 4px 8px',
              color: isActive ? C.yellow : C.light,
              textDecoration: 'none',
              ...F.bold,
              fontSize: '9px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              gap: '4px',
              borderBottom: isActive ? `3px solid ${C.yellow}` : '3px solid transparent',
              marginBottom: '-3px',
              position: 'relative',
            }}
          >
            {/* Icon wrapper for badge */}
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              {showBadge && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-8px',
                    minWidth: '16px',
                    height: '16px',
                    borderRadius: '8px',
                    backgroundColor: C.red,
                    border: `2px solid ${C.dark}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontWeight: 900,
                      fontSize: '8px',
                      color: '#fff',
                      lineHeight: 1,
                    }}
                  >
                    {totalItems > 99 ? '99' : totalItems}
                  </span>
                </div>
              )}
            </div>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
