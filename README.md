# 🎬 Super Élève Remotion — TikTok/Reels Video Generator

Génère automatiquement des vidéos quiz MP4 en 720×1280 (9:16) pour TikTok, Reels et Shorts.

## 🚀 Installation

```bash
# Cloner et installer
cd supereleve-remotion
npm install

# Vérifier que tout marche
npx remotion preview src/index.ts
```

> ⚠️ Remotion nécessite **Node.js 18+** et **Chrome/Chromium** installé.

## 📐 Specs

- **Résolution** : 720×1280 (HD 9:16)
- **FPS** : 30
- **Audio** : Musique + SFX intégrés dans le MP4
- **Format** : H.264 MP4

## 🎮 Utilisation

### 1. Preview dans le navigateur

```bash
npx remotion preview src/index.ts
```

Ouvre un preview interactif avec la vidéo d'exemple (Archimède × Maths 6ème).

### 2. Rendre une vidéo

```bash
npx remotion render src/index.ts TikTokVideo out/video.mp4
```

### 3. Batch render (plusieurs vidéos)

```bash
# Créer un fichier JSON avec les configs (voir configs/example.json)
npx tsx src/batch-render.ts configs/my-playlist.json
```

### 4. Depuis le Content Generator

1. Dans l'app Super Élève → Admin → Content Generator V3
2. Configure ta playlist (matière, chapitre, personnage, etc.)
3. Clique "💾 Exporter config" → ça te donne un JSON
4. Copie le JSON dans `configs/` et lance le batch render

## 📁 Structure

```
src/
├── index.ts              # Point d'entrée Remotion
├── Root.tsx              # Compositions enregistrées
├── TikTokVideo.tsx       # Composition principale (orchestre les scènes)
├── batch-render.ts       # Script CLI batch
├── data/
│   └── shared.ts         # Types, constantes, helpers
├── scenes/
│   ├── IntroSerie.tsx    # Intro animée (tour + titre)
│   ├── BossIntro.tsx     # Portrait boss + dialogue
│   ├── HookScene.tsx     # Phrase d'accroche
│   ├── QuestionScene.tsx # Question + réponses
│   ├── CountdownScene.tsx # Timer décompte
│   ├── RevealScene.tsx   # Bonne réponse + explication + loot
│   ├── FunFactScene.tsx  # Fait amusant du personnage
│   └── CTAScene.tsx      # Appel à l'action
└── components/
    └── Background.tsx    # Fond gradient + image
```

## 🔧 Config JSON

Chaque vidéo est définie par un objet `VideoConfig` :

```json
{
  "question": {
    "id": "q1",
    "enonce": "Que signifie 6 × 4 ?",
    "answers": [
      { "key": "A", "text": "6 + 4", "correct": false },
      { "key": "B", "text": "4 répété 6 fois", "correct": true },
      { "key": "C", "text": "6 ÷ 4", "correct": false },
      { "key": "D", "text": "6 − 4", "correct": false }
    ],
    "explication": "6 × 4 = 4 + 4 + 4 + 4 + 4 + 4 = 24",
    "matiere": "Maths",
    "niveau": "6ème",
    "chapitre": "Multiplication"
  },
  "serieNom": "Maths 6ème",
  "serieNumber": 1,
  "personnage": { ... },
  "hookDuration": 3,
  "countdownDuration": 5,
  "revealDuration": 4,
  "bossMode": true,
  "musicUrl": "https://...castle-festivities.mp3",
  "musicVolume": 0.3,
  "sfxEnabled": true
}
```

## ☁️ Remotion Lambda (Phase 2)

Pour le rendu cloud haute vitesse :

```bash
# Installer le CLI Lambda
npm i @remotion/lambda

# Déployer sur AWS
npx remotion lambda sites create src/index.ts
npx remotion lambda functions deploy
```

Puis le bouton "Export MP4" dans le Content Generator appellera directement Lambda.

## 📊 Performance estimée

| Mode | Temps/vidéo (30s) | 200 vidéos |
|------|------------------|------------|
| Local (MacBook M1) | ~15s | ~50min |
| Local (PC 8 cores) | ~10s | ~33min |
| Remotion Lambda | ~5s | ~17min |

## 💡 Tips

- **Batch de nuit** : Lance `npx tsx src/batch-render.ts` avant de dormir
- **Parallélisation** : Remotion supporte `--concurrency` pour render en parallèle
- **Qualité** : Passe à 1080×1920 en changeant WIDTH/HEIGHT dans batch-render.ts
