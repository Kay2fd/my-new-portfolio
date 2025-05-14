import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Layout from '../components/layout/Layout';
import LazyLoad from '../components/common/LazyLoad/LazyLoad';
import AdminLayout from '../components/layout/AdminLayout';
import ProtectedRoute from '../components/common/ProtectedRoute/ProtectedRoute';

const HomePage = lazy(() => import('../pages/Home/HomePage'));
const AboutPage = lazy(() => import('../pages/About/AboutPage'));
const ProjectsPage = lazy(() => import('../pages/Projects/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('../pages/ProjectsDetail/ProjectsDetail'));
const ContactPage = lazy(() => import('../pages/Contact/ContactPage'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const LoginPage = lazy(() => import('../pages/Login/LoginPage'));
const ProfileAdminPage = lazy(() => import('../pages/Admin/Profile/ProfileAdmin'));
const CertificatesAdminPage = lazy(() => import('../pages/Admin/Certificates/CertificatesAdminPage'));
const ProjectsAdminPage = lazy(() => import('../pages/Admin/Projects/ProjectsAdminPage'));

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
            path="/login"
            element={
              <LazyLoad>
                <LoginPage />
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

        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route
            path="profile"
            element={
              <LazyLoad>
                <ProfileAdminPage />
              </LazyLoad>
            }
          />
          <Route
            path="certificates"
            element={
              <LazyLoad>
                <CertificatesAdminPage />
              </LazyLoad>
            }
          />
          <Route
            path="projects"
            element={
              <LazyLoad>
                <ProjectsAdminPage />
              </LazyLoad>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
