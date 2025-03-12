import { motion } from 'framer-motion';
import { TerminalText } from '@/components/terminal-text';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'wouter';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
// Import the image
import profilePhoto from '../../../attached_assets/professional_photo_headshot.jpg';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <Avatar className="h-48 w-48 rounded-full ring-2 ring-primary/50 overflow-hidden">
              <AvatarImage
                src={profilePhoto}
                alt="Profile photo"
                className="object-cover"
              />
            </Avatar>
          </motion.div>

          <div className="flex-1">
            <TerminalText
              text="Hello, World! Name's Daniel. I'm a Machine Learning Developer & Entrepreneur"
              className="text-4xl md:text-6xl font-bold"
            />
          </div>
        </div>

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
          <a href="https://github.com/dannydiaz04" target="_blank" rel="noopener noreferrer">
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