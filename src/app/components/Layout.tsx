import { Outlet } from 'react-router';
import { BottomNav } from './BottomNav';
import { CartProvider } from '../context/CartContext';

export function Layout() {
  return (
    <CartProvider>
      <div style={{ minHeight: '100vh', backgroundColor: '#1A1A1A', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%',
          maxWidth: '390px',
          backgroundColor: '#F2F0E8',
          position: 'relative',
          minHeight: '100vh',
        }}>
          <div style={{ paddingBottom: '68px' }}>
            <Outlet />
          </div>
          <BottomNav />
        </div>
      </div>
    </CartProvider>
  );
}