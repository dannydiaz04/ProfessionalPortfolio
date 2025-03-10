import { useEffect, useRef } from 'react';

export function MatrixEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const chars = '01';
      const font_size = 14;
      const columns = canvas.width / font_size;
      const drops: number[] = [];

      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }

      function draw() {
        // Inside this function, TypeScript knows ctx is not null
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = font_size + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * font_size, drops[i] * font_size);

          if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      const interval = setInterval(draw, 33);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-20"
    />
  );
}
