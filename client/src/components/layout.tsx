import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { MatrixEffect } from './matrix-effect';
import { ThemeToggle } from './theme-toggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileNav } from './mobile-nav';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/businesses', label: 'Businesses' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' }
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MatrixEffect />

      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="font-mono text-xl font-bold text-primary hover:text-primary/80">
              {'<Portfolio />'}
            </a>
          </Link>

          <div className="flex items-center gap-4">
            {/* Mobile Navigation */}
            <MobileNav items={navItems} />
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {navItems.map(({ path, label }) => (
                    <NavigationMenuItem key={path}>
                      <Link href={path}>
                        <NavigationMenuLink
                          className={cn(
                            "relative font-mono px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors",
                            location === path && "bg-accent text-accent-foreground"
                          )}
                        >
                          {label}
                          {location === path && (
                            <motion.div
                              layoutId="active"
                              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                            />
                          )}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            
            <ThemeToggle />
          </div>
        </div>
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