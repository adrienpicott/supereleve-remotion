import { AbsoluteFill, Img, useCurrentFrame, interpolate } from 'remotion';
import { VideoConfig, TOUR_URL, CARTE_URL } from '../data/shared';

interface Props {
  config: VideoConfig;
  th: { g1: string; g2: string; g3: string; accent: string; glow: string };
}

export const IntroSerie: React.FC<Props> = ({ config, th }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 15], [0.9, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      {/* Fond carte */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${th.g1}40, transparent 60%), linear-gradient(175deg, #0a0820 0%, #06050c 100%)` }} />
      <Img src={CARTE_URL} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15, filter: 'blur(3px)' }} />

      <div style={{ opacity, transform: `scale(${scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, zIndex: 10 }}>
        <Img src={TOUR_URL} style={{ height: 100, width: 'auto' }} />
        <p style={{
          fontFamily: 'system-ui, sans-serif', fontWeight: 900, fontSize: 42,
          textAlign: 'center',
          background: `linear-gradient(135deg, ${th.accent}, #fbbf24)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: 0,
        }}>
          {config.serieNom || 'Quiz Exador'}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            padding: '6px 16px', borderRadius: 999,
            background: `rgba(${th.glow},0.15)`, border: `1px solid rgba(${th.glow},0.25)`,
            fontSize: 24, fontWeight: 800, color: th.accent, fontFamily: 'system-ui',
          }}>
            #{config.serieNumber}
          </span>
          {config.personnage && (
            <span style={{ fontSize: 20, color: 'rgba(248,250,252,0.5)', fontFamily: 'system-ui' }}>
              ⚔️ vs {config.personnage.emoji} {config.personnage.nom}
            </span>
          )}
        </div>
        <p style={{ fontSize: 16, color: 'rgba(248,250,252,0.3)', fontFamily: 'system-ui', margin: 0 }}>supereleve.com</p>
      </div>
    </AbsoluteFill>
  );
};
