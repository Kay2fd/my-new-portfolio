import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Layout from '../components/layout/Layout';
import LazyLoad from '../components/common/LazyLoad/LazyLoad';

const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const Projects = lazy(() => import('../pages/Projects/Projects'));
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
    component: Home,
    title: 'Home',
    isNavItem: true,
  },
  {
    path: '/about',
    component: About,
    title: 'About',
    isNavItem: true,
  },
  {
    path: '/projects',
    component: Projects,
    title: 'Projects',
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
          path='/contact'
          element={
            <LazyLoad>
              <ContactPage />
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
