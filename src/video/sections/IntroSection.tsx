import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { Dumbbell } from 'lucide-react';

export const IntroSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    fps,
    frame,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        opacity,
      }}
    >
      <Dumbbell
        size={200}
        style={{
          transform: `scale(${scale})`,
          marginBottom: 20,
        }}
      />
      <h1
        style={{
          fontSize: 80,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        Atlas
      </h1>
      <p
        style={{
          fontSize: 32,
          textAlign: 'center',
          maxWidth: 800,
        }}
      >
        Empowering military personnel with AI-driven fitness and nutrition solutions
      </p>
    </div>
  );
};