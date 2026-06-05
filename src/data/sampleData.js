export const HEM = {
  word: "Hẻm",
  ipa: "/hɛm˧˩/",
  type: "Danh từ",
  regions: [
    { k: "bac",   label: "Miền Bắc",  word: "ngõ",  ipa: "/ŋɔ˧˩/",   pop: 9,  ex: "Nhà tớ ở trong ngõ, ô tô không vào được." },
    { k: "trung", label: "Miền Trung", word: "kiệt", ipa: "/kiət˨/",  pop: 22, ex: "Đi vô kiệt nớ chừng năm chục mét là tới." },
    { k: "nam",   label: "Miền Nam",   word: "hẻm",  ipa: "/hɛm˧˩/",  pop: 96, ex: "Nhà tui trong hẻm, chạy xe vô tới cửa luôn." },
  ],
  senses: [
    { text: "Lối đi nhỏ và hẹp len giữa các dãy nhà; nhánh rẽ ra từ đường lớn trong khu dân cư.", note: "Thường chỉ vừa xe máy, đôi khi là hẻm cụt." },
    { text: "(nghĩa rộng) Khu vực dân cư nằm sâu phía trong, xa mặt đường chính.", note: 'Vd: "quán ăn trong hẻm", "cà phê hẻm".' },
  ],
  examples: [
    { region: "Miền Nam",  regionKey: "nam",   text: "“Nhà tui ở trong hẻm 200, chạy xe vô tới cửa luôn.”", gloss: "hẻm — lối nhỏ dẫn vào khu nhà" },
    { region: "Miền Trung", regionKey: "trung", text: "“Đi vô kiệt nớ chừng năm chục mét là tới nhà tau.”", gloss: "kiệt — cách gọi của Huế · Đà Nẵng" },
    { region: "Miền Bắc",  regionKey: "bac",   text: "“Nhà tớ ở trong ngõ, sâu nữa là ngách, ô tô chịu.”", gloss: "ngõ — hẻm; ngách — hẻm nhỏ hơn" },
  ],
  related: ["ngách", "con hẻm", "đường hẻm", "hẻm cụt", "ngõ ngách"],
};

export const NAM_WORDS = [
  { w: "hẻm",  std: "ngõ",    note: "lối đi nhỏ" },
  { w: "ghe",  std: "thuyền", note: "phương tiện sông nước" },
  { w: "té",   std: "ngã",    note: "bị ngã xuống" },
  { w: "mắc",  std: "đắt",   note: "giá cao" },
  { w: "chén", std: "bát",   note: "đồ đựng cơm" },
  { w: "ly",   std: "cốc",   note: "đồ uống nước" },
  { w: "trái", std: "quả",   note: "trái cây" },
  { w: "mền",  std: "chăn",  note: "đắp khi ngủ" },
];

export const BAC_WORDS = [
  { w: "ngõ",    std: "hẻm",    note: "lối đi nhỏ" },
  { w: "giời",   std: "trời",   note: "bầu trời" },
  { w: "bát",    std: "chén",   note: "đồ đựng cơm" },
  { w: "tàu",    std: "ghe",    note: "phương tiện sông nước" },
  { w: "ngô",    std: "bắp",    note: "loại ngũ cốc" },
  { w: "lợn",    std: "heo",    note: "con vật" },
  { w: "quả",    std: "trái",   note: "trái cây" },
  { w: "chăn",   std: "mền",    note: "đắp khi ngủ" },
];

export const TRUNG_WORDS = [
  { w: "kiệt",   std: "hẻm",    note: "lối đi nhỏ" },
  { w: "chộ",    std: "thấy",   note: "nhìn thấy" },
  { w: "mô",     std: "đâu",    note: "chỗ nào" },
  { w: "răng",   std: "sao",    note: "tại sao" },
  { w: "rứa",    std: "vậy",    note: "như vậy" },
  { w: "nớ",     std: "đó",     note: "ở đó" },
  { w: "bọ",     std: "bố",     note: "cha" },
  { w: "ổ",      std: "chỗ",    note: "vị trí" },
];

export const REGION_DATA = {
  nam: {
    label: "Miền Nam",
    eyebrow: "Phương ngữ Nam Bộ",
    regionKey: "nam",
    description: "Giọng nói phóng khoáng, ít phân biệt thanh hỏi – ngã, giàu từ gốc sông nước và giao thoa Hoa – Khmer. Nhiều từ Nam Bộ nay đã lan ra cả nước.",
    stats: [["1.240", "từ đặc trưng"], ["19", "tỉnh · thành"], ["96%", 'dùng "hẻm"']],
    words: NAM_WORDS,
    mapRegions: [
      { k: "bac",   label: "Miền Bắc",  word: "ngõ",  ipa: "", pop: 13 },
      { k: "trung", label: "Miền Trung", word: "kiệt", ipa: "", pop: 16 },
      { k: "nam",   label: "Miền Nam",   word: "hẻm",  ipa: "", pop: 94 },
    ],
  },
  bac: {
    label: "Miền Bắc",
    eyebrow: "Phương ngữ Bắc Bộ",
    regionKey: "bac",
    description: "Giọng chuẩn mực của tiếng Việt toàn dân, phân biệt đầy đủ sáu thanh điệu, giàu từ Hán Việt và cấu trúc ngữ pháp truyền thống.",
    stats: [["1.180", "từ đặc trưng"], ["25", "tỉnh · thành"], ["89%", 'dùng "ngõ"']],
    words: BAC_WORDS,
    mapRegions: [
      { k: "bac",   label: "Miền Bắc",  word: "ngõ",  ipa: "", pop: 89 },
      { k: "trung", label: "Miền Trung", word: "kiệt", ipa: "", pop: 22 },
      { k: "nam",   label: "Miền Nam",   word: "hẻm",  ipa: "", pop: 96 },
    ],
  },
  trung: {
    label: "Miền Trung",
    eyebrow: "Phương ngữ Trung Bộ",
    regionKey: "trung",
    description: "Giọng đặc sắc, giữ nhiều nét cổ của tiếng Việt, thanh điệu phong phú và từ vựng độc đáo phản ánh văn hóa duyên hải miền Trung.",
    stats: [["980", "từ đặc trưng"], ["14", "tỉnh · thành"], ["78%", 'dùng "kiệt"']],
    words: TRUNG_WORDS,
    mapRegions: [
      { k: "bac",   label: "Miền Bắc",  word: "ngõ",  ipa: "", pop: 9 },
      { k: "trung", label: "Miền Trung", word: "kiệt", ipa: "", pop: 78 },
      { k: "nam",   label: "Miền Nam",   word: "hẻm",  ipa: "", pop: 22 },
    ],
  },
};

export const POP_WORDS = ["hẻm", "té", "mè", "thơm", "bao đậu", "chộ"];

export const RECENT_CONTRIBUTIONS = [
  { word: "chộ",    region: "Trung", k: "trung" },
  { word: "bao đậu", region: "Nam",  k: "nam" },
  { word: "giời",   region: "Bắc",  k: "bac" },
];
