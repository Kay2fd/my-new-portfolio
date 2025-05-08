import type { ReactNode } from 'react';
import Home from '../pages/Home/Home';

interface Route {
  path: string;
  element: ReactNode;
  title: string;
  isNavItem: boolean;
}

export const routes: Route[] = [
  {
    path: '/',
    element: <Home />,
    title: 'Home',
    isNavItem: true,
  },
];
