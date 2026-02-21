import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { VideoConfig, LETTERS, TOUR_URL } from '../data/shared';

interface Props {
  config: VideoConfig;
  th: { g1: string; g2: string; g3: string; accent: string; glow: string };
}

export const CountdownScene: React.FC<Props> = ({ config, th }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const q = config.question;
  const totalFrames = config.countdownDuration * fps;
  const remaining = Math.ceil((totalFrames - frame) / fps);
  const pct = ((totalFrames - frame) / totalFrames) * 100;
  const isFlash = config.template === 'challenge_flash';
  const urgent = remaining <= 2;

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
          <span style={{ padding: '3px 10px', borderRadius: 999, background: `rgba(${th.glow},0.1)`, border: `1px solid rgba(${th.glow},0.2)`, fontSize: 15, fontWeight: 800, color: th.accent }}>
            {q.matiere}
          </span>
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: '2.5%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${pct}%`, borderRadius: 2,
            background: urgent ? 'linear-gradient(90deg, #ef4444, #f97316)' : `linear-gradient(90deg, ${th.accent}, #f59e0b)`,
            transition: 'width 0.1s linear',
            boxShadow: urgent ? '0 0 8px rgba(239,68,68,0.3)' : `0 0 6px rgba(${th.glow},0.2)`,
          }} />
        </div>
        {/* Timer number */}
        <div style={{
          textAlign: 'right', marginTop: '0.8%',
          fontSize: isFlash ? 62 : 44, fontWeight: 900,
          color: urgent ? '#ef4444' : isFlash ? '#fbbf24' : th.accent,
          fontVariantNumeric: 'tabular-nums', lineHeight: 1,
          textShadow: urgent ? '0 0 12px rgba(239,68,68,0.5)' : 'none',
        }}>
          {Math.max(0, remaining)}
        </div>
      </div>

      {/* Question */}
      <div style={{ position: 'absolute', left: '5%', right: '5%', top: '18%', zIndex: 10 }}>
        <div style={{ padding: '5.5% 5%', borderRadius: 16, background: 'rgba(8,6,15,0.6)', border: '1px solid rgba(255,255,255,0.04)' }}>
          <p style={{ textAlign: 'center', fontWeight: 700, lineHeight: 1.4, fontSize: 28, color: '#f8fafc', margin: 0 }}>{q.enonce}</p>
        </div>
      </div>

      {/* Answers */}
      <div style={{ position: 'absolute', left: '5%', right: '5%', top: '38%', display: 'flex', flexDirection: 'column', gap: '1.8%', zIndex: 10 }}>
        {q.answers.map((a, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '3%', padding: '2.8% 3.8%', borderRadius: 12,
            background: 'rgba(8,6,15,0.42)', border: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(${th.glow},0.08)`, fontSize: 16, fontWeight: 800, color: th.accent }}>{LETTERS[i]}</div>
            <span style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3, color: '#e2e8f0' }}>{a.text}</span>
          </div>
        ))}
      </div>

      {/* Watermark */}
      <div style={{ position: 'absolute', left: '5%', right: '5%', bottom: '2%', display: 'flex', alignItems: 'center', gap: 6, zIndex: 10 }}>
        <Img src={TOUR_URL} style={{ height: 22, width: 'auto', borderRadius: 4 }} />
        <div style={{ fontSize: 12, fontWeight: 800, color: '#f8fafc' }}>supereleve.com</div>
      </div>
    </AbsoluteFill>
  );
};
