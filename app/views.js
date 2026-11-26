// Tampilan tiap halaman. Setiap halaman dirender dari data.js menjadi HTML;
// kontrol interaktif (urutkan, bandingkan, cari, unduh) dihubungkan di main.js.

import { INDICATORS, PROVINCES, SECTORS, FACTS, RELEASES, formatNumber, indicator } from './data.js';
import { lineChart, barChart, dualLineChart, escapeText } from './charts.js';

const esc = escapeText;

function statCard(ind, highlight) {
  return `<a class="stat-card${highlight ? ' stat-card--hot' : ''}" href="#/indikator/${ind.slug}">
    <span class="stat-card__label">${esc(ind.name)}</span>
    <span class="stat-card__value">${formatNumber(ind.latest, ind.decimals)} <small>${esc(ind.unit)}</small></span>
    <span class="stat-card__meta">${ind.year} · ${esc(ind.source)}</span>
  </a>`;
}

function sourceNote(text) {
  return `<p class="source">Sumber: ${esc(text)}</p>`;
}

export function home() {
  const key = ['penduduk', 'pertumbuhan-ekonomi', 'inflasi', 'pengangguran', 'kemiskinan', 'pdb'];
  const cards = key.map((s) => indicator(s)).map((ind) => statCard(ind, ind.slug === 'penduduk')).join('');
  const growth = indicator('pertumbuhan-ekonomi');
  const factRows = FACTS.map((f) => `<li><strong>${esc(f.value)}</strong><span>${esc(f.label)}</span><em>${esc(f.source)}</em></li>`).join('');
  const releases = RELEASES.map((r) => `<li><time>${esc(r.date)}</time><span>${esc(r.title)}</span><em>${esc(r.source)}</em></li>`).join('');
  return `
<section class="hero">
  <p class="kicker">Portal Statistik Indonesia · Data resmi, dikutip sumbernya</p>
  <h1>Angka Indonesia,<br>dalam satu tempat.</h1>
  <p class="lede">Penduduk, ekonomi, dan kesejahteraan dari 38 provinsi — diringkas dari
  publikasi BPS, Bank Dunia, dan Bank Indonesia, lengkap dengan sumber dan tahun
  tiap angka, supaya Anda bisa memeriksa sendiri.</p>
  <p class="hero__actions">
    <a class="btn" href="#/penduduk">Jelajahi penduduk</a>
    <a class="btn btn--ghost" href="#/ekonomi">Lihat ekonomi</a>
    <a class="btn btn--ghost" href="#/bandingkan">Bandingkan provinsi</a>
  </p>
</section>

<section>
  <h2>Angka utama</h2>
  <div class="stat-grid">${cards}</div>
  ${sourceNote('BPS dan Bank Dunia, 2024–2025. Klik kartu untuk melihat deret lengkapnya.')}
</section>

<section class="split">
  <div>
    <h2>Pertumbuhan ekonomi 2015–2024</h2>
    <p>Ekonomi tumbuh di atas 5% dalam tiga tahun terakhir, setelah sempat
    kontraksi 2,07% pada 2020. Angka 2024: <strong>5,03%</strong>.</p>
    ${lineChart(growth.series, { color: '#0f766e' })}
    ${sourceNote(growth.source + ', 2024.')}
    <p><a href="#/indikator/pertumbuhan-ekonomi">Deret lengkap &amp; unduh CSV &rarr;</a></p>
  </div>
  <div>
    <h2>Rilis terbaru</h2>
    <ul class="releases">${releases}</ul>
  </div>
</section>

<section>
  <h2>Sekilas Indonesia</h2>
  <ul class="facts">${factRows}</ul>
</section>

<section>
  <h2>Semua indikator</h2>
  <p class="search-row"><input id="indicator-search" type="search" placeholder="Cari indikator, mis. inflasi atau IPM…" aria-label="Cari indikator"></p>
  <div class="stat-grid" id="indicator-list">
    ${INDICATORS.map((ind) => statCard(ind, false)).join('')}
  </div>
  <p id="indicator-empty" class="muted" hidden>Tidak ada indikator yang cocok. Coba kata lain.</p>
</section>`;
}

export function population(state) {
  const rows = [...PROVINCES].sort((a, b) => {
    const k = state.sortKey || 'pop';
    const d = state.sortDir === 'asc' ? 1 : -1;
    return (a[k] - b[k]) * d;
  });
  const arrow = (k) => (state.sortKey === k ? (state.sortDir === 'asc' ? ' ▲' : ' ▼') : '');
  const body = rows
    .map(
      (p) => `<tr>
        <td>${esc(p.name)}</td>
        <td class="num">${formatNumber(p.pop, 2)}</td>
        <td class="num">${formatNumber(p.density, 0)}</td>
        <td class="num">${formatNumber(p.poverty, 2)}%</td>
        <td class="num">${formatNumber(p.hdi, 1)}</td>
      </tr>`,
    )
    .join('');
  const pop = indicator('penduduk');
  const range = state.years === 5 ? pop.series.slice(-5) : pop.series;
  const bars = [...PROVINCES]
    .sort((a, b) => b.pop - a.pop)
    .map((p) => ({ label: p.name, value: p.pop, display: formatNumber(p.pop, 1) + ' jt' }));
  return `
<p class="crumbs"><a href="#/">Beranda</a> / Penduduk</p>
<h1>Penduduk Indonesia</h1>
<p class="lede">283,5 juta jiwa pada 2024 — negara berpenduduk terbesar keempat di dunia.
Hampir 56% tinggal di Pulau Jawa, yang luasnya kurang dari 7% daratan Indonesia.</p>

<section>
  <h2>Jumlah penduduk 2015–2024</h2>
  <p class="range-row" role="group" aria-label="Rentang tahun">
    <button class="chip${state.years === 5 ? ' chip--on' : ''}" data-years="5">5 tahun terakhir</button>
    <button class="chip${state.years === 10 ? ' chip--on' : ''}" data-years="10">10 tahun</button>
  </p>
  ${lineChart(range, { color: '#0f766e' })}
  ${sourceNote(pop.source + ', 2024.')}
</section>

<section>
  <h2>Provinsi terpadat</h2>
  ${barChart(bars, { labelWidth: 170 })}
  ${sourceNote('BPS, proyeksi penduduk 2024.')}
</section>

<section>
  <h2>Tabel provinsi</h2>
  <p>Klik judul kolom untuk mengurutkan. Angka kemiskinan Maret 2024 dan IPM 2024 (BPS).</p>
  <div class="table-wrap"><table class="data-table">
    <thead><tr>
      <th><button data-sort="name">Provinsi</button></th>
      <th><button data-sort="pop">Penduduk (juta)${arrow('pop')}</button></th>
      <th><button data-sort="density">Kepadatan (jiwa/km²)${arrow('density')}</button></th>
      <th><button data-sort="poverty">Kemiskinan (%)${arrow('poverty')}</button></th>
      <th><button data-sort="hdi">IPM${arrow('hdi')}</button></th>
    </tr></thead>
    <tbody>${body}</tbody>
  </table></div>
  ${sourceNote('BPS, 2024. DKI Jakarta paling padat: 16.084 jiwa/km²; Riau paling jarang di antara sepuluh besar: 81 jiwa/km².')}
</section>`;
}

export function economy() {
  const growth = indicator('pertumbuhan-ekonomi');
  const infl = indicator('inflasi');
  const exp = indicator('ekspor');
  const imp = indicator('impor');
  const sectors = SECTORS.map((s) => ({ label: s.name, value: s.share, display: formatNumber(s.share, 1) + '%' }));
  return `
<p class="crumbs"><a href="#/">Beranda</a> / Ekonomi</p>
<h1>Ekonomi Indonesia</h1>
<p class="lede">PDB US$1.396 triliun pada 2024 — ekonomi terbesar di Asia Tenggara.
Pertumbuhan 5,03%, inflasi 1,57%, dan surplus perdagangan US$31,0 miliar.</p>

<section class="stat-grid">
  ${statCard(indicator('pdb'), true)}
  ${statCard(indicator('pdb-per-kapita'), false)}
  ${statCard(growth, false)}
  ${statCard(infl, false)}
</section>

<section>
  <h2>Pertumbuhan ekonomi 2015–2024 (% per tahun)</h2>
  ${lineChart(growth.series, { color: '#0f766e' })}
  ${sourceNote(growth.source + '. Kontraksi 2020 adalah dampak pandemi COVID-19.')}
</section>

<section>
  <h2>Inflasi 2015–2024 (% per tahun)</h2>
  ${lineChart(infl.series, { color: '#d97706' })}
  ${sourceNote(infl.source + '. Lonjakan 2022 mengikuti penyesuaian harga BBM bersubsidi.')}
</section>

<section>
  <h2>Ekspor vs impor 2015–2024 (miliar US$)</h2>
  ${dualLineChart(exp.series, imp.series, { labelA: 'Ekspor', labelB: 'Impor' })}
  ${sourceNote(exp.source + '. Surplus 2024: US$31,0 miliar.')}
</section>

<section>
  <h2>PDB menurut lapangan usaha, 2024</h2>
  ${barChart(sectors, { labelWidth: 250, highlightFirst: true })}
  ${sourceNote('BPS, 2024. Industri pengolahan tetap penyumbang terbesar, 18,7%.')}
</section>`;
}

export function people() {
  const pov = indicator('kemiskinan');
  const un = indicator('pengangguran');
  const hdi = indicator('ipm');
  return `
<p class="crumbs"><a href="#/">Beranda</a> / Masyarakat</p>
<h1>Masyarakat Indonesia</h1>
<p class="lede">Kemiskinan turun ke 8,47% pada Maret 2025 — terendah sepanjang sejarah pencatatan.
IPM 75,02 pada 2024 menempatkan Indonesia pada kategori pembangunan manusia tinggi.</p>

<section class="stat-grid">
  ${statCard(pov, true)}
  ${statCard(un, false)}
  ${statCard(hdi, false)}
  ${statCard(indicator('harapan-hidup'), false)}
  ${statCard(indicator('literasi'), false)}
</section>

<section>
  <h2>Tingkat kemiskinan 2015–2024 (% penduduk)</h2>
  ${lineChart(pov.series, { color: '#0f766e' })}
  ${sourceNote(pov.source + '. Angka Maret tiap tahun; terbaru Maret 2025: 8,47%.')}
</section>

<section>
  <h2>Pengangguran 2015–2024 (% angkatan kerja)</h2>
  ${lineChart(un.series, { color: '#d97706' })}
  ${sourceNote(un.source + '. Lonjakan 2020–2021 adalah dampak pandemi; Februari 2025: 4,76%.')}
</section>

<section>
  <h2>Indeks Pembangunan Manusia 2015–2024</h2>
  ${lineChart(hdi.series, { color: '#0f766e' })}
  ${sourceNote(hdi.source + '. IPM menggabungkan kesehatan, pendidikan, dan standar hidup layak.')}
</section>

<section>
  <h2>Yang perlu diketahui</h2>
  <ul class="notes">
    <li><strong>Kemiskinan turun, tapi ketimpangan bertahan.</strong> Rasio gini Maret 2025 tercatat 0,375 (BPS) — nyaris tidak berubah dalam satu dekade.</li>
    <li><strong>Pekerja informal masih mayoritas.</strong> Sekitar 6 dari 10 pekerja berada di sektor informal (BPS, Sakernas 2024).</li>
    <li><strong>Akses dasar hampir merata.</strong> Rasio elektrifikasi 99,8% (PLN, 2023) dan pengguna internet 221,6 juta (APJII, 2024).</li>
  </ul>
</section>`;
}

export function compare(state) {
  const a = PROVINCES.find((p) => p.name === state.a) || PROVINCES[0];
  const b = PROVINCES.find((p) => p.name === state.b) || PROVINCES[1];
  const opts = (sel) => PROVINCES.map((p) => `<option${p.name === sel ? ' selected' : ''}>${esc(p.name)}</option>`).join('');
  const row = (label, va, vb, unit, better) => {
    const mark = (v, other) => {
      if (better === 'high') return v > other ? ' ★' : '';
      if (better === 'low') return v < other ? ' ★' : '';
      return '';
    };
    return `<tr><td>${label}</td><td class="num">${va}${mark(a[unit], b[unit])}</td><td class="num">${vb}${mark(b[unit], a[unit])}</td></tr>`;
  };
  const bars = [
    { label: a.name + ' — penduduk', value: a.pop, display: formatNumber(a.pop, 1) + ' jt' },
    { label: b.name + ' — penduduk', value: b.pop, display: formatNumber(b.pop, 1) + ' jt' },
    { label: a.name + ' — kepadatan', value: a.density, display: formatNumber(a.density, 0) + '/km²' },
    { label: b.name + ' — kepadatan', value: b.density, display: formatNumber(b.density, 0) + '/km²' },
  ];
  return `
<p class="crumbs"><a href="#/">Beranda</a> / Bandingkan</p>
<h1>Bandingkan provinsi</h1>
<p class="lede">Pilih dua provinsi untuk membandingkan penduduk, kepadatan, kemiskinan,
dan IPM. Tanda ★ menandai angka yang lebih baik pada baris itu (penduduk dan
kepadatan tidak dinilai baik-buruk, hanya dibandingkan).</p>

<form class="compare-form" onsubmit="return false">
  <label>Provinsi pertama
    <select id="compare-a">${opts(a.name)}</select>
  </label>
  <button type="button" class="btn btn--ghost" id="compare-swap" aria-label="Tukar provinsi">⇄ Tukar</button>
  <label>Provinsi kedua
    <select id="compare-b">${opts(b.name)}</select>
  </label>
</form>

<section>
  <h2>${esc(a.name)} vs ${esc(b.name)}</h2>
  <div class="table-wrap"><table class="data-table">
    <thead><tr><th>Ukuran (2024)</th><th>${esc(a.name)}</th><th>${esc(b.name)}</th></tr></thead>
    <tbody>
      ${row('Penduduk (juta jiwa)', formatNumber(a.pop, 2), formatNumber(b.pop, 2), 'pop', 'none')}
      ${row('Kepadatan (jiwa/km²)', formatNumber(a.density, 0), formatNumber(b.density, 0), 'density', 'none')}
      ${row('Kemiskinan (%)', formatNumber(a.poverty, 2) + '%', formatNumber(b.poverty, 2) + '%', 'poverty', 'low')}
      ${row('IPM (skala 0–100)', formatNumber(a.hdi, 1), formatNumber(b.hdi, 1), 'hdi', 'high')}
    </tbody>
  </table></div>
  ${sourceNote('BPS, 2024. Kemiskinan Maret 2024; IPM 2024.')}
</section>

<section>
  <h2>Perbandingan visual</h2>
  ${barChart(bars, { labelWidth: 250 })}
</section>`;
}

export function indicatorPage(ind) {
  const rows = [...ind.series].reverse()
    .map(([y, v]) => `<tr><td>${y}</td><td class="num">${formatNumber(v, ind.decimals)} ${esc(ind.unit)}</td></tr>`)
    .join('');
  const first = ind.series[0];
  const last = ind.series[ind.series.length - 1];
  const change = last[1] - first[1];
  const sign = change >= 0 ? '+' : '−';
  return `
<p class="crumbs"><a href="#/">Beranda</a> / <a href="#/penduduk">Indikator</a> / ${esc(ind.name)}</p>
<h1>${esc(ind.name)}</h1>
<p class="lede">Nilai terbaru: <strong>${formatNumber(ind.latest, ind.decimals)} ${esc(ind.unit)}</strong>
(${ind.year}). Sejak ${first[0]} berubah ${sign}${formatNumber(Math.abs(change), ind.decimals)} ${esc(ind.unit)}.</p>
<p>${esc(ind.definition)}</p>
${ind.note ? `<p class="note">${esc(ind.note)}</p>` : ''}

<section>
  <h2>Deret waktu ${first[0]}–${last[0]}</h2>
  ${lineChart(ind.series, { color: '#0f766e' })}
  ${sourceNote(ind.source + ', ' + ind.year + '.')}
  <p><button class="btn" id="download-csv" data-slug="${esc(ind.slug)}">Unduh data (CSV)</button>
  <span class="muted"> File berisi tahun dan nilai, siap dibuka di spreadsheet.</span></p>
</section>

<section>
  <h2>Tabel data</h2>
  <div class="table-wrap"><table class="data-table">
    <thead><tr><th>Tahun</th><th>Nilai (${esc(ind.unit)})</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
</section>

<section>
  <h2>Indikator lain</h2>
  <div class="stat-grid">
    ${INDICATORS.filter((x) => x.category === ind.category && x.slug !== ind.slug)
      .map((x) => statCard(x, false)).join('')}
  </div>
</section>`;
}

export function methodology() {
  return `
<p class="crumbs"><a href="#/">Beranda</a> / Metodologi</p>
<h1>Metodologi &amp; sumber</h1>
<p class="lede">Setiap angka di NusaData berasal dari publikasi resmi. Halaman ini
menjelaskan dari mana angka itu datang, apa artinya, dan kapan diperbarui.</p>

<section>
  <h2>Sumber data</h2>
  <ul class="notes">
    <li><strong>BPS (Badan Pusat Statistik)</strong> — pertumbuhan ekonomi, inflasi, pengangguran (Sakernas), kemiskinan (Susenas), IPM, dan data provinsi. Publikasi diumumkan lewat Berita Resmi Statistik.</li>
    <li><strong>Bank Dunia, World Development Indicators</strong> — jumlah penduduk, PDB, PDB per kapita, dan harapan hidup, agar angka Indonesia bisa dibandingkan antarnegara.</li>
    <li><strong>Bank Indonesia</strong> — cadangan devisa dan nilai tukar rupiah.</li>
    <li><strong>APJII</strong> — survei penetrasi pengguna internet Indonesia 2024.</li>
    <li><strong>PLN</strong> — rasio elektrifikasi nasional 2023.</li>
  </ul>
</section>

<section>
  <h2>Definisi yang sering ditanya</h2>
  <dl class="defs">
    <dt>PDB harga berlaku vs harga konstan</dt>
    <dd>Nilai PDB dalam dolar pada halaman ini memakai harga berlaku. Pertumbuhan ekonomi memakai PDB harga konstan, sehingga yang diukur adalah volume, bukan harga.</dd>
    <dt>Tingkat pengangguran terbuka</dt>
    <dd>Penganggur dibagi angkatan kerja. Seseorang dihitung menganggur bila tidak bekerja dan sedang mencari pekerjaan atau mempersiapkan usaha.</dd>
    <dt>Garis kemiskinan</dt>
    <dd>Batas pengeluaran per kapita per bulan untuk memenuhi kebutuhan makanan dan non-makanan minimum. Garis ini berbeda tiap provinsi dan diperbarui tiap survei.</dd>
    <dt>IPM</dt>
    <dd>Indeks gabungan dari harapan hidup saat lahir, harapan lama sekolah dan rata-rata lama sekolah, serta pengeluaran per kapita yang disesuaikan. Skala 0–100; 70 ke atas kategori tinggi.</dd>
  </dl>
</section>

<section>
  <h2>Kalender rilis BPS yang dikutip</h2>
  <div class="table-wrap"><table class="data-table">
    <thead><tr><th>Rilis</th><th>Jadwal</th></tr></thead>
    <tbody>
      <tr><td>Pertumbuhan ekonomi triwulanan</td><td>Awal Februari, Mei, Agustus, November</td></tr>
      <tr><td>Inflasi bulanan</td><td>Awal tiap bulan</td></tr>
      <tr><td>Kemiskinan</td><td>Januari dan Juli</td></tr>
      <tr><td>Pengangguran (Sakernas)</td><td>Mei dan November</td></tr>
      <tr><td>IPM</td><td>November</td></tr>
    </tbody>
  </table></div>
</section>

<section>
  <h2>Tentang NusaData</h2>
  <p>NusaData adalah situs statistik independen yang merangkum data publik
  untuk keperluan belajar dan rujukan cepat. Situs ini bukan publikasi resmi
  BPS atau pemerintah. Angka di sini dikutip apa adanya dari sumbernya; bila
  sumber merevisi angka, halaman ini ikut direvisi dan tanggal pembaruan di
  kaki halaman berubah. Situs ini bekerja sepenuhnya luring: tidak ada data
  yang diambil dari internet saat Anda membukanya.</p>
</section>`;
}

export function missing(path) {
  return `
<h1>Halaman tidak ditemukan</h1>
<p>Tidak ada halaman di alamat <code>${esc(path)}</code>.</p>
<p><a href="#/">Kembali ke beranda</a> · <a href="#/penduduk">Penduduk</a> · <a href="#/ekonomi">Ekonomi</a> · <a href="#/metodologi">Metodologi</a></p>`;
}
