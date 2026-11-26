// Grafik SVG tanpa pustaka: grafik garis dan grafik batang yang digambar
// dari deret angka di data.js. Semua label memakai format Indonesia.

const INK = '#0b3d3a';
const GRID = '#e3ddd0';
const AXIS = '#8a8378';
const TEAL = '#0f766e';
const AMBER = '#d97706';
const RED = '#b91c1c';

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const raw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const size = step * mag;
  const start = Math.ceil(min / size) * size;
  const ticks = [];
  for (let v = start; v <= max + size * 0.001; v += size) ticks.push(v);
  return { ticks, step: size };
}

function fmtTick(v) {
  const s = String(Math.round(v * 100) / 100);
  return s.replace('.', ',');
}

// Grafik garis dengan sumbu, garis kisi, label tahun, dan titik nilai.
export function lineChart(series, opts = {}) {
  const width = opts.width || 760;
  const height = opts.height || 320;
  const padL = 58;
  const padR = 16;
  const padT = 18;
  const padB = 34;
  const w = width - padL - padR;
  const h = height - padT - padB;
  const values = series.map((p) => p[1]);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min >= 0 && min > max * 0.25) min = 0;
  if (min < 0) min = Math.min(min, 0);
  const pad = (max - min) * 0.08 || 1;
  min -= pad;
  max += pad;
  const { ticks } = niceTicks(min, max, 4);
  const x = (i) => padL + (i / (series.length - 1)) * w;
  const y = (v) => padT + h - ((v - min) / (max - min)) * h;
  const color = opts.color || TEAL;

  let s = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik garis" xmlns="http://www.w3.org/2000/svg">`;
  for (const t of ticks) {
    s += `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="${AXIS}">${fmtTick(t)}</text>`;
  }
  s += `<line x1="${padL}" y1="${padT + h}" x2="${width - padR}" y2="${padT + h}" stroke="${AXIS}" stroke-width="1"/>`;
  const points = series.map((p, i) => `${x(i).toFixed(1)},${y(p[1]).toFixed(1)}`).join(' ');
  s += `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  series.forEach((p, i) => {
    const hot = i === series.length - 1;
    s += `<circle cx="${x(i)}" cy="${y(p[1])}" r="${hot ? 5 : 3.5}" fill="${hot ? AMBER : '#ffffff'}" stroke="${color}" stroke-width="2"/>`;
    if (hot) {
      s += `<text x="${x(i)}" y="${y(p[1]) - 12}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">${fmtTick(p[1])}</text>`;
    }
  });
  series.forEach((p, i) => {
    if (i % 2 === 0 || i === series.length - 1) {
      s += `<text x="${x(i)}" y="${height - 10}" text-anchor="middle" font-size="12" fill="${AXIS}">${p[0]}</text>`;
    }
  });
  s += '</svg>';
  return s;
}

// Grafik batang horizontal dengan label nama dan nilai di ujung batang.
export function barChart(rows, opts = {}) {
  const width = opts.width || 760;
  const rowH = 34;
  const height = rows.length * rowH + 16;
  const padL = opts.labelWidth || 220;
  const padR = 70;
  const max = Math.max(...rows.map((r) => r.value));
  const color = opts.color || TEAL;
  const alt = opts.altColor || AMBER;
  let s = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik batang" xmlns="http://www.w3.org/2000/svg">`;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const bw = ((width - padL - padR) * r.value) / max;
    const fill = i === 0 && opts.highlightFirst ? alt : color;
    s += `<text x="${padL - 10}" y="${y + 15}" text-anchor="end" font-size="13" fill="${INK}">${escapeText(r.label)}</text>`;
    s += `<rect x="${padL}" y="${y}" width="${Math.max(bw, 2)}" height="20" rx="3" fill="${fill}"/>`;
    s += `<text x="${padL + bw + 8}" y="${y + 15}" font-size="13" font-weight="600" fill="${INK}">${r.display}</text>`;
  });
  s += '</svg>';
  return s;
}

// Dua deret dalam satu grafik garis (mis. ekspor vs impor).
export function dualLineChart(a, b, opts = {}) {
  const width = opts.width || 760;
  const height = opts.height || 320;
  const padL = 58;
  const padR = 16;
  const padT = 18;
  const padB = 34;
  const w = width - padL - padR;
  const h = height - padT - padB;
  const all = [...a.map((p) => p[1]), ...b.map((p) => p[1])];
  let min = Math.min(0, ...all);
  let max = Math.max(...all);
  const pad = (max - min) * 0.08 || 1;
  min -= pad;
  max += pad;
  const { ticks } = niceTicks(min, max, 4);
  const x = (i) => padL + (i / (a.length - 1)) * w;
  const y = (v) => padT + h - ((v - min) / (max - min)) * h;
  let s = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik garis ganda" xmlns="http://www.w3.org/2000/svg">`;
  for (const t of ticks) {
    s += `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="${AXIS}">${fmtTick(t)}</text>`;
  }
  s += `<line x1="${padL}" y1="${padT + h}" x2="${width - padR}" y2="${padT + h}" stroke="${AXIS}" stroke-width="1"/>`;
  const line = (series, color) => {
    const pts = series.map((p, i) => `${x(i).toFixed(1)},${y(p[1]).toFixed(1)}`).join(' ');
    return `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>`;
  };
  s += line(a, TEAL) + line(b, AMBER);
  const lastA = a[a.length - 1];
  const lastB = b[b.length - 1];
  s += `<circle cx="${x(a.length - 1)}" cy="${y(lastA[1])}" r="5" fill="${AMBER}" stroke="${TEAL}" stroke-width="2"/>`;
  s += `<circle cx="${x(b.length - 1)}" cy="${y(lastB[1])}" r="5" fill="#fff" stroke="${AMBER}" stroke-width="2"/>`;
  a.forEach((p, i) => {
    if (i % 2 === 0 || i === a.length - 1) {
      s += `<text x="${x(i)}" y="${height - 10}" text-anchor="middle" font-size="12" fill="${AXIS}">${p[0]}</text>`;
    }
  });
  s += `<g font-size="13" fill="${INK}"><rect x="${padL}" y="0" width="12" height="12" fill="${TEAL}"/><text x="${padL + 18}" y="11">${escapeText(opts.labelA || 'A')}</text><rect x="${padL + 130}" y="0" width="12" height="12" fill="${AMBER}"/><text x="${padL + 148}" y="11">${escapeText(opts.labelB || 'B')}</text></g>`;
  s += '</svg>';
  return s;
}

export function escapeText(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}
