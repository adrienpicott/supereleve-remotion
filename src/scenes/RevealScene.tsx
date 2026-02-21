import { AbsoluteFill, Img, useCurrentFrame, interpolate } from 'remotion';
import { VideoConfig, LETTERS, TOUR_URL } from '../data/shared';

interface Props {
  config: VideoConfig;
  th: { g1: string; g2: string; g3: string; accent: string; glow: string };
  fakeStat: number;
}

export const RevealScene: React.FC<Props> = ({ config, th, fakeStat }) => {
  const frame = useCurrentFrame();
  const q = config.question;

  // Animations
  const expOpacity = interpolate(frame, [20, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const expSlide = interpolate(frame, [20, 28], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOpacity = interpolate(frame, [15, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lootOpacity = interpolate(frame, [10, 18, 35, 42], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lootY = interpolate(frame, [10, 42], [0, -60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lootScale = interpolate(frame, [10, 16, 20, 42], [0.3, 1.2, 1, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
          </div>
          <span style={{ padding: '3px 10px', borderRadius: 999, background: `rgba(${th.glow},0.1)`, border: `1px solid rgba(${th.glow},0.2)`, fontSize: 15, fontWeight: 800, color: th.accent }}>{q.matiere}</span>
        </div>
        <div style={{ marginTop: '2.5%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.04)' }} />
      </div>

      {/* Stats badge */}
      {config.statsEnabled && (
        <div style={{ position: 'absolute', top: '13%', right: '5%', zIndex: 10, opacity: statOpacity }}>
          <div style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>📊 {fakeStat}% ont trouvé</span>
          </div>
        </div>
      )}

      {/* Boss dialogue */}
      {config.bossMode && config.personnage && (
        <div style={{ position: 'absolute', left: '5%', right: '5%', top: '14%', zIndex: 10 }}>
          <p style={{ fontSize: 13, color: th.accent, fontStyle: 'italic', margin: 0 }}>
            {config.personnage.emoji} « {config.personnage.dialogues.encouragement_1 || 'Bien joué !'} »
          </p>
        </div>
      )}

      {/* Question */}
      <div style={{ position: 'absolute', left: '5%', right: '5%', top: '17%', zIndex: 10 }}>
        <div style={{ padding: '5.5% 5%', borderRadius: 16, background: 'rgba(8,6,15,0.6)', border: '1px solid rgba(255,255,255,0.04)' }}>
          <p style={{ textAlign: 'center', fontWeight: 700, lineHeight: 1.4, fontSize: 28, color: '#f8fafc', margin: 0 }}>{q.enonce}</p>
        </div>
      </div>

      {/* Answers — revealed */}
      <div style={{ position: 'absolute', left: '5%', right: '5%', top: '36%', display: 'flex', flexDirection: 'column', gap: '1.8%', zIndex: 10 }}>
        {q.answers.map((a, i) => {
          const isCorrect = a.correct;
          const revealDelay = i * 3;
          const ansScale = interpolate(frame, [revealDelay, revealDelay + 8], [1, isCorrect ? 1.02 : 0.97], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const ansOpacity = isCorrect ? 1 : interpolate(frame, [revealDelay, revealDelay + 8], [1, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '3%', padding: '2.8% 3.8%', borderRadius: 12,
              background: isCorrect ? 'linear-gradient(135deg, rgba(34,197,94,0.16), rgba(16,185,129,0.06))' : 'rgba(8,6,15,0.1)',
              border: isCorrect ? '2px solid rgba(34,197,94,0.4)' : '1px solid rgba(71,85,105,0.06)',
              opacity: ansOpacity, transform: `scale(${ansScale})`,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isCorrect ? 'linear-gradient(135deg, #22c55e, #10b981)' : 'rgba(71,85,105,0.08)',
                fontSize: 16, fontWeight: 800, color: isCorrect ? '#fff' : '#1e293b',
              }}>
                {isCorrect ? '✓' : LETTERS[i]}
              </div>
              <span style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3, color: isCorrect ? '#4ade80' : '#1e293b' }}>
                {a.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Loot animation */}
      {config.lootEnabled && (
        <div style={{
          position: 'absolute', top: '30%', right: '8%', zIndex: 20,
          opacity: lootOpacity, transform: `scale(${lootScale}) translateY(${lootY}px)`,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'radial-gradient(circle, #fbbf24, #f59e0b)',
            boxShadow: '0 0 16px rgba(251,191,36,0.5), 0 0 32px rgba(251,191,36,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 900, color: '#1e1b4b',
          }}>
            XP
          </div>
        </div>
      )}

      {/* Explication */}
      {q.explication && (
        <div style={{
          position: 'absolute', left: '5%', right: '5%', bottom: '11%', zIndex: 10,
          padding: '3% 4%', borderRadius: 14,
          background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.12)',
          opacity: expOpacity, transform: `translateY(${expSlide}px)`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 18 }}>💡</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#4ade80' }}>Explication</span>
          </div>
          <p style={{ fontSize: 16, color: '#86efac', lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
            {q.explication}
          </p>
        </div>
      )}

      {/* Watermark */}
      <div style={{ position: 'absolute', left: '5%', right: '5%', bottom: '2%', display: 'flex', alignItems: 'center', gap: 6, zIndex: 10 }}>
        <Img src={TOUR_URL} style={{ height: 22, width: 'auto', borderRadius: 4 }} />
        <div style={{ fontSize: 12, fontWeight: 800, color: '#f8fafc' }}>supereleve.com</div>
      </div>
    </AbsoluteFill>
  );
};
