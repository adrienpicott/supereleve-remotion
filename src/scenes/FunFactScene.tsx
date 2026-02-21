import { AbsoluteFill, Img, useCurrentFrame, interpolate } from 'remotion';
import { PersonnageData } from '../data/shared';

interface Props {
  personnage: PersonnageData;
  funFact: string;
  th: { g1: string; g2: string; g3: string; accent: string; glow: string };
}

export const FunFactScene: React.FC<Props> = ({ personnage, funFact, th }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 12], [0.93, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: '0 8%' }}>
      <div style={{ opacity, transform: `scale(${scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <Img src={personnage.image_url} style={{
          width: 90, height: 90, borderRadius: '50%', objectFit: 'cover',
          border: `3px solid ${th.accent}`,
        }} />
        <div style={{
          padding: '4px 14px', borderRadius: 999,
          background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)',
        }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#fbbf24', fontFamily: 'system-ui' }}>💡 Le savais-tu ?</span>
        </div>
        <p style={{
          fontFamily: 'system-ui', fontWeight: 600, fontSize: 22, lineHeight: 1.45,
          color: '#e2e8f0', textAlign: 'center', margin: 0,
        }}>
          {funFact}
        </p>
      </div>
    </AbsoluteFill>
  );
};
