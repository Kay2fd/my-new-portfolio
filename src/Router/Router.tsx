import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Layout from '../components/layout/Layout';
import LazyLoad from '../components/common/LazyLoad/LazyLoad';

const HomePage = lazy(() => import('../pages/Home/HomePage'));
const AboutPage = lazy(() => import('../pages/About/AboutPage'));
const ProjectsPage = lazy(() => import('../pages/Projects/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('../pages/ProjectsDetail/ProjectsDetail'));
const ContactPage = lazy(() => import('../pages/Contact/ContactPage'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  title: string;
  isNavItem: boolean;
}

export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    component: HomePage,
    title: 'Home',
    isNavItem: true,
  },
  {
    path: '/about',
    component: AboutPage,
    title: 'About',
    isNavItem: true,
  },
  {
    path: '/projects',
    component: ProjectsPage,
    title: 'Projects',
    isNavItem: true,
  },
  {
    path: '/contact',
    component: ContactPage,
    title: 'Contact',
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

          <Route
            path="/projects/:id"
            element={
              <LazyLoad>
                <ProjectDetailPage />
              </LazyLoad>
            }
          />

          <Route
            path="*"
            element={
              <LazyLoad>
                <NotFound />
              </LazyLoad>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
