// Data statistik Indonesia. Semua angka dari publikasi resmi yang dikutip
// di tiap indikator (BPS, Bank Dunia, Bank Indonesia, APJII, PLN).
// Nilai dibulatkan ke satu desimal agar mudah dibaca; sumber dan tahun
// dicantumkan di halaman agar setiap angka bisa dilacak.

export const SITE = {
  name: 'NusaData',
  tagline: 'Portal Statistik Indonesia',
  updated: '26 November 2026',
};

// Satu indikator = satu deret waktu. `series` berisi [tahun, nilai].
export const INDICATORS = [
  {
    slug: 'penduduk',
    name: 'Jumlah penduduk',
    category: 'Penduduk',
    unit: 'juta jiwa',
    latest: 283.5,
    year: 2024,
    source: 'Bank Dunia, World Development Indicators',
    decimals: 1,
    definition:
      'Jumlah seluruh penduduk yang tinggal di wilayah Indonesia pada pertengahan tahun, berdasarkan estimasi Bank Dunia.',
    series: [
      [2015, 258.2], [2016, 261.0], [2017, 263.8], [2018, 266.5],
      [2019, 269.1], [2020, 271.9], [2021, 274.9], [2022, 277.5],
      [2023, 280.7], [2024, 283.5],
    ],
  },
  {
    slug: 'pdb',
    name: 'Produk Domestik Bruto (PDB)',
    category: 'Ekonomi',
    unit: 'triliun US$',
    latest: 1.396,
    year: 2024,
    source: 'Bank Dunia, World Development Indicators',
    decimals: 3,
    definition:
      'Nilai seluruh barang dan jasa akhir yang dihasilkan di Indonesia dalam satu tahun, dalam dolar AS berlaku.',
    series: [
      [2015, 0.861], [2016, 0.932], [2017, 1.015], [2018, 1.042],
      [2019, 1.119], [2020, 1.059], [2021, 1.186], [2022, 1.319],
      [2023, 1.371], [2024, 1.396],
    ],
  },
  {
    slug: 'pdb-per-kapita',
    name: 'PDB per kapita',
    category: 'Ekonomi',
    unit: 'US$',
    latest: 4925,
    year: 2024,
    source: 'Bank Dunia, World Development Indicators',
    decimals: 0,
    definition:
      'PDB dibagi jumlah penduduk: gambaran kasar rata-rata nilai ekonomi yang dihasilkan per orang dalam setahun.',
    series: [
      [2015, 3331], [2016, 3570], [2017, 3847], [2018, 3906],
      [2019, 4151], [2020, 3894], [2021, 4314], [2022, 4783],
      [2023, 4919], [2024, 4925],
    ],
  },
  {
    slug: 'pertumbuhan-ekonomi',
    name: 'Pertumbuhan ekonomi',
    category: 'Ekonomi',
    unit: '% per tahun',
    latest: 5.03,
    year: 2024,
    source: 'BPS, Berita Resmi Statistik',
    decimals: 2,
    definition:
      'Perubahan PDB harga konstan dibanding tahun sebelumnya. Tahun 2020 negatif karena pandemi COVID-19.',
    series: [
      [2015, 4.88], [2016, 5.03], [2017, 5.07], [2018, 5.17],
      [2019, 5.02], [2020, -2.07], [2021, 3.7], [2022, 5.31],
      [2023, 5.05], [2024, 5.03],
    ],
  },
  {
    slug: 'inflasi',
    name: 'Inflasi (Desember, y-on-y)',
    category: 'Ekonomi',
    unit: '% per tahun',
    latest: 1.57,
    year: 2024,
    source: 'BPS, Berita Resmi Statistik',
    decimals: 2,
    definition:
      'Kenaikan Indeks Harga Konsumen pada bulan Desember dibanding Desember tahun sebelumnya.',
    series: [
      [2015, 3.35], [2016, 3.02], [2017, 3.61], [2018, 3.13],
      [2019, 2.72], [2020, 1.68], [2021, 1.87], [2022, 5.51],
      [2023, 2.61], [2024, 1.57],
    ],
  },
  {
    slug: 'pengangguran',
    name: 'Tingkat pengangguran terbuka',
    category: 'Masyarakat',
    unit: '% angkatan kerja',
    latest: 4.76,
    year: 2025,
    source: 'BPS, Survei Angkatan Kerja Nasional (Sakernas)',
    decimals: 2,
    definition:
      'Pangsa angkatan kerja yang tidak bekerja dan sedang mencari pekerjaan. Angka 2025 dari Sakernas Februari; deret 2015–2024 dari Sakernas Agustus.',
    note: 'Angka terbaru Februari 2025; deret tahunan memakai Sakernas Agustus.',
    series: [
      [2015, 6.18], [2016, 5.61], [2017, 5.5], [2018, 5.34],
      [2019, 5.28], [2020, 7.07], [2021, 6.49], [2022, 5.86],
      [2023, 5.32], [2024, 4.91],
    ],
  },
  {
    slug: 'kemiskinan',
    name: 'Tingkat kemiskinan',
    category: 'Masyarakat',
    unit: '% penduduk',
    latest: 8.47,
    year: 2025,
    source: 'BPS, Survei Sosial Ekonomi Nasional (Susenas)',
    decimals: 2,
    definition:
      'Pangsa penduduk dengan pengeluaran per kapita di bawah garis kemiskinan. Deret tahunan memakai angka Maret tiap tahun.',
    note: 'Angka terbaru Maret 2025; deret tahunan memakai angka Maret.',
    series: [
      [2015, 11.22], [2016, 10.86], [2017, 10.64], [2018, 9.82],
      [2019, 9.41], [2020, 9.78], [2021, 10.14], [2022, 9.54],
      [2023, 9.36], [2024, 9.03],
    ],
  },
  {
    slug: 'ipm',
    name: 'Indeks Pembangunan Manusia (IPM)',
    category: 'Masyarakat',
    unit: 'skala 0–100',
    latest: 75.02,
    year: 2024,
    source: 'BPS, Statistik Indeks Pembangunan Manusia',
    decimals: 2,
    definition:
      'Ukuran gabungan harapan hidup, pendidikan, dan standar hidup layak. Di atas 70 masuk kategori tinggi.',
    series: [
      [2015, 69.55], [2016, 70.18], [2017, 70.81], [2018, 71.39],
      [2019, 71.92], [2020, 71.94], [2021, 72.29], [2022, 73.86],
      [2023, 74.39], [2024, 75.02],
    ],
  },
  {
    slug: 'harapan-hidup',
    name: 'Harapan hidup saat lahir',
    category: 'Masyarakat',
    unit: 'tahun',
    latest: 71.8,
    year: 2023,
    source: 'Bank Dunia, World Development Indicators',
    decimals: 1,
    definition:
      'Rata-rata lama hidup yang diharapkan bagi bayi yang lahir pada tahun tersebut, bila pola kematian saat itu tetap.',
    series: [
      [2015, 71.3], [2016, 71.4], [2017, 71.6], [2018, 71.7],
      [2019, 71.7], [2020, 71.3], [2021, 68.9], [2022, 71.5],
      [2023, 71.8],
    ],
  },
  {
    slug: 'ekspor',
    name: 'Nilai ekspor barang',
    category: 'Ekonomi',
    unit: 'miliar US$',
    latest: 264.7,
    year: 2024,
    source: 'BPS, Statistik Perdagangan Luar Negeri',
    decimals: 1,
    definition:
      'Nilai seluruh barang yang diekspor Indonesia dalam satu tahun (f.o.b.).',
    series: [
      [2015, 150.4], [2016, 145.2], [2017, 168.8], [2018, 180.0],
      [2019, 167.7], [2020, 163.2], [2021, 231.6], [2022, 291.9],
      [2023, 258.8], [2024, 264.7],
    ],
  },
  {
    slug: 'impor',
    name: 'Nilai impor barang',
    category: 'Ekonomi',
    unit: 'miliar US$',
    latest: 233.7,
    year: 2024,
    source: 'BPS, Statistik Perdagangan Luar Negeri',
    decimals: 1,
    definition:
      'Nilai seluruh barang yang diimpor Indonesia dalam satu tahun (c.i.f.).',
    series: [
      [2015, 142.7], [2016, 135.7], [2017, 156.9], [2018, 188.7],
      [2019, 171.3], [2020, 141.6], [2021, 196.2], [2022, 237.5],
      [2023, 221.9], [2024, 233.7],
    ],
  },
  {
    slug: 'literasi',
    name: 'Angka melek huruf (usia 15+)',
    category: 'Masyarakat',
    unit: '% penduduk usia 15+',
    latest: 96.0,
    year: 2023,
    source: 'BPS, Survei Sosial Ekonomi Nasional (Susenas)',
    decimals: 1,
    definition:
      'Pangsa penduduk usia 15 tahun ke atas yang dapat membaca dan menulis huruf latin atau huruf lainnya.',
    series: [
      [2015, 95.2], [2016, 95.4], [2017, 95.6], [2018, 95.7],
      [2019, 95.9], [2020, 96.0], [2021, 96.0], [2022, 96.0],
      [2023, 96.0],
    ],
  },
];

// Sepuluh provinsi terpadat, 2024 (BPS). Kepadatan = jiwa per km².
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 50.35, density: 1423, poverty: 7.46, hdi: 74.9 },
  { name: 'Jawa Timur', pop: 41.81, density: 875, poverty: 10.35, hdi: 75.4 },
  { name: 'Jawa Tengah', pop: 37.89, density: 1155, poverty: 10.47, hdi: 73.6 },
  { name: 'Sumatera Utara', pop: 16.13, density: 221, poverty: 8.17, hdi: 75.3 },
  { name: 'Banten', pop: 12.43, density: 1286, poverty: 5.84, hdi: 76.0 },
  { name: 'DKI Jakarta', pop: 10.68, density: 16084, poverty: 4.3, hdi: 82.9 },
  { name: 'Sulawesi Selatan', pop: 9.46, density: 203, poverty: 8.06, hdi: 74.6 },
  { name: 'Lampung', pop: 9.35, density: 270, poverty: 10.69, hdi: 72.8 },
  { name: 'Sumatera Selatan', pop: 9.04, density: 99, poverty: 11.09, hdi: 72.8 },
  { name: 'Riau', pop: 7.05, density: 81, poverty: 6.31, hdi: 75.9 },
];

// Pangsa PDB menurut lapangan usaha, 2024 (BPS, dibulatkan).
export const SECTORS = [
  { name: 'Industri pengolahan', share: 18.7 },
  { name: 'Perdagangan', share: 12.9 },
  { name: 'Pertanian, kehutanan, perikanan', share: 12.5 },
  { name: 'Konstruksi', share: 9.5 },
  { name: 'Pertambangan dan penggalian', share: 8.4 },
  { name: 'Transportasi dan pergudangan', share: 4.6 },
  { name: 'Informasi dan komunikasi', share: 4.4 },
  { name: 'Jasa keuangan dan asuransi', share: 4.3 },
  { name: 'Lapangan usaha lainnya', share: 24.7 },
];

// Fakta singkat untuk kartu di beranda.
export const FACTS = [
  { label: 'Luas daratan', value: '1.904.569 km²', source: 'BPS, 2024' },
  { label: 'Kepadatan penduduk', value: '149 jiwa/km²', source: 'BPS, 2024' },
  { label: 'Rasio gini', value: '0,375', source: 'BPS, Maret 2025' },
  { label: 'Pengguna internet', value: '221,6 juta (79,5%)', source: 'APJII, 2024' },
  { label: 'Rasio elektrifikasi', value: '99,8%', source: 'PLN, 2023' },
  { label: 'Cadangan devisa', value: 'US$155,7 miliar', source: 'Bank Indonesia, akhir 2024' },
  { label: 'Surplus perdagangan', value: 'US$31,0 miliar', source: 'BPS, 2024' },
  { label: 'Usia median', value: '±30 tahun', source: 'PBB, 2024' },
];

// Rilis terbaru yang dikutip situs ini.
export const RELEASES = [
  { date: 'Nov 2025', title: 'Pertumbuhan ekonomi kuartal III-2025: 5,04% (y-on-y)', source: 'BPS' },
  { date: 'Jul 2025', title: 'Tingkat kemiskinan Maret 2025 turun ke 8,47%', source: 'BPS' },
  { date: 'Mei 2025', title: 'Pengangguran Februari 2025: 4,76%', source: 'BPS' },
  { date: 'Feb 2025', title: 'Pertumbuhan ekonomi 2024: 5,03%; PDB US$1.396 triliun', source: 'BPS' },
  { date: 'Jan 2025', title: 'Inflasi Desember 2024: 1,57% (y-on-y)', source: 'BPS' },
  { date: 'Nov 2024', title: 'IPM 2024 naik ke 75,02', source: 'BPS' },
];

export function indicator(slug) {
  return INDICATORS.find((i) => i.slug === slug);
}

export function formatNumber(value, decimals) {
  return value.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
