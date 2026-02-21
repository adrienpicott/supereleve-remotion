import { AbsoluteFill, Img, useCurrentFrame, interpolate } from 'remotion';
import { VideoConfig, TOUR_URL } from '../data/shared';

interface Props {
  config: VideoConfig;
  th: { g1: string; g2: string; g3: string; accent: string; glow: string };
}

export const CTAScene: React.FC<Props> = ({ config, th }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 12], [0.92, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: '0 10%' }}>
      <div style={{ opacity, transform: `scale(${scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <Img src={TOUR_URL} style={{ height: 80, width: 'auto', borderRadius: 12 }} />
        <p style={{ fontFamily: 'system-ui', fontWeight: 900, fontSize: 36, lineHeight: 1.2, color: '#f8fafc', textAlign: 'center', margin: 0 }}>
          Apprends en jouant 🎮
        </p>
        <p style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 22, color: th.accent, margin: 0 }}>
          supereleve.com
        </p>
        <p style={{ fontFamily: 'system-ui', fontSize: 16, color: 'rgba(248,250,252,0.35)', margin: 0 }}>
          🔗 Lien en bio
        </p>
      </div>
    </AbsoluteFill>
  );
};
