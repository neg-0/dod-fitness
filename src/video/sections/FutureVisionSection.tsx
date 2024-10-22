import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const VisionPoint = ({ text, delay }: { text: string; delay: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame - delay, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    fps,
    frame: frame - delay,
    config: { damping: 100, stiffness: 200, mass: 0.5 },
  });

  return (
    <div style={{ opacity, transform: `scale(${scale})`, marginBottom: 15 }}>
      <p style={{ fontSize: 24 }}>{text}</p>
    </div>
  );
};

export const FutureVisionSection: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const visionPoints = [
    "Expansion across all DoD branches",
    "Customization for specific military roles",
    "Integration with advanced wearable tech",
    "AI-driven predictive health analytics",
  ];

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#1C3E6E', // Space Force dark blue
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      opacity,
      padding: 40,
    }}>
      <h2 style={{ fontSize: 48, marginBottom: 40, textAlign: 'center' }}>Future Vision and Scalability</h2>
      {visionPoints.map((point, index) => (
        <VisionPoint key={index} text={point} delay={index * 30} />
      ))}
    </div>
  );
};