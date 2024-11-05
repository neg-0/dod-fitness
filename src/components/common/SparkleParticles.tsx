import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  opacity: number;
  color: string;
}

interface SparkleParticlesProps {
  active: boolean;
  // Particle appearance
  minSize?: number;
  maxSize?: number;
  colors?: string[];
  baseColor?: string;
  // Particle behavior
  particleDensity?: number;
  spawnRate?: number;
  minSpeed?: number;
  maxSpeed?: number;
  lifeDuration?: number;
  fadeSpeed?: number;
  // Border behavior
  borderOffset?: number;
  spreadRadius?: number;
}

const SparkleParticles: React.FC<SparkleParticlesProps> = ({
  active,
  // Default values for all optional props
  minSize = 1,
  maxSize = 3,
  colors = [],
  baseColor = '79, 70, 229', // Indigo/purple default
  particleDensity = 0.3,
  spawnRate = 0.3,
  minSpeed = 0.5,
  maxSpeed = 3,
  lifeDuration = 1,
  fadeSpeed = 0.01,
  borderOffset = 0,
  spreadRadius = 3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getRandomColor = (): string => {
      if (colors.length === 0) {
        return `rgba(${baseColor}, 1)`;
      }
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const createParticle = (x: number, y: number): Particle => ({
      x,
      y,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
      speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
      life: lifeDuration,
      opacity: 1,
      color: getRandomColor(),
    });

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    const getSpawnPosition = (): { x: number; y: number } => {
      const side = Math.floor(Math.random() * 4);
      let x, y;

      switch (side) {
        case 0: // top
          x = Math.random() * canvas.width;
          y = -borderOffset;
          break;
        case 1: // right
          x = canvas.width + borderOffset;
          y = Math.random() * canvas.height;
          break;
        case 2: // bottom
          x = Math.random() * canvas.width;
          y = canvas.height + borderOffset;
          break;
        default: // left
          x = -borderOffset;
          y = Math.random() * canvas.height;
          break;
      }

      // Add some randomness to the spawn position along the border
      const spread = (Math.random() - 0.5) * spreadRadius;
      return {
        x: x + (side % 2 === 0 ? 0 : spread),
        y: y + (side % 2 === 1 ? 0 : spread),
      };
    };

    const animate = () => {
      if (!ctx || !active) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new particles based on density
      if (Math.random() < spawnRate) {
        const spawnCount = Math.ceil(Math.random() * particleDensity);
        for (let i = 0; i < spawnCount; i++) {
          const { x, y } = getSpawnPosition();
          particles.current.push(createParticle(x, y));
        }
      }

      // Update and draw particles
      particles.current = particles.current.filter((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life -= fadeSpeed;
        particle.opacity = particle.life;

        // Add a slight pulsing effect
        const pulse = Math.sin(Date.now() * 0.01) * 0.1 + 0.9;
        const size = particle.size * pulse;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        
        // Create a gradient for each particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size
        );
        gradient.addColorStop(0, particle.color.replace('1)', `${particle.opacity})`));
        gradient.addColorStop(1, particle.color.replace('1)', '0)'));
        
        ctx.fillStyle = gradient;
        ctx.fill();

        return particle.life > 0;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [
    active,
    minSize,
    maxSize,
    colors,
    baseColor,
    particleDensity,
    spawnRate,
    minSpeed,
    maxSpeed,
    lifeDuration,
    fadeSpeed,
    borderOffset,
    spreadRadius,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ borderRadius: '0.5rem' }}
    />
  );
};

export default SparkleParticles; 