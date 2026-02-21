// ════════════════════════════════════════════════════════════════════
// BATCH RENDER — Génère plusieurs MP4 depuis un fichier JSON de configs
// Usage: npx tsx src/batch-render.ts configs/my-playlist.json
// ════════════════════════════════════════════════════════════════════

import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';
import fs from 'fs';
import { VideoConfig } from './data/shared';
import { calculateDuration } from './TikTokVideo';

const FPS = 30;
const WIDTH = 720;
const HEIGHT = 1280;

async function main() {
  const configPath = process.argv[2];

  if (!configPath) {
    console.log('Usage: npx tsx src/batch-render.ts <config-file.json>');
    console.log('');
    console.log('Le fichier JSON doit contenir un tableau de VideoConfig.');
    console.log('Vous pouvez aussi exporter les configs depuis le Content Generator V3 de l\'app.');
    process.exit(1);
  }

  // Charger les configs
  const raw = fs.readFileSync(configPath, 'utf-8');
  const configs: VideoConfig[] = JSON.parse(raw);

  if (!Array.isArray(configs) || configs.length === 0) {
    console.error('❌ Le fichier doit contenir un tableau de VideoConfig non vide.');
    process.exit(1);
  }

  console.log(`\n🎬 SUPER ÉLÈVE — Batch Render`);
  console.log(`📦 ${configs.length} vidéos à générer`);
  console.log(`📐 ${WIDTH}×${HEIGHT} @ ${FPS}fps\n`);

  // Bundle le projet Remotion
  console.log('📦 Bundling...');
  const bundled = await bundle({
    entryPoint: path.resolve(__dirname, 'index.ts'),
    webpackOverride: (config) => config,
  });
  console.log('✅ Bundle prêt\n');

  // Créer le dossier output
  const outDir = path.resolve(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Rendre chaque vidéo
  let success = 0;
  let errors = 0;
  const startTime = Date.now();

  for (let i = 0; i < configs.length; i++) {
    const cfg = configs[i];
    const duration = calculateDuration(cfg);
    const durationInFrames = duration * FPS;
    const filename = `${cfg.serieNom?.replace(/[^a-zA-Z0-9]/g, '_') || 'video'}_${cfg.serieNumber || i + 1}.mp4`;
    const outputPath = path.join(outDir, filename);

    console.log(`🎥 [${i + 1}/${configs.length}] ${filename} (${duration}s, ${durationInFrames} frames)`);

    try {
      const composition = await selectComposition({
        serveUrl: bundled,
        id: 'TikTokVideo',
        inputProps: { config: cfg },
      });

      await renderMedia({
        composition: { ...composition, durationInFrames, width: WIDTH, height: HEIGHT, fps: FPS },
        serveUrl: bundled,
        codec: 'h264',
        outputLocation: outputPath,
        inputProps: { config: cfg },
      });

      console.log(`   ✅ OK → ${outputPath}`);
      success++;
    } catch (err) {
      console.error(`   ❌ Erreur: ${(err as Error).message}`);
      errors++;
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`🏁 Terminé en ${elapsed}s`);
  console.log(`✅ ${success} vidéos générées`);
  if (errors > 0) console.log(`❌ ${errors} erreurs`);
  console.log(`📁 Output: ${outDir}`);
}

main().catch(console.error);
