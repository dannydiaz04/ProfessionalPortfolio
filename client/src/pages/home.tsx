import { motion } from 'framer-motion';
import { TerminalText } from '@/components/terminal-text';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <TerminalText
          text="Hello, World! I'm a Developer & Entrepreneur"
          className="text-4xl md:text-6xl font-bold mb-8"
        />

        <Card className="p-6 bg-card/50 backdrop-blur">
          <p className="text-lg mb-4">
            I build innovative solutions and grow successful businesses. With expertise in web development,
            system architecture, and business strategy, I help transform ideas into reality.
          </p>

          <div className="flex gap-4">
            <Link href="/projects">
              <Button>
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Me</Button>
            </Link>
          </div>
        </Card>

        <div className="flex gap-4 mt-8">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
            </Button>
          </a>
          <a href="mailto:contact@example.com">
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
