import { Outlet, Link, useRouterState } from '@tanstack/react-router';
import { SiCaffeine } from 'react-icons/si';

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const routerState = useRouterState();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'dashboard-90-dias'
  );

  const isAdsPage = routerState.location.pathname === '/ads';

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">90</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Plan de Vuelo - Sistema de Leads</h1>
                <p className="text-xs text-muted-foreground">6 Fases • 18 Hitos • 90 Días</p>
              </div>
            </div>
            <nav className="flex gap-2">
              <Link
                to="/"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  !isAdsPage
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Plan de 90 Días
              </Link>
              <Link
                to="/ads"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isAdsPage
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Dashboard ADS
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children || <Outlet />}
      </main>

      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <SiCaffeine className="h-4 w-4 text-primary" />
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
