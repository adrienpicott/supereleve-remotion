// ════════════════════════════════════════════════════════════════════
// SHARED DATA — Types, constantes, helpers
// Miroir des données de l'app Super Élève
// ════════════════════════════════════════════════════════════════════

export const S = 'https://bbcldmmgitcofulpfjja.supabase.co/storage/v1/object/public/assets';
export const TOUR_URL = `${S}/logo.png`;
export const CARTE_URL = `${S}/carte/carte-exador.webp`;

export const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export const HOOKS = [
  "95% des lycéens se trompent 🤯", "Ton prof ne t'a jamais dit ça…",
  "Tu connais la réponse ? 🤔", "Seulement 1 élève sur 5 trouve ✋",
  "Attention c'est piège… 🪤", "Facile ou impossible ? 🎯",
  "5 secondes pour répondre ⏱️", "Tu aurais combien au bac ? 📝",
  "La réponse va te surprendre 😱", "Challenge : trouve en 5s ⚡",
  "90% des adultes se trompent aussi 👀", "Personne ne trouve du premier coup",
];

export const HOOKS_BOSS = [
  "ose affronter", "te met au défi !", "a une question pour toi…",
  "attend ta réponse ⚔️", "te teste aujourd'hui !",
];

export const NIVEAU_LABELS: Record<string, string> = {
  '6eme': '6ème', '5eme': '5ème', '4eme': '4ème', '3eme': '3ème',
  '2nde': '2nde', '1ere': '1ère', 'terminale': 'Terminale',
};

export const MATIERE_THEMES: Record<string, { g1: string; g2: string; g3: string; accent: string; glow: string }> = {
  maths:       { g1: '#4338ca', g2: '#0c0a1a', g3: '#312e81', accent: '#818cf8', glow: '99,102,241' },
  physique:    { g1: '#0e7490', g2: '#041e1e', g3: '#155e75', accent: '#22d3ee', glow: '34,211,238' },
  svt:         { g1: '#15803d', g2: '#031a0d', g3: '#166534', accent: '#4ade80', glow: '74,222,128' },
  histoire:    { g1: '#b45309', g2: '#1a0f03', g3: '#92400e', accent: '#fbbf24', glow: '251,191,36' },
  francais:    { g1: '#be185d', g2: '#1a0510', g3: '#9d174d', accent: '#f472b6', glow: '244,114,182' },
  philosophie: { g1: '#7c3aed', g2: '#120a24', g3: '#6d28d9', accent: '#a78bfa', glow: '167,139,250' },
  geographie:  { g1: '#0d9488', g2: '#031a17', g3: '#0f766e', accent: '#2dd4bf', glow: '45,212,191' },
  anglais:     { g1: '#c2410c', g2: '#1a0a03', g3: '#9a3412', accent: '#fb923c', glow: '251,146,60' },
  ses:         { g1: '#0891b2', g2: '#031a1e', g3: '#0e7490', accent: '#22d3ee', glow: '34,211,238' },
  default:     { g1: '#6366f1', g2: '#0a0a1a', g3: '#4f46e5', accent: '#a5b4fc', glow: '165,180,252' },
};

export const MUSIC_URLS: Record<string, string> = {
  'Castle Festivities': `${S}/music/castle-festivities.mp3`,
  'Epic Adventure': `${S}/music/epic-adventure.mp3`,
  'Forest Ambience': `${S}/music/forest-ambience.mp3`,
  'Medieval Village': `${S}/music/medieval-village.mp3`,
  'Mystery Dungeon': `${S}/music/mystery-dungeon.mp3`,
  'Tavern Music': `${S}/music/tavern-music.mp3`,
};

export const SFX_URLS = {
  bonneReponse: `${S}/sounds/bonne-reponse.mp3`,
  mauvaiseReponse: `${S}/sounds/mauvaise-reponse.mp3`,
  clicBouton: `${S}/sounds/clic-bouton.mp3`,
  notification: `${S}/sounds/notification.mp3`,
  streak: `${S}/sounds/streak.mp3`,
  gainXp: `${S}/sounds/gain-xp.mp3`,
  victoireBoss: `${S}/sounds/victoire-boss.mp3`,
  defaiteBoss: `${S}/sounds/defaite-boss.mp3`,
  levelup: `${S}/sounds/levelup.mp3`,
};

// ════════════════════════════════════════════════════════════════════
// TYPES
// ════════════════════════════════════════════════════════════════════

export interface QuestionData {
  id: string;
  enonce: string;
  answers: { key: string; text: string; correct: boolean }[];
  explication: string;
  matiere: string;
  niveau: string;
  chapitre: string;
}

export interface PersonnageData {
  id: string;
  nom: string;
  emoji: string;
  image_url: string;
  dialogues: {
    intro?: string;
    victoire?: string;
    defaite?: string;
    encouragement_1?: string;
    encouragement_2?: string;
    reaction_erreur_1?: string;
    reaction_erreur_2?: string;
    mi_parcours?: string;
  };
  fun_facts: string[];
  citation_celebre: string;
  description_courte: string;
}

export interface VideoConfig {
  // Contenu
  question: QuestionData;
  serieNom: string;
  serieNumber: number;
  // Personnage (optionnel — mode boss)
  personnage?: PersonnageData;
  // Durées (en secondes)
  hookDuration: number;
  questionDuration: number; // temps d'affichage avant countdown
  countdownDuration: number;
  revealDuration: number;
  funFactDuration: number;
  ctaDuration: number;
  // Toggles
  hookEnabled: boolean;
  ctaEnabled: boolean;
  bossMode: boolean;
  bossIntroEnabled: boolean;
  funFactsEnabled: boolean;
  statsEnabled: boolean;
  lootEnabled: boolean;
  introSerieEnabled: boolean;
  // Visuel
  template: 'classique' | 'boss_battle' | 'challenge_flash';
  backgroundMode: 'gradient' | 'lieu' | 'batiment';
  backgroundImage?: string; // URL du fond
  // Audio
  musicUrl?: string;
  musicVolume: number; // 0-1
  sfxEnabled: boolean;
  // Fake stats
  fakeStat: number;
}

// ════════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════════

export function getTheme(matiere: string) {
  const key = matiere.toLowerCase().replace('é', 'e').replace('ç', 'c');
  return MATIERE_THEMES[key] || MATIERE_THEMES.default;
}

export function cleanLatex(t: string): string {
  if (!t) return '';
  return t.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1/$2)')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\times/g, '×').replace(/\\div/g, '÷')
    .replace(/\\leq/g, '≤').replace(/\\geq/g, '≥')
    .replace(/\\neq/g, '≠').replace(/\\infty/g, '∞')
    .replace(/\\pi/g, 'π').replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β').replace(/\\gamma/g, 'γ')
    .replace(/\^{(\d)}/g, (_, d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[parseInt(d)] || d)
    .replace(/_{(\d)}/g, (_, d) => '₀₁₂₃₄₅₆₇₈₉'[parseInt(d)] || d)
    .replace(/\$/g, '').replace(/\\[a-zA-Z]+/g, '').replace(/[{}]/g, '');
}
