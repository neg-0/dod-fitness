import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { IntroductionSection } from './sections/IntroductionSection';
import { ProblemStatementSection } from './sections/ProblemStatementSection';
import { SolutionOverviewSection } from './sections/SolutionOverviewSection';
import { BenefitsImpactSection } from './sections/BenefitsImpactSection';
import { FutureVisionSection } from './sections/FutureVisionSection';
import { CallToActionSection } from './sections/CallToActionSection';

export const DoDFitnessAppPitch: React.FC = () => {
  // Assuming 30 fps
  const fps = 30;
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={30 * fps}>
          <IntroductionSection />
        </Series.Sequence>
        <Series.Sequence durationInFrames={75 * fps}>
          <ProblemStatementSection />
        </Series.Sequence>
        <Series.Sequence durationInFrames={75 * fps}>
          <SolutionOverviewSection />
        </Series.Sequence>
        <Series.Sequence durationInFrames={45 * fps}>
          <BenefitsImpactSection />
        </Series.Sequence>
        <Series.Sequence durationInFrames={30 * fps}>
          <FutureVisionSection />
        </Series.Sequence>
        <Series.Sequence durationInFrames={25 * fps}>
          <CallToActionSection />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};