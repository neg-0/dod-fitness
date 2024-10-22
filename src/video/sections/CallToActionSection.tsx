import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const CallToActionSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    fps,
    frame,
    config: { damping: 100, stiffness: 200, mass: 0.5 },
  });

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#0033A0', // Space Force blue
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      opacity,
      padding: 40,
    }}>
      <h2 style={{
        fontSize: 56,
        marginBottom: 20,
        textAlign: 'center',
        transform: `scale(${scale})`,
      }}>
        The Future of Force Readiness is Here
      </h2>
      <p style={{
        fontSize: 32,
        textAlign: 'center',
        maxWidth: 800,
        marginTop: 20,
        opacity: interpolate(frame, [30, 60], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      }}>
        Select the DoD Fitness App for development and implementation to revolutionize military fitness for the 21st century and beyond.
      </p>
    </div>
  );
};