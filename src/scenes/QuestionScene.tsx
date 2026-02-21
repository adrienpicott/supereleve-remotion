import { AbsoluteFill, Img, useCurrentFrame, interpolate } from 'remotion';
import { VideoConfig, LETTERS, TOUR_URL } from '../data/shared';

interface Props {
  config: VideoConfig;
  th: { g1: string; g2: string; g3: string; accent: string; glow: string };
  phase: 'display';
}

export const QuestionScene: React.FC<Props> = ({ config, th }) => {
  const frame = useCurrentFrame();
  const q = config.question;

  return (
    <AbsoluteFill style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '5% 5% 0', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {config.bossMode && config.personnage ? (
              <Img src={config.personnage.image_url} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${th.accent}` }} />
            ) : (
              <Img src={TOUR_URL} style={{ height: 32, width: 'auto', borderRadius: 6 }} />
            )}
            {config.bossMode && config.personnage && (
              <span style={{ fontSize: 14, fontWeight: 700, color: th.accent }}>{config.personnage.nom}</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {config.serieNom && (
              <span style={{ padding: '2px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', fontSize: 11, fontWeight: 700, color: 'rgba(248,250,252,0.4)' }}>
                #{config.serieNumber}
              </span>
            )}
            <span style={{
              padding: '3px 10px', borderRadius: 999,
              background: `rgba(${th.glow},0.1)`, border: `1px solid rgba(${th.glow},0.2)`,
              fontSize: 15, fontWeight: 800, color: th.accent,
            }}>
              {q.matiere} <span style={{ fontWeight: 500, opacity: 0.5, marginLeft: 4, fontSize: '0.85em' }}>{q.niveau}</span>
            </span>
          </div>
        </div>
        {/* Progress bar — full */}
        <div style={{ marginTop: '2.5%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', borderRadius: 2, background: `linear-gradient(90deg, ${th.accent}, #f59e0b)`, boxShadow: `0 0 6px rgba(${th.glow},0.2)` }} />
        </div>
      </div>

      {/* Question box */}
      <div style={{ position: 'absolute', left: '5%', right: '5%', top: '15%', zIndex: 10 }}>
        <div style={{
          padding: '5.5% 5%', borderRadius: 16,
          background: 'rgba(8,6,15,0.6)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.04)',
        }}>
          <p style={{ textAlign: 'center', fontWeight: 700, lineHeight: 1.4, fontSize: 28, color: '#f8fafc', margin: 0 }}>
            {q.enonce}
          </p>
        </div>
      </div>

      {/* Answers */}
      <div style={{ position: 'absolute', left: '5%', right: '5%', top: '35%', display: 'flex', flexDirection: 'column', gap: '1.8%', zIndex: 10 }}>
        {q.answers.map((a, i) => {
          const delay = i * 4;
          const answerOpacity = interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const slideX = interpolate(frame, [delay, delay + 8], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '3%',
              padding: '2.8% 3.8%', borderRadius: 12,
              background: 'rgba(8,6,15,0.42)',
              border: '1px solid rgba(255,255,255,0.04)',
              opacity: answerOpacity,
              transform: `translateX(${slideX}px)`,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `rgba(${th.glow},0.08)`,
                fontSize: 16, fontWeight: 800, color: th.accent,
              }}>
                {LETTERS[i]}
              </div>
              <span style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3, color: '#e2e8f0' }}>
                {a.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Watermark */}
      <div style={{ position: 'absolute', left: '5%', right: '5%', bottom: '2%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Img src={TOUR_URL} style={{ height: 22, width: 'auto', borderRadius: 4 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#f8fafc' }}>supereleve.com</div>
            <div style={{ fontSize: 7, color: 'rgba(248,250,252,0.2)' }}>Révise en jouant 🎮</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
