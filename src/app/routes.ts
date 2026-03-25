import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { MyBoxPage } from './pages/MyBoxPage';
import { AccountPage } from './pages/AccountPage';
import { SubscribePage } from './pages/SubscribePage';
import { DesignSystemPage } from './pages/DesignSystemPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'catalogo', Component: CatalogPage },
      { path: 'mi-caja', Component: MyBoxPage },
      { path: 'cuenta', Component: AccountPage },
      { path: 'suscribirse', Component: SubscribePage },
      { path: 'design-system', Component: DesignSystemPage },
    ],
  },
]);