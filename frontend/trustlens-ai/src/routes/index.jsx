import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AppLayout from '../layouts/AppLayout';

// Pages
import LandingPage from '../pages/Landing';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';
import DashboardPage from '../pages/Dashboard';
import NewListingPage from '../pages/NewListing';
import AnalysisPage from '../pages/Analysis';
import ResultsPage from '../pages/Results';
import TrustCenterPage from '../pages/TrustCenter';
import ReportsPage from '../pages/Reports';
import SettingsPage from '../pages/Settings';
import AboutPage from '../pages/About';
import ContactPage from '../pages/Contact';
import FAQPage from '../pages/FAQ';
import HelpPage from '../pages/Help';

// App pages that use the sidebar layout
const APP_ROUTES = [
  { path: '/dashboard', Component: DashboardPage },
  { path: '/new-listing', Component: NewListingPage },
  { path: '/analysis', Component: AnalysisPage },
  { path: '/results', Component: ResultsPage },
  { path: '/trust-center', Component: TrustCenterPage },
  { path: '/reports', Component: ReportsPage },
  { path: '/settings', Component: SettingsPage },
];

// Public pages with navbar only
const PUBLIC_ROUTES = [
  { path: '/login', Component: LoginPage },
  { path: '/signup', Component: SignupPage },
  { path: '/about', Component: AboutPage },
  { path: '/contact', Component: ContactPage },
  { path: '/faq', Component: FAQPage },
  { path: '/help', Component: HelpPage },
];

export default function AppRoutes() {
  return (
    <Routes>
      {/* Landing */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <LandingPage />
          </PublicLayout>
        }
      />

      {/* Public pages */}
      {PUBLIC_ROUTES.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <PublicLayout>
              <Component />
            </PublicLayout>
          }
        />
      ))}

      {/* App pages */}
      {APP_ROUTES.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <AppLayout>
              <Component />
            </AppLayout>
          }
        />
      ))}
    </Routes>
  );
}
