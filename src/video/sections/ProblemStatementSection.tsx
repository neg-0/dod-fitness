import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';

const Challenge = ({ title, description, delay, icon }: { title: string; description: string; delay: number; icon: string }) => {
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
    <div style={{ opacity, transform: `scale(${scale})`, marginBottom: 20, display: 'flex', alignItems: 'center' }}>
      <Img src={icon} style={{ width: 50, marginRight: 20 }} />
      <div>
        <h3 style={{ fontSize: 28, marginBottom: 5, fontFamily: 'SpaceForce-Bold' }}>{title}</h3>
        <p style={{ fontSize: 18, fontFamily: 'SpaceForce-Regular' }}>{description}</p>
      </div>
    </div>
  );
};

export const ProblemStatementSection: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const challenges = [
    { title: "Irregular Schedules", description: "Adapting to unpredictable duty rotations", icon: "/images/icons/ai_scheduling_icon.svg" },
    { title: "Specific Requirements", description: "Meeting rigorous military fitness standards", icon: "/images/icons/regulation_tracking_icon.svg" },
    { title: "Balancing PT", description: "Integrating unit-led and individual training", icon: "/images/icons/personalized_plan_icon.svg" },
    { title: "Diverse Environments", description: "Exercising in varied and limited spaces", icon: "/images/icons/adaptive_workout_icon.svg" },
    { title: "Nutritional Constraints", description: "Optimizing diet with limited options", icon: "/images/icons/smart_nutrition_icon.svg" },
  ];

  return (
    <div style={{
      flex: 1,
      backgroundImage: `url('/images/backgrounds/command_center_bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      opacity,
      padding: 40,
    }}>
      <h2 style={{ fontSize: 48, marginBottom: 40, fontFamily: 'SpaceForce-Bold' }}>Challenges Faced by Service Members</h2>
      {challenges.map((challenge, index) => (
        <Challenge
          key={index}
          title={challenge.title}
          description={challenge.description}
          icon={challenge.icon}
          delay={index * 30}
        />
      ))}
    </div>
  );
};