import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const Feature = ({ title, description, delay }: { title: string; description: string; delay: number }) => {
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
    <div style={{ opacity, transform: `scale(${scale})`, marginBottom: 20 }}>
      <h3 style={{ fontSize: 28, marginBottom: 5 }}>{title}</h3>
      <p style={{ fontSize: 18 }}>{description}</p>
    </div>
  );
};

export const SolutionOverviewSection: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const features = [
    { title: "AI-driven Scheduling", description: "Optimizes workouts around duty schedules" },
    { title: "Personalized Plans", description: "Tailored to individual roles and goals" },
    { title: "Regulation Tracking", description: "Ensures compliance with military standards" },
    { title: "Adaptive Workouts", description: "Suitable for any environment or equipment" },
    { title: "Smart Nutrition", description: "Optimizes meals based on available options" },
  ];

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#1E4C2B', // Military green
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      opacity,
      padding: 40,
    }}>
      <h2 style={{ fontSize: 48, marginBottom: 40 }}>DoD Fitness App Solution</h2>
      {features.map((feature, index) => (
        <Feature
          key={index}
          title={feature.title}
          description={feature.description}
          delay={index * 30}
        />
      ))}
    </div>
  );
};