import { AbsoluteFill, Img } from 'remotion';
import { VideoConfig } from '../data/shared';

interface Props {
  th: { g1: string; g2: string; g3: string; accent: string; glow: string };
  config: VideoConfig;
}

export const Background: React.FC<Props> = ({ th, config }) => {
  return (
    <AbsoluteFill>
      {/* Gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 90% 50% at 30% 15%, ${th.g1}50 0%, transparent 60%), radial-gradient(ellipse 70% 45% at 75% 80%, ${th.g3}40 0%, transparent 55%), linear-gradient(175deg, ${th.g2} 0%, #06050c 45%, ${th.g2}dd 100%)`,
      }} />

      {/* Background image */}
      {config.backgroundImage && (
        <Img src={config.backgroundImage} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0.12, filter: 'blur(3px)',
        }} />
      )}

      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.02,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '8% 5%',
      }} />

      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: '5%', left: '5%', width: '40%', height: '20%',
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${th.glow},0.06) 0%, transparent 70%)`,
        filter: 'blur(30px)',
      }} />
    </AbsoluteFill>
  );
};
