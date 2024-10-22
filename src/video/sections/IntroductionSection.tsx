import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';

export const IntroductionSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const logoScale = spring({
    fps,
    frame,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const textOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const montageOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      flex: 1,
      backgroundImage: `url('/images/backgrounds/space_station_bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Img
        src="/images/logos/dod_fitness_app_logo.svg"
        style={{
          width: 300,
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      />
      <h1 style={{
        fontSize: 80,
        fontWeight: 'bold',
        color: 'white',
        opacity: textOpacity,
        textAlign: 'center',
        marginTop: 40,
        fontFamily: 'SpaceForce-Bold',
      }}>
        DoD Fitness App
      </h1>
      <p style={{
        fontSize: 32,
        color: 'white',
        opacity: textOpacity,
        textAlign: 'center',
        maxWidth: 800,
        marginTop: 20,
        fontFamily: 'SpaceForce-Regular',
      }}>
        Empowering military personnel with AI-driven fitness and nutrition solutions
      </p>
      <div style={{
        opacity: montageOpacity,
        marginTop: 40,
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
      }}>
        <Img src="/images/logos/space_force_logo.svg" style={{ width: 100 }} />
        <Img src="/images/logos/army_logo.svg" style={{ width: 100 }} />
        <Img src="/images/logos/navy_logo.svg" style={{ width: 100 }} />
        <Img src="/images/logos/air_force_logo.svg" style={{ width: 100 }} />
        <Img src="/images/logos/marines_logo.svg" style={{ width: 100 }} />
      </div>
    </div>
  );
};