import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, User, Check } from 'lucide-react';
import { Link } from 'react-router';
import { useCart, type CartProduct } from '../context/CartContext';

// ── Palette & typography ─────────────────────────────────────────────────────
const C = {
  green:  '#1B7F4A',
  red:    '#E63329',
  yellow: '#F5C800',
  dark:   '#1A1A1A',
  light:  '#F2F0E8',
  white:  '#FFFFFF',
};
const F = {
  black:   { fontFamily: "'Roboto', sans-serif", fontWeight: 900 } as React.CSSProperties,
  bold:    { fontFamily: "'Roboto', sans-serif", fontWeight: 700 } as React.CSSProperties,
  reg:     { fontFamily: "'Roboto', sans-serif", fontWeight: 400 } as React.CSSProperties,
  dancing: { fontFamily: "'Dancing Script', cursive", fontStyle: 'italic' } as React.CSSProperties,
};

// ── Data ─────────────────────────────────────────────────────────────────────
type Category = 'Todos' | 'Frutas' | 'Verduras' | 'Hierbas' | 'Hongos';

interface Product extends CartProduct {
  category: Exclude<Category, 'Todos'>;
  seasonal: boolean;
}

const FILTERS: { label: Category; emoji: string }[] = [
  { label: 'Todos',    emoji: '' },
  { label: 'Frutas',   emoji: '🍎' },
  { label: 'Verduras', emoji: '🥦' },
  { label: 'Hierbas',  emoji: '🌿' },
  { label: 'Hongos',   emoji: '🍄' },
];

const PRODUCTS: Product[] = [
  {
    id: 1, name: 'Frutilla', weight: '250 g', weightKg: 0.25, price: 1490,
    category: 'Frutas', seasonal: true, accentColor: C.red,
    img: 'https://images.unsplash.com/photo-1543158181-e6f9f6712055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    id: 2, name: 'Durazno', weight: '500 g', weightKg: 0.5, price: 1990,
    category: 'Frutas', seasonal: true, accentColor: C.yellow,
    img: 'https://images.unsplash.com/photo-1560480219-f372389f053d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    id: 3, name: 'Sandía', weight: '1 kg', weightKg: 1.0, price: 2490,
    category: 'Frutas', seasonal: true, accentColor: C.green,
    img: 'https://images.unsplash.com/photo-1659030177651-cd52b95bb4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    id: 4, name: 'Albahaca', weight: 'atado', weightKg: 0.15, price: 890,
    category: 'Hierbas', seasonal: true, accentColor: C.green,
    img: 'https://images.unsplash.com/photo-1757111085183-291e46b4e8f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    id: 5, name: 'Hongos portobello', weight: '200 g', weightKg: 0.2, price: 2990,
    category: 'Hongos', seasonal: false, accentColor: C.dark,
    img: 'https://images.unsplash.com/photo-1702375783069-40d2ff59e91d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    id: 6, name: 'Acelga', weight: 'atado', weightKg: 0.3, price: 890,
    category: 'Verduras', seasonal: true, accentColor: C.green,
    img: 'https://images.unsplash.com/photo-1682080124679-b65a314aa26a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    id: 7, name: 'Espinaca', weight: '200 g', weightKg: 0.2, price: 1190,
    category: 'Verduras', seasonal: false, accentColor: C.green,
    img: 'https://images.unsplash.com/photo-1634731201932-9bd92839bea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    id: 8, name: 'Limón', weight: '500 g', weightKg: 0.5, price: 1290,
    category: 'Frutas', seasonal: false, accentColor: C.yellow,
    img: 'https://images.unsplash.com/photo-1568955310207-a723f5585016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
];

const formatCLP = (n: number) => `$${n.toLocaleString('es-CL')}`;

// ── Top App Bar ───────────────────────────────────────────────────────────────
function TopAppBar({ cartCount }: { cartCount: number }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 40,
      backgroundColor: C.dark, borderBottom: `4px solid ${C.yellow}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', height: '60px', flexShrink: 0,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{ width: '34px', height: '34px', backgroundColor: C.yellow, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ ...F.black, fontSize: '18px', color: C.green, lineHeight: 1 }}>V</span>
        </div>
        <div style={{ lineHeight: 1 }}>
          <span style={{ ...F.black, fontSize: '15px', color: C.light, textTransform: 'uppercase', letterSpacing: '0.1em' }}>VERDE </span>
          <span style={{ ...F.dancing, fontSize: '17px', color: C.yellow }}>Bonito</span>
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Cart icon → mi-caja */}
        <Link to="/mi-caja" style={{ position: 'relative', padding: '8px', display: 'flex' }}>
          <ShoppingCart size={24} color={C.light} strokeWidth={1.8} />
          {cartCount > 0 && (
            <div style={{
              position: 'absolute', top: '2px', right: '2px',
              width: '18px', height: '18px', borderRadius: '50%',
              backgroundColor: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${C.dark}`,
            }}>
              <span style={{ ...F.black, fontSize: '9px', color: '#fff', lineHeight: 1 }}>
                {cartCount > 99 ? '99' : cartCount}
              </span>
            </div>
          )}
        </Link>

        <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(242,240,232,0.15)' }} />

        <Link to="/cuenta" style={{ padding: '8px', display: 'flex' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%',
            backgroundColor: 'rgba(242,240,232,0.12)',
            border: `1.5px solid rgba(242,240,232,0.3)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <User size={15} color={C.light} strokeWidth={2} />
          </div>
        </Link>
      </div>
    </div>
  );
}

// ── Filter Bar ────────────────────────────────────────────────────────────────
function FilterBar({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
  return (
    <div style={{
      position: 'sticky', top: '60px', zIndex: 30,
      backgroundColor: C.light, borderBottom: `2px solid ${C.dark}`,
      display: 'flex', gap: '8px', padding: '10px 16px',
      overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
    }}>
      {FILTERS.map(({ label, emoji }) => {
        const isActive = active === label;
        return (
          <button
            key={label}
            onClick={() => onChange(label)}
            style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '7px 14px', borderRadius: 0,
              backgroundColor: isActive ? C.green : 'transparent',
              color: isActive ? C.white : C.dark,
              border: `2px solid ${isActive ? C.green : C.dark}`,
              cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              transition: 'background-color 0.15s, color 0.15s',
              ...F.bold, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase',
            }}
          >
            {emoji && <span style={{ fontSize: '13px' }}>{emoji}</span>}
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({
  product, qtyInCart, onAdd,
}: { product: Product; qtyInCart: number; onAdd: (p: Product) => void }) {
  const isInCart = qtyInCart > 0;
  return (
    <div style={{ backgroundColor: C.white, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <div style={{ height: '5px', backgroundColor: product.accentColor, flexShrink: 0 }} />

      <div style={{ position: 'relative', padding: '18px 12px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '104px', height: '104px', borderRadius: '50%', overflow: 'hidden', border: `3px solid ${product.accentColor}`, backgroundColor: C.light, flexShrink: 0 }}>
          <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        {product.seasonal && (
          <div style={{ position: 'absolute', top: '12px', right: '8px', backgroundColor: C.yellow, padding: '3px 7px' }}>
            <span style={{ ...F.bold, fontSize: '8px', color: C.dark, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Temporada
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: '12px 12px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ ...F.bold, fontSize: '13px', color: C.dark, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2, marginBottom: '3px' }}>
          {product.name}
        </p>
        <p style={{ ...F.reg, fontSize: '11px', color: 'rgba(26,26,26,0.45)', marginBottom: '10px' }}>
          {product.weight}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div>
            <span style={{ ...F.black, fontSize: '17px', color: C.green, lineHeight: 1 }}>
              {formatCLP(product.price)}
            </span>
            {isInCart && (
              <div style={{ ...F.bold, fontSize: '9px', color: C.green, letterSpacing: '0.08em', marginTop: '2px' }}>
                ×{qtyInCart} en caja
              </div>
            )}
          </div>

          <button
            onClick={() => onAdd(product)}
            aria-label={`Agregar ${product.name}`}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              backgroundColor: isInCart ? C.green : C.red,
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'background-color 0.2s', position: 'relative',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="2.4" strokeLinecap="square" />
              <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="2.4" strokeLinecap="square" />
            </svg>
            {isInCart && (
              <div style={{
                position: 'absolute', top: '-3px', right: '-3px',
                width: '14px', height: '14px', borderRadius: '50%',
                backgroundColor: C.yellow, border: `1.5px solid ${C.white}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ ...F.black, fontSize: '7px', color: C.dark, lineHeight: 1 }}>{qtyInCart}</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function ToastSheet({ message, visible }: { message: string | null; visible: boolean }) {
  return (
    <div style={{
      position: 'fixed', bottom: visible ? '76px' : '60px',
      left: '50%', transform: 'translateX(-50%)',
      width: 'min(390px, 100%)', zIndex: 50,
      opacity: visible ? 1 : 0, transition: 'opacity 0.25s ease, bottom 0.25s ease',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      <div style={{ backgroundColor: C.dark, borderTop: `4px solid ${C.green}`, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '28px', height: '28px', backgroundColor: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Check size={16} color={C.white} strokeWidth={3} />
        </div>
        <p style={{ ...F.bold, fontSize: '13px', color: C.light, flex: 1, letterSpacing: '0.02em' }}>
          <span style={{ color: C.yellow }}>{message}</span>{' '}agregado a tu caja ✓
        </p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function CatalogPage() {
  const { items, addItem, totalItems, totalPrice } = useCart();
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cartQtyMap = new Map(items.map(i => [i.id, i.qty]));

  const filtered = activeCategory === 'Todos'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleAdd = (product: Product) => {
    addItem(product);
    setToastMessage(product.name);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2200);
  };

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  return (
    <div style={{ backgroundColor: C.light, minHeight: '100vh' }}>
      <TopAppBar cartCount={totalItems} />
      <FilterBar active={activeCategory} onChange={setActiveCategory} />

      {/* Results meta strip */}
      <div style={{ backgroundColor: C.dark, padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ ...F.reg, fontSize: '11px', color: 'rgba(242,240,232,0.5)', letterSpacing: '0.05em' }}>
          {filtered.length} PRODUCTO{filtered.length !== 1 ? 'S' : ''}
        </span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[C.yellow, C.red, C.green].map((col, i) => (
            <div key={i} style={{ width: '18px', height: '4px', backgroundColor: col }} />
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', backgroundColor: C.dark, padding: '2px' }}>
        {filtered.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            qtyInCart={cartQtyMap.get(product.id) ?? 0}
            onAdd={handleAdd}
          />
        ))}
      </div>

      {/* Cart summary footer — navigates to Mi Caja */}
      {totalItems > 0 && (
        <Link
          to="/mi-caja"
          style={{ textDecoration: 'none', display: 'block' }}
        >
          <div style={{ backgroundColor: C.green, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ ...F.black, fontSize: '13px', color: C.light, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {totalItems} ítem{totalItems !== 1 ? 's' : ''} en tu caja
              </span>
              <div style={{ ...F.reg, fontSize: '11px', color: 'rgba(242,240,232,0.65)', marginTop: '2px' }}>
                {formatCLP(totalPrice)} estimado · Despacho gratis
              </div>
            </div>
            <div style={{ backgroundColor: C.yellow, color: C.dark, ...F.bold, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '10px 16px' }}>
              Ver caja →
            </div>
          </div>
        </Link>
      )}

      {/* Subscribe nudge */}
      {totalItems === 0 && (
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <p style={{ ...F.dancing, fontSize: '18px', color: C.green, marginBottom: '12px' }}>¿Primera vez? Suscríbete y ahorra.</p>
          <Link to="/suscribirse" style={{ display: 'inline-block', backgroundColor: C.red, color: C.light, ...F.bold, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '12px 28px', textDecoration: 'none' }}>
            Ver planes →
          </Link>
        </div>
      )}

      <ToastSheet message={toastMessage} visible={toastVisible} />
    </div>
  );
}
