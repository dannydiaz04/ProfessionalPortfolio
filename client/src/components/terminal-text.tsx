import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TerminalTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TerminalText({ text, speed = 50, className = '' }: TerminalTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`font-mono ${className}`}
    >
      {displayText}
      <span className={`${cursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
    </motion.div>
  );
}
