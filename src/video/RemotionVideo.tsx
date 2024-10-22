import { Composition } from 'remotion';
import { DoDFitnessAppPitch } from './DoDFitnessAppPitch';

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="DoDFitnessAppPitch"
        component={DoDFitnessAppPitch}
        durationInFrames={280 * 30} // 280 seconds (4 minutes 40 seconds) at 30 fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};