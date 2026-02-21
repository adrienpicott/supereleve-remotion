import { Composition } from 'remotion';
import { TikTokVideo, calculateDuration } from './TikTokVideo';
import { VideoConfig } from './data/shared';

// Config exemple par défaut pour le preview
const EXAMPLE_CONFIG: VideoConfig = {
  question: {
    id: 'demo-1',
    enonce: 'Que signifie 6 × 4 ?',
    answers: [
      { key: 'A', text: '6 + 4', correct: false },
      { key: 'B', text: '4 répété 6 fois', correct: true },
      { key: 'C', text: '6 ÷ 4', correct: false },
      { key: 'D', text: '6 − 4', correct: false },
    ],
    explication: '6 × 4 signifie « 6 fois 4 », c\'est-à-dire 4 + 4 + 4 + 4 + 4 + 4 = 24. La multiplication est une addition répétée.',
    matiere: 'Maths',
    niveau: '6ème',
    chapitre: 'Multiplication',
  },
  serieNom: 'Maths 6ème',
  serieNumber: 1,
  personnage: {
    id: 'PERS-004',
    nom: 'Archimède',
    emoji: '⚙️',
    image_url: 'https://bbcldmmgitcofulpfjja.supabase.co/storage/v1/object/public/assets/personnages/33_archimede.webp',
    dialogues: {
      intro: 'Eurêka ! Un nouveau challenger ! Donnez-moi un levier et un point d\'appui, et je soulèverai ton ignorance !',
      encouragement_1: 'Bien joué ! Ton esprit flotte comme un objet moins dense que l\'eau !',
      reaction_erreur_1: 'Une erreur ? Même mes miroirs ardents rataient parfois leur cible.',
    },
    fun_facts: [
      'Archimède a découvert son fameux principe dans son bain et a couru nu dans les rues en criant "Eurêka !"',
      'Ses dernières paroles auraient été "Ne dérange pas mes cercles !" à un soldat romain.',
      'Il a inventé des miroirs qui auraient brûlé les bateaux romains en concentrant les rayons du soleil.',
    ],
    citation_celebre: 'Donnez-moi un point d\'appui et je soulèverai le monde.',
    description_courte: 'Inventeur et mathématicien grec génial',
  },
  hookDuration: 3,
  questionDuration: 2,
  countdownDuration: 5,
  revealDuration: 4,
  funFactDuration: 4,
  ctaDuration: 3,
  hookEnabled: true,
  ctaEnabled: true,
  bossMode: true,
  bossIntroEnabled: true,
  funFactsEnabled: true,
  statsEnabled: true,
  lootEnabled: true,
  introSerieEnabled: true,
  template: 'classique',
  backgroundMode: 'gradient',
  musicUrl: 'https://bbcldmmgitcofulpfjja.supabase.co/storage/v1/object/public/assets/music/ES_Castle%20Festivities%20-%20Bonnie%20Grace.mp3',
  musicVolume: 0.3,
  sfxEnabled: true,
  fakeStat: 22,
};

export const RemotionRoot: React.FC = () => {
  const duration = calculateDuration(EXAMPLE_CONFIG);

  return (
    <>
      <Composition
        id="TikTokVideo"
        component={TikTokVideo}
        durationInFrames={duration * 30}
        fps={30}
        width={720}
        height={1280}
        defaultProps={{ config: EXAMPLE_CONFIG }}
      />
      {/* Composition sans boss pour tester */}
      <Composition
        id="TikTokVideoNoBoss"
        component={TikTokVideo}
        durationInFrames={15 * 30}
        fps={30}
        width={720}
        height={1280}
        defaultProps={{
          config: {
            ...EXAMPLE_CONFIG,
            bossMode: false,
            bossIntroEnabled: false,
            funFactsEnabled: false,
            introSerieEnabled: false,
          },
        }}
      />
    </>
  );
};
