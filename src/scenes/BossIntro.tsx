import { AbsoluteFill, Img, useCurrentFrame, interpolate } from 'remotion';
import { PersonnageData } from '../data/shared';

interface Props {
  personnage: PersonnageData;
  th: { g1: string; g2: string; g3: string; accent: string; glow: string };
  hookBoss: string;
}

export const BossIntro: React.FC<Props> = ({ personnage, th, hookBoss }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 15], [0.85, 1], { extrapolateRight: 'clamp' });
  const imgScale = interpolate(frame, [5, 20], [0.6, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${th.g1}60 0%, transparent 60%), linear-gradient(175deg, ${th.g2}, #06050c)` }} />
      <div style={{ opacity, transform: `scale(${scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, zIndex: 10, padding: '0 8%' }}>
        <Img src={personnage.image_url} style={{
          width: 180, height: 180, borderRadius: '50%', objectFit: 'cover',
          border: `4px solid ${th.accent}`,
          boxShadow: `0 0 40px rgba(${th.glow},0.3)`,
          transform: `scale(${imgScale})`,
        }} />
        <p style={{ fontFamily: 'system-ui', fontWeight: 900, fontSize: 40, color: '#f8fafc', margin: 0, textAlign: 'center' }}>
          {personnage.emoji} {personnage.nom}
        </p>
        <p style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 22, color: th.accent, margin: 0 }}>
          {hookBoss}
        </p>
        <p style={{ fontFamily: 'system-ui', fontWeight: 500, fontSize: 18, color: 'rgba(248,250,252,0.6)', textAlign: 'center', lineHeight: 1.4, margin: 0 }}>
          {personnage.dialogues.intro || personnage.description_courte}
        </p>
      </div>
    </AbsoluteFill>
  );
};
