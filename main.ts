// NusaData — entri "Make the best national statistics site" (Node 22,
// standard library only). Situsnya adalah folder app/ di sebelah file ini:
// file statis yang dibuka browser di app/index.html (ES module, CSS, tanpa
// build step), isinya dari file-file sendiri, jadi tidak ada yang dimuat
// dari jaringan. Program ini menyerahkan situs itu: menyalin app/ dan
// screenshots/ dari sebelah file ini ke /output lalu menulis
// /output/dossier.json, ringkasan yang dibaca juri (screenshot, file dan
// byte first load, dan sumber situs), dengan pustaka make.fun yang
// divendor. Biarkan vendor/makefun-frontend.ts apa adanya: scorer
// mengharuskan dossier.json sama persis dengan yang ditulis salinannya.
//
// Jalankan di luar container grader dengan MAKEFUN_OUTPUT_DIR sebagai
// pengganti /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Batas scorer sendiri (reference/gate.json): hanya text_max_bytes yang
// membentuk byte dossier; sisanya menolak entri yang scorer akan tolak
// (lebih dari 4 screenshot atau satu di atas 256 KiB; lebih dari 993 file
// dan direktori di app/ atau 16 MiB file app/: app/ dihitung berdampingan
// dengan batas 1000 entri /output, bersama screenshots/ dan dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
