"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Link, useLocation } from "wouter"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"

interface MobileNavProps {
  items: Array<{ path: string; label: string }>
}

export function MobileNav({
  items = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
  ],
}: MobileNavProps) {
  const [location] = useLocation()

  return (
    <div className="md:hidden fixed top-0 right-0 left-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="menu" className="border-b-0">
          <div className="flex items-center justify-between px-4">
            <div className="py-4 font-semibold">Menu</div>
            <AccordionTrigger className="py-4 px-2 -mr-2">
              <div className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-accent transition-colors">
                <Menu className="h-5 w-5" />
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="pb-4">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col space-y-1 px-4"
              >
                {items.map(({ path, label }) => (
                  <Link key={path} href={path}>
                    <motion.a
                      className={cn(
                        "relative px-4 py-3 rounded-md transition-all",
                        "flex items-center font-medium text-sm",
                        location === path
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-accent hover:text-accent-foreground",
                      )}
                      whileTap={{ scale: 0.98 }}
                    >
                      {label}
                      {location === path && (
                        <motion.div
                          layoutId="active-mobile-indicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.a>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

