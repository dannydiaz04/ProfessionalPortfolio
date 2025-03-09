import * as React from "react";
import { Link, useRoute } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/businesses", label: "Businesses" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center px-4">
        <Link href="/">
          <div className="mr-6 flex items-center space-x-2 cursor-pointer"></div>
            <span className="font-mono font-bold text-xl">Portfolio</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-between">
          <div className="flex items-center space-x-4 text-sm font-medium">
            {links.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex flex-1 items-center justify-end lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-2 py-6">
                {links.map((link) => (
                  <Link key={link.href} href={link.href}></Link>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className="w-full justify-start"
                      >
                        {link.label}
                      </Button>
                    )}
                  </Link>
                ))}
                <div className="mt-4">
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [isActive] = useRoute(href);
  
  return (
    <Link href={href}>
      <div className="relative flex items-center px-1">
        <span
          className={cn(
            "cursor-pointer rounded-md px-3 py-2 text-foreground/60 transition-colors hover:text-foreground",
            isActive && "text-foreground"
          )}
        >
          {children}
        </span>
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            layoutId="navbar-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
    </Link>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
}
