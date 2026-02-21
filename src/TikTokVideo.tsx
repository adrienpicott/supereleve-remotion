// ════════════════════════════════════════════════════════════════════
// TikTokVideo — Composition Remotion principale
// ════════════════════════════════════════════════════════════════════

import { AbsoluteFill, Sequence } from 'remotion';
import { VideoConfig, getTheme, HOOKS, HOOKS_BOSS, SFX_URLS } from './data/shared';
import { IntroSerie } from './scenes/IntroSerie';
import { BossIntro } from './scenes/BossIntro';
import { HookScene } from './scenes/HookScene';
import { QuestionScene } from './scenes/QuestionScene';
import { CountdownScene } from './scenes/CountdownScene';
import { RevealScene } from './scenes/RevealScene';
import { FunFactScene } from './scenes/FunFactScene';
import { CTAScene } from './scenes/CTAScene';
import { Background } from './components/Background';
import { SafeAudio } from './components/SafeAudio';

const FPS = 30;

export function calculateDuration(cfg: VideoConfig): number {
  let total = 0;
  if (cfg.introSerieEnabled) total += 3;
  if (cfg.bossMode && cfg.bossIntroEnabled) total += 4;
  if (cfg.hookEnabled) total += cfg.hookDuration;
  total += cfg.questionDuration;
  total += cfg.countdownDuration;
  total += cfg.revealDuration;
  if (cfg.bossMode && cfg.funFactsEnabled && cfg.personnage?.fun_facts?.length) total += cfg.funFactDuration;
  if (cfg.ctaEnabled) total += cfg.ctaDuration;
  return total;
}

export const TikTokVideo: React.FC<{ config: VideoConfig }> = ({ config }) => {
  const th = getTheme(config.question.matiere);
  const hook = HOOKS[Math.floor(config.serieNumber * 7.3) % HOOKS.length];
  const bossHook = HOOKS_BOSS[config.serieNumber % HOOKS_BOSS.length];
  const funFact = config.personnage?.fun_facts?.[config.serieNumber % (config.personnage.fun_facts.length || 1)] || '';
  const fakeStat = config.fakeStat || (15 + (config.serieNumber * 13) % 30);

  let offset = 0;
  const scenes: { id: string; start: number; duration: number }[] = [];

  if (config.introSerieEnabled) {
    scenes.push({ id: 'intro_serie', start: offset, duration: 3 * FPS });
    offset += 3 * FPS;
  }
  if (config.bossMode && config.bossIntroEnabled && config.personnage) {
    scenes.push({ id: 'boss_intro', start: offset, duration: 4 * FPS });
    offset += 4 * FPS;
  }
  if (config.hookEnabled) {
    scenes.push({ id: 'hook', start: offset, duration: config.hookDuration * FPS });
    offset += config.hookDuration * FPS;
  }
  scenes.push({ id: 'question', start: offset, duration: config.questionDuration * FPS });
  offset += config.questionDuration * FPS;
  scenes.push({ id: 'countdown', start: offset, duration: config.countdownDuration * FPS });
  offset += config.countdownDuration * FPS;
  scenes.push({ id: 'reveal', start: offset, duration: config.revealDuration * FPS });
  offset += config.revealDuration * FPS;
  if (config.bossMode && config.funFactsEnabled && funFact) {
    scenes.push({ id: 'fun_fact', start: offset, duration: config.funFactDuration * FPS });
    offset += config.funFactDuration * FPS;
  }
  if (config.ctaEnabled) {
    scenes.push({ id: 'cta', start: offset, duration: config.ctaDuration * FPS });
    offset += config.ctaDuration * FPS;
  }

  const getScene = (id: string) => scenes.find(s => s.id === id);

  return (
    <AbsoluteFill>
      <Background th={th} config={config} />

      {config.musicUrl && <SafeAudio src={config.musicUrl} volume={config.musicVolume} />}

      {getScene('intro_serie') && (
        <Sequence from={getScene('intro_serie')!.start} durationInFrames={getScene('intro_serie')!.duration}>
          <IntroSerie config={config} th={th} />
        </Sequence>
      )}

      {getScene('boss_intro') && config.personnage && (
        <Sequence from={getScene('boss_intro')!.start} durationInFrames={getScene('boss_intro')!.duration}>
          <BossIntro personnage={config.personnage} th={th} hookBoss={bossHook} />
        </Sequence>
      )}

      {getScene('hook') && (
        <Sequence from={getScene('hook')!.start} durationInFrames={getScene('hook')!.duration}>
          <HookScene hook={config.bossMode && config.personnage ? `${config.personnage.nom} ${bossHook}` : hook} config={config} th={th} />
          {config.sfxEnabled && <SafeAudio src={SFX_URLS.clicBouton} volume={0.5} />}
        </Sequence>
      )}

      {getScene('question') && (
        <Sequence from={getScene('question')!.start} durationInFrames={getScene('question')!.duration}>
          <QuestionScene config={config} th={th} phase="display" />
          {config.sfxEnabled && <SafeAudio src={SFX_URLS.notification} volume={0.4} />}
        </Sequence>
      )}

      {getScene('countdown') && (
        <Sequence from={getScene('countdown')!.start} durationInFrames={getScene('countdown')!.duration}>
          <CountdownScene config={config} th={th} />
          {config.sfxEnabled && <SafeAudio src={SFX_URLS.clicBouton} volume={0.3} startFrom={Math.max(0, (config.countdownDuration - 3) * FPS)} />}
        </Sequence>
      )}

      {getScene('reveal') && (
        <Sequence from={getScene('reveal')!.start} durationInFrames={getScene('reveal')!.duration}>
          <RevealScene config={config} th={th} fakeStat={fakeStat} />
          {config.sfxEnabled && (
            <>
              <SafeAudio src={SFX_URLS.bonneReponse} volume={0.6} />
              <Sequence from={9}><SafeAudio src={SFX_URLS.mauvaiseReponse} volume={0.3} /></Sequence>
              {config.lootEnabled && <Sequence from={15}><SafeAudio src={SFX_URLS.gainXp} volume={0.4} /></Sequence>}
            </>
          )}
        </Sequence>
      )}

      {getScene('fun_fact') && config.personnage && (
        <Sequence from={getScene('fun_fact')!.start} durationInFrames={getScene('fun_fact')!.duration}>
          <FunFactScene personnage={config.personnage} funFact={funFact} th={th} />
        </Sequence>
      )}

      {getScene('cta') && (
        <Sequence from={getScene('cta')!.start} durationInFrames={getScene('cta')!.duration}>
          <CTAScene th={th} config={config} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
