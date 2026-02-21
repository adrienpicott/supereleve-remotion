import { AbsoluteFill, Img, useCurrentFrame, interpolate } from 'remotion';
import { VideoConfig, TOUR_URL } from '../data/shared';

interface Props {
  hook: string;
  config: VideoConfig;
  th: { g1: string; g2: string; g3: string; accent: string; glow: string };
}

export const HookScene: React.FC<Props> = ({ hook, config, th }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 12], [0.92, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: '0 8%' }}>
      <div style={{ opacity, transform: `scale(${scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        {/* Boss avatar */}
        {config.bossMode && config.personnage && (
          <Img src={config.personnage.image_url} style={{
            width: 100, height: 100, borderRadius: '50%', objectFit: 'cover',
            border: `3px solid ${th.accent}`,
            boxShadow: `0 0 24px rgba(${th.glow},0.2)`,
          }} />
        )}

        {/* Série badge */}
        {config.serieNom && (
          <div style={{
            padding: '4px 14px', borderRadius: 999,
            background: `rgba(${th.glow},0.1)`, border: `1px solid rgba(${th.glow},0.2)`,
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: th.accent, fontFamily: 'system-ui' }}>
              {config.serieNom} #{config.serieNumber}
            </span>
          </div>
        )}

        {/* Hook text */}
        <p style={{
          fontFamily: 'system-ui', fontWeight: 900, fontSize: 52, lineHeight: 1.15,
          color: '#f8fafc', textAlign: 'center', margin: 0,
          textShadow: `0 0 40px rgba(${th.glow},0.25)`,
        }}>
          {hook}
        </p>
      </div>
    </AbsoluteFill>
  );
};
