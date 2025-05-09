import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Layout from '../components/layout/Layout';
import LazyLoad from '../components/common/LazyLoad/LazyLoad';

const Home = lazy(() => import('../pages/Home/Home'));

interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  title: string;
  isNavItem: boolean;
}

export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    component: Home,
    title: 'Home',
    isNavItem: true,
  },
];

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {routeConfig.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <LazyLoad>
                  <route.component />
                </LazyLoad>
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
