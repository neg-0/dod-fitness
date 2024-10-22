import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const Benefit = ({ title, value, delay }: { title: string; value: string; delay: number }) => {
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
    <div style={{ opacity, transform: `scale(${scale})`, marginBottom: 20, textAlign: 'center' }}>
      <h3 style={{ fontSize: 28, marginBottom: 5 }}>{title}</h3>
      <p style={{ fontSize: 24, fontWeight: 'bold' }}>{value}</p>
    </div>
  );
};

export const BenefitsImpactSection: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const benefits = [
    { title: "Improved Readiness Scores", value: "+15%" },
    { title: "Reduced Injury Rates", value: "-20%" },
    { title: "Time Saved on PT Management", value: "30 hrs/month" },
    { title: "Projected Cost Savings", value: "$10M/year" },
  ];

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#FFCC00', // Gold accent
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#0033A0', // Space Force blue text
      opacity,
      padding: 40,
    }}>
      <h2 style={{ fontSize: 48, marginBottom: 40, textAlign: 'center' }}>Benefits and Impact</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {benefits.map((benefit, index) => (
          <Benefit
            key={index}
            title={benefit.title}
            value={benefit.value}
            delay={index * 30}
          />
        ))}
      </div>
    </div>
  );
};