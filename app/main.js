// Router dan interaksi NusaData. Rute memakai hash agar situs tetap
// berfungsi sebagai file statis di server apa pun:
//
//   #/                      beranda
//   #/penduduk              penduduk dan provinsi
//   #/ekonomi               ekonomi
//   #/sosial                masyarakat
//   #/bandingkan            bandingkan dua provinsi
//   #/indikator/<slug>      satu indikator, deret lengkap
//   #/metodologi            sumber dan definisi
//
// window.__shotReady false selama halaman dirender, true sesudahnya,
// supaya skrip screenshot tahu kapan menangkap layar.

import { INDICATORS, PROVINCES, indicator } from './data.js';
import { home, population, economy, people, compare, indicatorPage, methodology, missing } from './views.js';

const app = document.getElementById('app');

// Keadaan kontrol yang bertahan selama satu kunjungan halaman.
const state = {
  sortKey: 'pop',
  sortDir: 'desc',
  years: 10,
  compareA: PROVINCES[0].name,
  compareB: PROVINCES[1].name,
};

function setActiveNav(route) {
  document.querySelectorAll('header nav a').forEach((a) => {
    const href = a.getAttribute('href');
    const on = href === route || (route.startsWith('#/indikator') && href === '#/penduduk');
    a.classList.toggle('nav--on', on);
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function render() {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  const path = hash.slice(1);
  let html;
  let title = 'NusaData — Portal Statistik Indonesia';
  let route = '#/';

  const indMatch = path.match(/^\/indikator\/([^/?]+)$/);
  if (path === '/' || path === '') {
    html = home();
  } else if (path === '/penduduk') {
    html = population(state);
    title = 'Penduduk | NusaData';
    route = '#/penduduk';
  } else if (path === '/ekonomi') {
    html = economy();
    title = 'Ekonomi | NusaData';
    route = '#/ekonomi';
  } else if (path === '/sosial') {
    html = people();
    title = 'Masyarakat | NusaData';
    route = '#/penduduk';
  } else if (path === '/bandingkan') {
    html = compare({ a: state.compareA, b: state.compareB });
    title = 'Bandingkan provinsi | NusaData';
    route = '#/bandingkan';
  } else if (path === '/metodologi') {
    html = methodology();
    title = 'Metodologi & sumber | NusaData';
    route = '#/metodologi';
  } else if (indMatch) {
    const ind = indicator(decodeURIComponent(indMatch[1]));
    if (ind) {
      html = indicatorPage(ind);
      title = `${ind.name} | NusaData`;
    } else {
      html = missing(path);
      title = 'Tidak ditemukan | NusaData';
    }
  } else {
    html = missing(path);
    title = 'Tidak ditemukan | NusaData';
  }

  document.title = title;
  app.innerHTML = html;
  setActiveNav(route);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// Satu pendengar untuk semua kontrol di dalam #app.
app.addEventListener('click', (event) => {
  const sortBtn = event.target.closest('[data-sort]');
  if (sortBtn) {
    const key = sortBtn.dataset.sort;
    if (state.sortKey === key) {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortKey = key;
      state.sortDir = key === 'name' ? 'asc' : 'desc';
    }
    render();
    return;
  }
  const yearsBtn = event.target.closest('[data-years]');
  if (yearsBtn) {
    state.years = Number(yearsBtn.dataset.years);
    render();
    return;
  }
  if (event.target.id === 'compare-swap') {
    const tmp = state.compareA;
    state.compareA = state.compareB;
    state.compareB = tmp;
    render();
    return;
  }
  if (event.target.id === 'download-csv') {
    downloadCsv(event.target.dataset.slug);
  }
});

// Pencarian indikator di beranda: saring kartu saat mengetik.
app.addEventListener('input', (event) => {
  if (event.target.id === 'indicator-search') {
    const q = event.target.value.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll('#indicator-list .stat-card').forEach((card) => {
      const hit = !q || card.textContent.toLowerCase().includes(q);
      card.style.display = hit ? '' : 'none';
      if (hit) shown += 1;
    });
    document.getElementById('indicator-empty').hidden = shown > 0;
    return;
  }
  if (event.target.id === 'compare-a') {
    state.compareA = event.target.value;
    render();
    return;
  }
  if (event.target.id === 'compare-b') {
    state.compareB = event.target.value;
    render();
  }
});

// Unduh deret indikator sebagai CSV lewat Blob — tanpa jaringan.
function downloadCsv(slug) {
  const ind = INDICATORS.find((i) => i.slug === slug);
  if (!ind) return;
  const lines = ['tahun,nilai (' + ind.unit.replace(/,/g, '') + ')'];
  for (const [year, value] of ind.series) {
    lines.push(year + ',' + String(value).replace('.', ','));
  }
  lines.push('');
  lines.push('Sumber,' + ind.source);
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nusadata-' + slug + '.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

window.addEventListener('hashchange', render);
render();
