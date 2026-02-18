import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { Dashboard } from './pages/Dashboard';
import { AdsDashboard } from './pages/AdsDashboard';
import { Layout } from './components/Layout';

// Create root route with Layout
const rootRoute = createRootRoute({
  component: Layout,
});

// Create route for main dashboard
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

// Create route for ADS dashboard
const adsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ads',
  component: AdsDashboard,
});

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, adsRoute]);

// Create the router
const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
