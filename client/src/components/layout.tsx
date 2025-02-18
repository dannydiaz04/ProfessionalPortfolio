import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { MatrixEffect } from './matrix-effect';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/businesses', label: 'Businesses' },
  { path: '/contact', label: 'Contact' }
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MatrixEffect />

      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur">
        <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="font-mono text-xl font-bold text-primary hover:text-primary/80">
              {'<Portfolio />'}
            </a>
          </Link>

          <div className="flex items-center gap-6">
            {navItems.map(({ path, label }) => (
              <Link key={path} href={path}>
                <a className="relative font-mono">
                  {location === path && (
                    <motion.div
                      layoutId="active"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                  {label}
                </a>
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="pt-16 min-h-screen">
        {children}
      </main>

      <footer className="bg-background/80 backdrop-blur border-t border-border py-6">
        <div className="max-w-6xl mx-auto px-4 text-center font-mono text-sm text-muted-foreground">
          © {new Date().getFullYear()} Portfolio. Built with React & TypeScript
        </div>
      </footer>
    </div>
  );
}