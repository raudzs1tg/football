export type ProductCategory = 'kits' | 'balls' | 'boots' | 'gloves';
export type PitchSurface = 'FG' | 'SG-Pro' | 'AG' | 'All-Weather';

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface ProductColorway3D {
  presetId?: string;
  swatchHex: string;
  secondaryHex: string;
  primaryColor: number;
  secondaryColor: number;
  accentColor: number;
  trimColor: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  weightGrams: number;
  surface: PitchSurface;
  surfaceLabel: string;
  statusTag?: string;
  externalUrl?: string;
  colorway3D: ProductColorway3D;
  image: string;
  description: string;
  craftsmanshipNote: string;
  sizes: {
    eu: string;
    uk: string;
    us: string;
    cm: string;
  }[];
  variants: {
    code: PitchSurface;
    name: string;
    studInfo: string;
  }[];
  specs: TechnicalSpec[];
  customizable: {
    allowName: boolean;
    allowNumber: boolean;
    maxNameLength: number;
    fee: number;
    label: string;
  };
}

export interface CategoryChapter {
  id: ProductCategory;
  index: string;
  titleVi: string;
  titleEn: string;
  kicker: string;
  headline: string;
  summary: string;
  accentHex: string;
  modelSpecLabel: string;
  explodeLabel: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export const CATEGORY_CHAPTERS: CategoryChapter[] = [
  {
    id: 'kits',
    index: '01',
    titleVi: 'Áo Đấu CLB',
    titleEn: 'Club Match Kits (12)',
    kicker: '01. Áo Đấu Các Câu Lạc Bộ · 12 Mẫu Authentic & Replica',
    headline: 'Climacool+, AEROREADY & 28-Gauge Jacquard Knit.',
    summary:
      'Bộ sưu tập 12 mẫu áo thi đấu CLB hàng đầu châu Âu và V.League (Manchester United, Bayern Munich, Real Madrid, Barcelona, Arsenal, AC Milan, PSG, Man City, CAHN, SLNA). Tối ưu thoát ẩm, trọng lượng siêu nhẹ và cổ áo dệt gân cao cấp.',
    accentHex: '#be123c',
    modelSpecLabel: '3D Jersey Macro Matrix · Jacquard Knit + Embroidered Crest',
    explodeLabel: 'Bóc Tách 4 Lớp Áo Đấu',
    metrics: [
      { label: 'Số Lượng Mẫu', value: '12 CLB' },
      { label: 'Trọng Lượng Chuẩn', value: '132–158 g' },
      { label: 'Thoát Ẩm Nhiệt', value: 'Climacool+ / Aero' },
    ],
  },
  {
    id: 'balls',
    index: '02',
    titleVi: 'Quả Bóng Đá',
    titleEn: 'Match Balls (11)',
    kicker: '02. Quả Bóng Đá · 11 Mẫu World Cup, UCL & V.League',
    headline: 'FIFA Quality Pro Thermal Fusion & Aero-Groove.',
    summary:
      'Quy tụ 11 mẫu bóng thi đấu và tập luyện đỉnh cao: từ adidas FIFA World Cup 2026 Trionda Pro, bóng vòng bảng UEFA Champions League 25/26, Molten F5N3555 đến Động Lực UHV 2.05/2.03, Kamito và Thái Sơn Nam.',
    accentHex: '#e11d48',
    modelSpecLabel: '3D Geodesic Aero-Core · Carbon-Latex Bladder + 20 Panels',
    explodeLabel: 'Bung Tỏa Vỏ & Ruột Bóng',
    metrics: [
      { label: 'Số Lượng Mẫu', value: '11 Mẫu' },
      { label: 'Trọng Lượng FIFA', value: '420–445 g' },
      { label: 'Độ Chống Thấm', value: '0.0% Ép Nhiệt' },
    ],
  },
  {
    id: 'boots',
    index: '03',
    titleVi: 'Giày Đá Bóng',
    titleEn: 'Pitch Boots (15)',
    kicker: '03. Giày Đá Bóng · 15 Mẫu FG, AG & Sân Nhân Tạo TF',
    headline: 'HybridTouch, NikeSkin, Carbon Chassis & Đế TF Chuyên Dụng.',
    summary:
      'Đầy đủ 15 mẫu giày đá bóng từ phân khúc Elite/Academy quốc tế (adidas Predator Accuracy.1, Copa Pure.2, X Crazyfast, Nike Phantom GX, Mercurial Vapor, Tiempo 10, Puma Future/Ultra, Mizuno Morelia) đến các dòng giày chuyên sân cỏ nhân tạo Việt Nam (Kamito TA11 Pro, Jogarbola, Zocker, Wika, Akka, Mitre).',
    accentHex: '#f43f5e',
    modelSpecLabel: '3D Last & Biaxial Chassis · Carbon Soleplate + Traction Studs',
    explodeLabel: 'Tách Đế Carbon & Khung Gót',
    metrics: [
      { label: 'Số Lượng Mẫu', value: '15 Mẫu' },
      { label: 'Trọng Lượng Siêu Nhẹ', value: '175–238 g' },
      { label: 'Mặt Sân Hỗ Trợ', value: 'FG · AG · TF' },
    ],
  },
  {
    id: 'gloves',
    index: '04',
    titleVi: 'Găng Thủ Môn',
    titleEn: 'GK Gloves (12)',
    kicker: '04. Găng Tay Thủ Môn · 12 Mẫu Mút Đức & Xương Bảo Vệ',
    headline: '4.0 mm Contact Latex, Soft Grip Pro & Finger Ortho-Spines.',
    summary:
      'Tuyển tập 12 mẫu găng tay thủ môn chuyên nghiệp và phong trào: BKeeper Professional, adidas Predator GL Pro & Training, Nike Phantom Elite, Puma One Protect, Keepex, Hwan Sport, Zocker Keep, Grand Sport, Aglas Pro, Daiwoos và Just Keep.',
    accentHex: '#fb7185',
    modelSpecLabel: '3D Negative-Cut Anatomy · 4mm Latex Palm + 5 Ortho-Spines',
    explodeLabel: 'Tách Xương Trợ Lực & Mút Latex',
    metrics: [
      { label: 'Số Lượng Mẫu', value: '12 Mẫu' },
      { label: 'Độ Dày Mút', value: '3.5–4.5 mm' },
      { label: 'Bảo Vệ Khớp Ngón', value: 'Ortho-Spine 5 Ngón' },
    ],
  },
];

export const HERO_IMAGE = '/src/assets/images/hero_pitch_boot_1794307152243.jpg';

const KIT_SIZES = [
  { eu: 'S', uk: '36"', us: 'S', cm: '92–96' },
  { eu: 'M', uk: '39"', us: 'M', cm: '97–102' },
  { eu: 'L', uk: '42"', us: 'L', cm: '103–108' },
  { eu: 'XL', uk: '45"', us: 'XL', cm: '109–115' },
  { eu: 'XXL', uk: '48"', us: 'XXL', cm: '116–122' },
];

const BOOT_SIZES = [
  { eu: '39', uk: '6.0', us: '7.0', cm: '24.5' },
  { eu: '40', uk: '6.5', us: '7.5', cm: '25.0' },
  { eu: '41', uk: '7.5', us: '8.5', cm: '26.0' },
  { eu: '42', uk: '8.0', us: '9.0', cm: '26.5' },
  { eu: '42.5', uk: '8.5', us: '9.5', cm: '27.0' },
  { eu: '43', uk: '9.0', us: '10.0', cm: '27.5' },
  { eu: '44', uk: '9.5', us: '10.5', cm: '28.0' },
];

const BALL_SIZES = [
  { eu: 'Size 5', uk: 'Size 5', us: 'Size 5', cm: '68.5–69.5' },
  { eu: 'Size 4', uk: 'Size 4', us: 'Size 4', cm: '63.5–66.0' },
];

const GLOVE_SIZES = [
  { eu: '8.0', uk: '8.0', us: '8.0', cm: '19.5' },
  { eu: '8.5', uk: '8.5', us: '8.5', cm: '20.5' },
  { eu: '9.0', uk: '9.0', us: '9.0', cm: '21.5' },
  { eu: '9.5', uk: '9.5', us: '9.5', cm: '22.5' },
  { eu: '10.0', uk: '10.0', us: '10.0', cm: '23.5' },
];

function createKitProduct(cfg: {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  price: number;
  weightGrams: number;
  surfaceLabel: string;
  statusTag: string;
  externalUrl?: string;
  colorway3D: ProductColorway3D;
  fabricSpec: string;
  collarSpec: string;
}): Product {
  return {
    id: cfg.id,
    sku: cfg.sku,
    name: cfg.name,
    subtitle: cfg.subtitle,
    category: 'kits',
    categoryLabel: 'Áo Đấu · Club Kits',
    price: cfg.price,
    weightGrams: cfg.weightGrams,
    surface: 'All-Weather',
    surfaceLabel: cfg.surfaceLabel,
    statusTag: cfg.statusTag,
    externalUrl: cfg.externalUrl,
    colorway3D: cfg.colorway3D,
    image: '/src/assets/images/product_match_jersey_1794307153903.jpg',
    description: `${cfg.subtitle} Cấu trúc vải dệt kim thoáng khí đa vùng kết hợp đường may phẳng chống ma sát, tối ưu cho cường độ vận động 90 phút trên sân.`,
    craftsmanshipNote: `Hoàn thiện với cổ áo ${cfg.collarSpec}, huy hiệu câu lạc bộ sắc nét và nhãn thông số ép nhiệt bên trong cổ áo.`,
    sizes: KIT_SIZES,
    variants: [
      {
        code: 'All-Weather',
        name: 'Player-Issue Authentic Cut',
        studInfo: 'Phom ôm sát khí động học chuẩn cầu thủ thi đấu',
      },
      {
        code: 'FG',
        name: 'Stadium Replica Regular Fit',
        studInfo: 'Phom suông thoải mái khi vận động và mặc hàng ngày',
      },
    ],
    specs: [
      { label: 'Trọng Lượng Áo (Size M)', value: `${cfg.weightGrams} g` },
      { label: 'Công Nghệ Vải', value: cfg.fabricSpec },
      { label: 'Thiết Kế Cổ Áo', value: cfg.collarSpec },
      { label: 'Độ Thoáng Khí', value: '410 mm/s (ISO 9237)' },
    ],
    customizable: {
      allowName: true,
      allowNumber: true,
      maxNameLength: 12,
      fee: 18,
      label: 'In Tên & Số Áo Chuẩn Font Giải Đấu',
    },
  };
}

function createBootProduct(cfg: {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  price: number;
  weightGrams: number;
  surface: PitchSurface;
  surfaceLabel: string;
  statusTag: string;
  externalUrl?: string;
  colorway3D: ProductColorway3D;
  upperSpec: string;
  outsoleSpec: string;
  image?: string;
}): Product {
  return {
    id: cfg.id,
    sku: cfg.sku,
    name: cfg.name,
    subtitle: cfg.subtitle,
    category: 'boots',
    categoryLabel: 'Giày · Pitch Boots',
    price: cfg.price,
    weightGrams: cfg.weightGrams,
    surface: cfg.surface,
    surfaceLabel: cfg.surfaceLabel,
    statusTag: cfg.statusTag,
    externalUrl: cfg.externalUrl,
    colorway3D: cfg.colorway3D,
    image: cfg.image || '/src/assets/images/product_carbon_boot_1794307152493.jpg',
    description: `${cfg.subtitle} Thiết kế phom giày ôm khít mu bàn chân, truyền lực trực tiếp xuống mặt sân và hỗ trợ bứt tốc, xoay trở ở cường độ cao.`,
    craftsmanshipNote: `Thân giày ${cfg.upperSpec} kết hợp hệ thống đế ${cfg.outsoleSpec} giúp tối ưu độ bám và bảo vệ khớp cổ chân.`,
    sizes: BOOT_SIZES,
    variants: [
      {
        code: cfg.surface,
        name: cfg.surfaceLabel,
        studInfo: cfg.outsoleSpec,
      },
      {
        code: 'FG',
        name: 'Firm Ground (FG)',
        studInfo: 'Đinh cánh bứt tốc chuyên dụng cho mặt sân cỏ tự nhiên tiêu chuẩn',
      },
      {
        code: 'AG',
        name: 'Artificial Turf (AG/TF)',
        studInfo: 'Đinh trụ/dăm cao su phân bổ đều lực giảm áp lực lên khớp gối',
      },
    ],
    specs: [
      { label: 'Trọng Lượng Chiếc (Size 42)', value: `${cfg.weightGrams} g` },
      { label: 'Chất Liệu Upper', value: cfg.upperSpec },
      { label: 'Cấu Trúc Đế & Đinh', value: cfg.outsoleSpec },
      { label: 'Mặt Sân Tối Ưu', value: cfg.surfaceLabel },
    ],
    customizable: {
      allowName: true,
      allowNumber: true,
      maxNameLength: 8,
      fee: 15,
      label: 'Khắc Laser Tên & Số Lên Gót Giày',
    },
  };
}

function createBallProduct(cfg: {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  price: number;
  weightGrams: number;
  surface: PitchSurface;
  surfaceLabel: string;
  statusTag: string;
  externalUrl?: string;
  colorway3D: ProductColorway3D;
  shellSpec: string;
  bladderSpec: string;
}): Product {
  return {
    id: cfg.id,
    sku: cfg.sku,
    name: cfg.name,
    subtitle: cfg.subtitle,
    category: 'balls',
    categoryLabel: 'Bóng · Match Balls',
    price: cfg.price,
    weightGrams: cfg.weightGrams,
    surface: cfg.surface,
    surfaceLabel: cfg.surfaceLabel,
    statusTag: cfg.statusTag,
    externalUrl: cfg.externalUrl,
    colorway3D: cfg.colorway3D,
    image: '/src/assets/images/product_match_ball_1794307155925.jpg',
    description: `${cfg.subtitle} Quỹ đạo bay ổn định nhờ bề mặt khí động học và cấu trúc ruột bóng giữ áp suất chuẩn xác suốt trận đấu.`,
    craftsmanshipNote: `Vỏ ngoài ${cfg.shellSpec} kết hợp ruột bóng ${cfg.bladderSpec} hạn chế tối đa ngấm nước mưa.`,
    sizes: BALL_SIZES,
    variants: [
      {
        code: cfg.surface,
        name: cfg.surfaceLabel,
        studInfo: cfg.shellSpec,
      },
      {
        code: 'SG-Pro',
        name: 'Floodlight Hi-Vis Spec',
        studInfo: 'Phối màu tương phản cao giúp dễ quan sát dưới ánh đèn sân buổi tối',
      },
    ],
    specs: [
      { label: 'Trọng Lượng Tiêu Chuẩn', value: `${cfg.weightGrams} g` },
      { label: 'Cấu Trúc Vỏ Ngoài', value: cfg.shellSpec },
      { label: 'Ruột Bóng & Van', value: cfg.bladderSpec },
      { label: 'Tiêu Chuẩn Kiểm Định', value: cfg.surfaceLabel },
    ],
    customizable: {
      allowName: true,
      allowNumber: false,
      maxNameLength: 10,
      fee: 10,
      label: 'In Tên Đội Bóng / CLB Lên Tấm Vỏ',
    },
  };
}

function createGloveProduct(cfg: {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  price: number;
  weightGrams: number;
  surface: PitchSurface;
  surfaceLabel: string;
  statusTag: string;
  externalUrl?: string;
  colorway3D: ProductColorway3D;
  palmSpec: string;
  cutSpec: string;
}): Product {
  return {
    id: cfg.id,
    sku: cfg.sku,
    name: cfg.name,
    subtitle: cfg.subtitle,
    category: 'gloves',
    categoryLabel: 'Găng · GK Gloves',
    price: cfg.price,
    weightGrams: cfg.weightGrams,
    surface: cfg.surface,
    surfaceLabel: cfg.surfaceLabel,
    statusTag: cfg.statusTag,
    externalUrl: cfg.externalUrl,
    colorway3D: cfg.colorway3D,
    image: '/src/assets/images/product_gk_gloves_1794307156833.jpg',
    description: `${cfg.subtitle} Thiết kế tối ưu diện tích tiếp xúc bóng, hấp thụ xung lực từ các cú sút xa uy lực và bảo vệ an toàn cho khớp ngón tay thủ môn.`,
    craftsmanshipNote: `Lòng bàn tay ${cfg.palmSpec} kết hợp kiểu cắt ${cfg.cutSpec} và đai cổ tay cố định chắc chắn.`,
    sizes: GLOVE_SIZES,
    variants: [
      {
        code: cfg.surface,
        name: cfg.cutSpec,
        studInfo: cfg.palmSpec,
      },
      {
        code: 'SG-Pro',
        name: 'Ortho-Spine Finger Protection',
        studInfo: 'Tích hợp khung xương chống lật ngón tay khi cản phá cận thành',
      },
    ],
    specs: [
      { label: 'Trọng Lượng Đôi (Size 9)', value: `${cfg.weightGrams} g` },
      { label: 'Mút Lòng Bàn Tay', value: cfg.palmSpec },
      { label: 'Kiểu Cắt & Bảo Vệ', value: cfg.cutSpec },
      { label: 'Điều Kiện Thi Đấu', value: cfg.surfaceLabel },
    ],
    customizable: {
      allowName: true,
      allowNumber: true,
      maxNameLength: 8,
      fee: 12,
      label: 'In Tên & Số Áo Thủ Môn Lên Đai Cổ Tay',
    },
  };
}

export const PRODUCTS: Product[] = [
  // ==========================================================================
  // 01. ÁO ĐẤU CÁC CÂU LẠC BỘ (12 MẪU — KITS)
  // ==========================================================================
  createKitProduct({
    id: 'mu-home-auth-26-27',
    sku: 'AD-MU-26A',
    name: 'Áo Đá Bóng Nam adidas Sân Nhà Manchester United Fc Authentic 26/27',
    subtitle: 'Công nghệ Climacool+ và thiết kế cổ polo cổ điển.',
    price: 150,
    weightGrams: 138,
    surfaceLabel: 'Climacool+ Authentic',
    statusTag: 'MU 26/27 Authentic',
    externalUrl:
      'https://google.com/search?q=%C3%81o+%C4%90%C3%A1+B%C3%B3ng+Nam+adidas+S%C3%A2n+Nh%C3%A0+Manchester+United+Fc+Authentic+26/27&prds=catalogid%3A13486702562442730162%2Cgpcid%3A5248241635722708592%2CheadlineOfferDocid%3A10956725073487427%2Cmid%3A576462916009056309%2Cproductid%3A17691734638607566889%2Cpvo%3A38%2Cpvt%3Aa%2Crds%3APC_5248241635722708592%7CPROD_PC_5248241635722708592&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_Hgw8eQEsG-Vw5AVB3Jt3SH1CGQ-0aLASgML8HuLiRHnVExIFN5Zwgg',
    colorway3D: {
      swatchHex: '#c8102e',
      secondaryHex: '#ffffff',
      primaryColor: 0xc8102e,
      secondaryColor: 0xffffff,
      accentColor: 0xfbbf24,
      trimColor: 0x141413,
    },
    fabricSpec: 'Climacool+ Body-Mapped Jacquard',
    collarSpec: 'Cổ Polo Dệt Gân Cổ Điển Viền Đen-Trắng',
  }),
  createKitProduct({
    id: 'mu-home-rep-26-27',
    sku: 'AD-MU-26R',
    name: 'Áo Đá Bóng Nam adidas Sân Nhà Manchester United Fc 26/27 Replica',
    subtitle: 'Chất liệu dệt tricot bền đẹp và thoải mái khi vận động.',
    price: 98,
    weightGrams: 154,
    surfaceLabel: 'Tricot Mesh Replica',
    statusTag: 'MU 26/27 Replica',
    externalUrl:
      'https://google.com/search?q=%C3%81o+%C4%90%C3%A1+B%C3%B3ng+Nam+adidas+S%C3%A2n+Nh%C3%A0+Manchester+United+Fc+26/27+Replica&prds=catalogid%3A2543422536057274416%2Cgpcid%3A4522129894176620133%2CheadlineOfferDocid%3A15589301392120406540%2Cmid%3A576462557396376456%2Cproductid%3A9075121652782455897%2Cpvo%3A38%2Cpvt%3Aa%2Crds%3APC_4522129894176620133%7CPROD_PC_4522129894176620133&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_HgzWAwHK9UV8XP2htGfMFUZ9rKhj8v0wZ6IcdElAVacOS9JuwY07kA',
    colorway3D: {
      swatchHex: '#dc2626',
      secondaryHex: '#fafaf9',
      primaryColor: 0xdc2626,
      secondaryColor: 0xfafaf9,
      accentColor: 0xf59e0b,
      trimColor: 0xffffff,
    },
    fabricSpec: '100% Recycled Polyester Tricot',
    collarSpec: 'Cổ Gân Thoải Mái Phom Regular Fit',
  }),
  createKitProduct({
    id: 'mu-home-auth-25-26',
    sku: 'AD-MU-25A',
    name: 'Nam adidas Áo Đấu Sân Nhà Manchester United 25/26 Phiên Bản Authentic',
    subtitle: 'Dáng slim fit tối ưu hiệu suất thi đấu.',
    price: 145,
    weightGrams: 136,
    surfaceLabel: 'HEAT.RDY Slim Fit',
    statusTag: 'MU 25/26 Slim Fit',
    externalUrl:
      'https://google.com/search?q=Nam+adidas+%C3%81o+%C4%90%E1%BA%A5u+S%C3%A2n+Nh%C3%A0+Manchester+United+25/26+Phi%C3%AAn+B%E1%BA%A3n+Authentic&prds=catalogid%3A5188247719680217696%2Cgpcid%3A5492755314054941909%2CheadlineOfferDocid%3A235598856619553901%2Cmid%3A576462567548179290%2Cproductid%3A4718595861188185009%2Cpvo%3A38%2Cpvt%3Aa%2Crds%3APC_5492755314054941909%7CPROD_PC_5492755314054941909&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_Hgxl8NYqoQ_rPiQjns5r5-tjEvzuSLASkY6AtTiOZXFWEdJPietzmQ',
    colorway3D: {
      swatchHex: '#b91c1c',
      secondaryHex: '#171717',
      primaryColor: 0xb91c1c,
      secondaryColor: 0x171717,
      accentColor: 0xfacc15,
      trimColor: 0xffffff,
    },
    fabricSpec: 'HEAT.RDY Ultra-Light Micro-Mesh',
    collarSpec: 'Cổ Tròn Khí Động Học Ép Nhiệt',
  }),
  createKitProduct({
    id: 'cahn-25-26-beige',
    sku: 'JG-CAHN-26B',
    name: 'Áo thi đấu CLB CAHN 2025/2026 (Beige)',
    subtitle: 'Gam màu cát sa mạc độc bản từ thương hiệu Jogarbola.',
    price: 45,
    weightGrams: 145,
    surfaceLabel: 'Jogarbola V.League Pro',
    statusTag: 'CLB CAHN Beige',
    externalUrl:
      'https://google.com/search?q=%C3%81o+thi+%C4%91%E1%BA%A5u+CLB+CAHN+2025/2026+(Beige)&prds=headlineOfferDocid%3A9252162404760369853%2Cproductid%3A9252162404760369853%2Cpvo%3A38%2Cpvt%3Ahg&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_Hgxl1trDaapZq_4WlySx-wx5xrdgVz_83BRBCj8ZPgb1jsfXV0jykg',
    colorway3D: {
      swatchHex: '#dfd3c3',
      secondaryHex: '#991b1b',
      primaryColor: 0xdfd3c3,
      secondaryColor: 0x991b1b,
      accentColor: 0xd4af37,
      trimColor: 0x7f1d1d,
    },
    fabricSpec: 'Jogarbola Hydro-Dry Jacquard',
    collarSpec: 'Cổ V Dệt Kim Phối Đỏ Đô & Vàng Kim',
  }),
  createKitProduct({
    id: 'slna-25-26-home',
    sku: 'SLNA-25H',
    name: 'Áo thi đấu Bóng Đá CLB SLNA 2025/2026',
    subtitle: 'Chất liệu 95% poly kết hợp 5% spandex co giãn và thấm hút tốt.',
    price: 38,
    weightGrams: 148,
    surfaceLabel: '95% Poly · 5% Spandex',
    statusTag: 'CLB SLNA 25/26',
    externalUrl:
      'https://google.com/search?q=%C3%81o+thi+%C4%91%E1%BA%A5u+B%C3%B3ng+%C4%90%C3%A1+CLB+SLNA+2025/2026&prds=headlineOfferDocid%3A5286960354351888029%2Cproductid%3A5286960354351888029%2Cpvo%3A38%2Cpvt%3Ahg&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_HgxvoNQScpa9ZGZ2TZaHij2pZ2M0FGIcE32lQmxdvILzFgsQRoZV1g',
    colorway3D: {
      swatchHex: '#facc15',
      secondaryHex: '#1d4ed8',
      primaryColor: 0xfacc15,
      secondaryColor: 0x1d4ed8,
      accentColor: 0x1e40af,
      trimColor: 0x1e3a8a,
    },
    fabricSpec: '95% Polyester + 5% Spandex 4-Way Stretch',
    collarSpec: 'Cổ Tim Viền Xanh Truyền Thống Xứ Nghệ',
  }),
  createKitProduct({
    id: 'mancity-2026-mint',
    sku: 'MC-26-MINT',
    name: 'Bộ Áo Đấu CLB 2026 Man-city Xanh Lý',
    subtitle: 'Vải thoáng khí hỗ trợ tập luyện thể thao.',
    price: 58,
    weightGrams: 140,
    surfaceLabel: 'Breathable Aero-Knit',
    statusTag: 'Man City Xanh Lý',
    externalUrl:
      'https://google.com/search?q=B%E1%BB%99+%C3%81o+%C4%90%E1%BA%A5u+CLB+2026+Qu%E1%BA%A7n+%C3%81o+B%C3%B3ng+%C4%90%C3%A1+Nam-city+M%C3%A0u+Xanh+L%C3%BD+M%E1%BB%9Bi+Nh%E1%BA%A5t+D%C3%A0nh+Cho+Nam+N%E1%BB%AF&prds=catalogid%3A4004166935872970894%2Cgpcid%3A10960726526059746763%2CheadlineOfferDocid%3A819781441657628853%2Cmid%3A576462915362723475%2Cproductid%3A12627539246977850624%2Cpvo%3A38%2Cpvt%3Ahg&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_Hgwml2XhDfRyUi4Pznr6fWNBtX56rhlmjCQPmq8dLrORAHaTe5vagw',
    colorway3D: {
      swatchHex: '#6ee7b7',
      secondaryHex: '#0284c7',
      primaryColor: 0x6ee7b7,
      secondaryColor: 0x0284c7,
      accentColor: 0x0f172a,
      trimColor: 0x0f172a,
    },
    fabricSpec: 'DryCELL Breathable Honeycomb Mesh',
    collarSpec: 'Cổ Tròn Phối Xanh Lý & Xanh Navy',
  }),
  createKitProduct({
    id: 'real-madrid-home-new',
    sku: 'AD-RM-26H',
    name: 'Áo đấu Real Madrid sân nhà mùa giải mới',
    subtitle: 'Họa tiết ép nhiệt hiện đại cùng công nghệ AEROREADY.',
    price: 135,
    weightGrams: 139,
    surfaceLabel: 'adidas AEROREADY',
    statusTag: 'Real Madrid Home',
    colorway3D: {
      presetId: 'dfb-heimtrikot-white',
      swatchHex: '#f8fafc',
      secondaryHex: '#d4af37',
      primaryColor: 0xf8fafc,
      secondaryColor: 0x1e293b,
      accentColor: 0xd4af37,
      trimColor: 0x0f172a,
    },
    fabricSpec: 'AEROREADY Houndstooth Embossed Jacquard',
    collarSpec: 'Cổ V Trắng Hoàng Gia Viền Đen & Vàng',
  }),
  createKitProduct({
    id: 'barcelona-away-kit',
    sku: 'NK-FCB-26A',
    name: 'Áo đấu Barcelona sân khách',
    subtitle: 'Phối màu phá cách mang đậm dấu ấn lịch sử đội bóng.',
    price: 130,
    weightGrams: 141,
    surfaceLabel: 'Dri-FIT ADV Spec',
    statusTag: 'Barcelona Away',
    colorway3D: {
      swatchHex: '#18181b',
      secondaryHex: '#be123c',
      primaryColor: 0x18181b,
      secondaryColor: 0xbe123c,
      accentColor: 0x1d4ed8,
      trimColor: 0xfbbf24,
    },
    fabricSpec: 'Engineered Dri-FIT Micro-Vent',
    collarSpec: 'Cổ Dệt Phối Hai Tông Màu Blaugrana Đỏ-Xanh',
  }),
  createKitProduct({
    id: 'arsenal-home-kit',
    sku: 'AD-ARS-26H',
    name: 'Áo đấu Arsenal sân nhà',
    subtitle: 'Sắc đỏ trắng truyền thống kết hợp logo thêu sắc nét.',
    price: 125,
    weightGrams: 142,
    surfaceLabel: 'North London Heritage',
    statusTag: 'Arsenal Home',
    colorway3D: {
      swatchHex: '#dc2626',
      secondaryHex: '#ffffff',
      primaryColor: 0xdc2626,
      secondaryColor: 0xffffff,
      accentColor: 0x1e3a8a,
      trimColor: 0xffffff,
    },
    fabricSpec: '28-Gauge Circular Knit + Mesh Side Panels',
    collarSpec: 'Cổ Tròn Phối Tay Áo Raglan Trắng Tinh Khôi',
  }),
  createKitProduct({
    id: 'ac-milan-home-kit',
    sku: 'PM-ACM-26H',
    name: 'Áo đấu AC Milan sân nhà',
    subtitle: 'Sọc đỏ đen đặc trưng với chất vải siêu nhẹ.',
    price: 125,
    weightGrams: 132,
    surfaceLabel: 'Rossoneri UltraWeave',
    statusTag: 'AC Milan Rossoneri',
    colorway3D: {
      swatchHex: '#b91c1c',
      secondaryHex: '#09090b',
      primaryColor: 0xb91c1c,
      secondaryColor: 0x09090b,
      accentColor: 0xfacc15,
      trimColor: 0xffffff,
    },
    fabricSpec: 'UltraWeave 4-Way Stretch Sọc Đỏ Đen',
    collarSpec: 'Cổ Tròn Đen Viền Trắng San Siro',
  }),
  createKitProduct({
    id: 'bayern-munich-home-kit',
    sku: 'AD-FCB-26H',
    name: 'Áo đấu Bayern Munich sân nhà',
    subtitle: 'Tông màu đỏ chủ đạo ôm gọn cơ thể.',
    price: 140,
    weightGrams: 142,
    surfaceLabel: 'Mia San Mia Authentic',
    statusTag: 'FC Bayern 5 Sterne',
    colorway3D: {
      presetId: 'fcb-crimson-gold',
      swatchHex: '#c8102e',
      secondaryHex: '#d4af37',
      primaryColor: 0xc8102e,
      secondaryColor: 0xfafaf9,
      accentColor: 0xd4af37,
      trimColor: 0xffffff,
    },
    fabricSpec: 'Checkered Vertical Stripe Jacquard Knit',
    collarSpec: 'Cổ V Trắng Viền Vàng Kim & Nhãn Size Nhiệt',
  }),
  createKitProduct({
    id: 'psg-home-kit',
    sku: 'NK-PSG-26H',
    name: 'Áo đấu PSG sân nhà',
    subtitle: 'Thiết kế dải sọc giữa ngực hiện đại và cá tính.',
    price: 135,
    weightGrams: 139,
    surfaceLabel: 'Hechter Stripe Edition',
    statusTag: 'PSG Paris Home',
    colorway3D: {
      swatchHex: '#0f172a',
      secondaryHex: '#e11d48',
      primaryColor: 0x0f172a,
      secondaryColor: 0xffffff,
      accentColor: 0xe11d48,
      trimColor: 0xffffff,
    },
    fabricSpec: 'Aero-Mesh Navy Knit + Center Hechter Stripe',
    collarSpec: 'Cổ V Xanh Midnight Navy Phối Đỏ-Trắng',
  }),

  // ==========================================================================
  // 02. GIÀY ĐÁ BÓNG (15 MẪU — BOOTS)
  // ==========================================================================
  createBootProduct({
    id: 'adidas-predator-accuracy-1-l',
    sku: 'AD-PRED-A1L',
    name: 'Giày đá Bóng Nam adidas Predator Accuracy.1 L',
    subtitle: 'Bề mặt HybridTouch giúp kiểm soát xoáy bóng tối ưu.',
    price: 245,
    weightGrams: 208,
    surface: 'FG',
    surfaceLabel: 'Firm Ground (FG)',
    statusTag: 'HybridTouch Spin',
    externalUrl:
      'https://google.com/search?q=Gi%C3%A0y+%C4%91%C3%A1+B%C3%B3ng+Nam+adidas+Predator+Accuracy.1+L&prds=catalogid%3A12800537152216233501%2Cgpcid%3A16512507151642370293%2CheadlineOfferDocid%3A9496163181191477849%2Cmid%3A576462568167820335%2Cproductid%3A2622079079747061114%2Cpvo%3A38%2Cpvt%3Aa%2Crds%3APC_16512507151642370293%7CPROD_PC_16512507151642370293&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_Hgzgieg9H67a6s-6AgJ9NS4_CbXBvM6lfHmj4Kw1UoZy7hnwKURiSw',
    colorway3D: {
      swatchHex: '#18181b',
      secondaryHex: '#e11d48',
      primaryColor: 0x18181b,
      secondaryColor: 0xe11d48,
      accentColor: 0xffffff,
      trimColor: 0xe11d48,
    },
    upperSpec: 'HybridTouch Forefoot + High-Definition Grip Rubber Elements',
    outsoleSpec: 'FacetFrame Split-Tooling + Power Facet Forefoot Weight',
  }),
  createBootProduct({
    id: 'nike-phantom-gx-academy',
    sku: 'NK-PHGX-AC',
    name: 'Giày Bóng Nam đá Nike Phantom Gx Academy',
    subtitle: 'Vùng tiếp xúc NikeSkin hỗ trợ rê bóng và đổi hướng linh hoạt.',
    price: 115,
    weightGrams: 198,
    surface: 'FG',
    surfaceLabel: 'FG/MG Multi-Ground',
    statusTag: 'NikeSkin Touch',
    externalUrl:
      'https://google.com/search?q=Gi%C3%A0y+B%C3%B3ng+Nam+%C4%91%C3%A1+Nike+Phantom+Gx+Academy&prds=catalogid%3A2050813662722371054%2Cgpcid%3A7919671655577340050%2CheadlineOfferDocid%3A16541480992162101116%2Cmid%3A576462477098492664%2Cproductid%3A7429280112015723484%2Cpvo%3A38%2Cpvt%3Aa%2Crds%3APC_7919671655577340050%7CPROD_PC_7919671655577340050&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_Hgw060NfzqDhDb_dbTi1OBPIIgwinERHeeZAGfe2xrwxMdFfdj1zMQ',
    colorway3D: {
      swatchHex: '#0284c7',
      secondaryHex: '#f8fafc',
      primaryColor: 0x0284c7,
      secondaryColor: 0x0f172a,
      accentColor: 0x38bdf8,
      trimColor: 0xffffff,
    },
    upperSpec: 'Expanded NikeSkin Mesh Touch Zone + Asymmetric Lacing',
    outsoleSpec: 'Agility Line Tri-Star & Conical Studs',
  }),
  createBootProduct({
    id: 'nike-mercurial-vapor-academy-tf',
    sku: 'NK-MERC-VTF',
    name: 'Giày Nike Mercurial Vapor Academy TF',
    subtitle: 'Đế đinh dăm bám sân chuyên cho sân cỏ nhân tạo.',
    price: 98,
    weightGrams: 192,
    surface: 'AG',
    surfaceLabel: 'Artificial Turf (TF)',
    statusTag: 'Zoom Air TF',
    colorway3D: {
      swatchHex: '#f43f5e',
      secondaryHex: '#facc15',
      primaryColor: 0xf43f5e,
      secondaryColor: 0x18181b,
      accentColor: 0xfacc15,
      trimColor: 0xffffff,
    },
    upperSpec: 'Molded Speed Cage + Micro-Textured Synthetic Upper',
    outsoleSpec: 'Đế Đinh Dăm Cao Su Đa Hướng + Đệm Gót Zoom Air',
    image: '/src/assets/images/hero_pitch_boot_1794307152243.jpg',
  }),
  createBootProduct({
    id: 'adidas-copa-pure-2-fg',
    sku: 'AD-COPA-P2',
    name: 'Giày adidas Copa Pure.2 FG',
    subtitle: 'Da tổng hợp siêu mềm mang lại cảm giác chạm bóng chân thực.',
    price: 165,
    weightGrams: 214,
    surface: 'FG',
    surfaceLabel: 'Firm Ground (FG)',
    statusTag: 'Fusionskin Leather',
    colorway3D: {
      swatchHex: '#f5f5f4',
      secondaryHex: '#1c1917',
      primaryColor: 0xf5f5f4,
      secondaryColor: 0x1c1917,
      accentColor: 0xd4af37,
      trimColor: 0x0f172a,
    },
    upperSpec: 'Quilted Fusionskin Forefoot + Cushioned Touch Pods',
    outsoleSpec: 'Torsionframe Outsole với Đinh Trụ Xoay Trở Êm Ái',
    image: '/src/assets/images/product_leather_boot_1794307156020.jpg',
  }),
  createBootProduct({
    id: 'puma-future-match-tt',
    sku: 'PM-FUT-MTT',
    name: 'Giày Puma Future Match TT',
    subtitle: 'Công nghệ FUZIONFIT ôm sát bàn chân khi tăng tốc.',
    price: 95,
    weightGrams: 205,
    surface: 'AG',
    surfaceLabel: 'Turf Trainer (TT/TF)',
    statusTag: 'FUZIONFIT360',
    colorway3D: {
      swatchHex: '#f97316',
      secondaryHex: '#18181b',
      primaryColor: 0xf97316,
      secondaryColor: 0x18181b,
      accentColor: 0xfacc15,
      trimColor: 0xffffff,
    },
    upperSpec: 'FUZIONFIT360 Adaptive Compression Band + 3D Grip Zones',
    outsoleSpec: 'Dynamic Motion System Turf Outsole + EVA Midsole',
  }),
  createBootProduct({
    id: 'mizuno-morelia-neo-iv-club-as',
    sku: 'MZ-MOR-N4AS',
    name: 'Giày Mizuno Morelia Neo IV Club AS',
    subtitle: 'Form giày bè thoải mái cho người chân ngang.',
    price: 92,
    weightGrams: 195,
    surface: 'AG',
    surfaceLabel: 'Astro Turf (AS/TF)',
    statusTag: 'Wide Fit Chân Bè',
    colorway3D: {
      swatchHex: '#dc2626',
      secondaryHex: '#ffffff',
      primaryColor: 0xdc2626,
      secondaryColor: 0x1c1917,
      accentColor: 0xd4af37,
      trimColor: 0xffffff,
    },
    upperSpec: 'Soft Japanese Microfiber Synthetic Leather (Form Bè)',
    outsoleSpec: 'Đế Đinh Dăm Chữ L Chống Trơn Trượt Sân Cỏ Nhân Tạo',
    image: '/src/assets/images/product_leather_boot_1794307156020.jpg',
  }),
  createBootProduct({
    id: 'nike-tiempo-legend-10-academy',
    sku: 'NK-TMPO-10A',
    name: 'Giày Nike Tiempo Legend 10 Academy',
    subtitle: 'Đế đinh hình nón giúp trụ vững trong các pha tranh chấp.',
    price: 105,
    weightGrams: 202,
    surface: 'FG',
    surfaceLabel: 'FG/MG Conical Studs',
    statusTag: 'FlyTouch Lite',
    colorway3D: {
      swatchHex: '#10b981',
      secondaryHex: '#0f172a',
      primaryColor: 0x10b981,
      secondaryColor: 0x0f172a,
      accentColor: 0xffffff,
      trimColor: 0xfacc15,
    },
    upperSpec: 'FlyTouch Lite Engineered Leather + Microdots Touch Zones',
    outsoleSpec: 'Conical Heel & Forefoot Studs (Trụ Vững & Xoay Trở 360°)',
    image: '/src/assets/images/product_leather_boot_1794307156020.jpg',
  }),
  createBootProduct({
    id: 'adidas-x-crazyfast-3-tf',
    sku: 'AD-XCF-3TF',
    name: 'Giày adidas X Crazyfast.3 TF',
    subtitle: 'Thân giày nhẹ và mỏng hỗ trợ bứt tốc quãng ngắn.',
    price: 96,
    weightGrams: 182,
    surface: 'AG',
    surfaceLabel: 'Artificial Turf (TF)',
    statusTag: '182g Speed Boot',
    colorway3D: {
      swatchHex: '#eab308',
      secondaryHex: '#09090b',
      primaryColor: 0xeab308,
      secondaryColor: 0x09090b,
      accentColor: 0x38bdf8,
      trimColor: 0xffffff,
    },
    upperSpec: 'Aeropacity Speedskin Multi-Layer Translucent Mesh',
    outsoleSpec: 'Lugged High-Speed Rubber Turf Outsole + EVA Cushion',
    image: '/src/assets/images/hero_pitch_boot_1794307152243.jpg',
  }),
  createBootProduct({
    id: 'puma-ultra-play-fg-ag',
    sku: 'PM-ULT-PFG',
    name: 'Giày Puma Ultra Play FG/AG',
    subtitle: 'Trọng lượng siêu nhẹ giúp tối ưu tốc độ di chuyển.',
    price: 85,
    weightGrams: 178,
    surface: 'FG',
    surfaceLabel: 'Hybrid FG/AG',
    statusTag: 'SPEEDPLATE FG/AG',
    colorway3D: {
      swatchHex: '#8b5cf6',
      secondaryHex: '#f43f5e',
      primaryColor: 0x8b5cf6,
      secondaryColor: 0x18181b,
      accentColor: 0xf43f5e,
      trimColor: 0xffffff,
    },
    upperSpec: 'Lightweight Debossed PU Upper with Speed Print',
    outsoleSpec: 'TPU SPEEDPLATE Outsole Tương Thích Cả Sân Tự Nhiên & Nhân Tạo',
  }),
  createBootProduct({
    id: 'jogarbola-artificial-turf',
    sku: 'JG-PRO-TF',
    name: 'Giày Jogarbola chính hãng sân nhân tạo',
    subtitle: 'Đế cao su chịu lực chống mài mòn tốt.',
    price: 48,
    weightGrams: 212,
    surface: 'AG',
    surfaceLabel: 'Sân Cỏ Nhân Tạo (TF)',
    statusTag: 'Jogarbola Japan Tech',
    colorway3D: {
      swatchHex: '#1d4ed8',
      secondaryHex: '#facc15',
      primaryColor: 0x1d4ed8,
      secondaryColor: 0x0f172a,
      accentColor: 0xfacc15,
      trimColor: 0xffffff,
    },
    upperSpec: 'Microfiber PU Chống Trầy Xước & Chống Thấm Nước',
    outsoleSpec: 'Đế Cao Su Nguyên Khối Chống Mài Mòn Trên Mặt Sân Cát/Cỏ Nhân Tạo',
  }),
  createBootProduct({
    id: 'kamito-ta11-pro',
    sku: 'KM-TA11-PRO',
    name: 'Giày Kamito TA11 Pro',
    subtitle: 'Dòng giày thiết kế riêng cho cầu thủ Việt với độ ôm chân cao.',
    price: 68,
    weightGrams: 196,
    surface: 'AG',
    surfaceLabel: 'KA-SPIN Turf (TF)',
    statusTag: 'Signature Tuấn Anh 11',
    colorway3D: {
      swatchHex: '#ffffff',
      secondaryHex: '#d4af37',
      primaryColor: 0xfafaf9,
      secondaryColor: 0x1e293b,
      accentColor: 0xd4af37,
      trimColor: 0xdc2626,
    },
    upperSpec: 'Da KA-FIBER Ultra Siêu Mềm + Cổ Thun Ôm Cổ Chân',
    outsoleSpec: 'Đệm Giảm Chấn KA-COMFORT + Đinh Dăm KA-SPIN Bám Sân Mưa',
    image: '/src/assets/images/product_leather_boot_1794307156020.jpg',
  }),
  createBootProduct({
    id: 'mitre-7-a-side-turf',
    sku: 'MT-S7-TF',
    name: 'Giày Mitre đá bóng sân 7',
    subtitle: 'Độ bền cao và giá thành hợp lý cho học sinh, sinh viên.',
    price: 35,
    weightGrams: 224,
    surface: 'AG',
    surfaceLabel: 'Sân 5 & Sân 7 (TF)',
    statusTag: 'Bền Bỉ Sân 7',
    colorway3D: {
      swatchHex: '#0f172a',
      secondaryHex: '#22c55e',
      primaryColor: 0x0f172a,
      secondaryColor: 0x1e293b,
      accentColor: 0x22c55e,
      trimColor: 0xffffff,
    },
    upperSpec: 'Da Tổng Hợp Phủ Nano Chống Bám Bẩn + Mũi Khâu Gia Cố',
    outsoleSpec: 'Đế Cao Su Khâu Toàn Bộ Viền Mũi Chống Bung Keo',
  }),
  createBootProduct({
    id: 'akka-ultimate-control',
    sku: 'AK-ULT-CTRL',
    name: 'Giày Akka Ultimate Control',
    subtitle: 'Bề mặt da nhám hỗ trợ kiểm soát bóng dính chân.',
    price: 42,
    weightGrams: 206,
    surface: 'AG',
    surfaceLabel: 'Control Turf (TF)',
    statusTag: '3D Friction Skin',
    colorway3D: {
      swatchHex: '#0284c7',
      secondaryHex: '#f43f5e',
      primaryColor: 0x0284c7,
      secondaryColor: 0x0f172a,
      accentColor: 0xf43f5e,
      trimColor: 0xffffff,
    },
    upperSpec: 'Da Microfiber Phủ Vân Nhám 3D Kiểm Soát Bóng',
    outsoleSpec: 'Đinh Tròn Xoay Trở 360 Độ Cho Tiền Vệ Kiến Thiết',
  }),
  createBootProduct({
    id: 'wika-victory-tf',
    sku: 'WK-VIC-TF',
    name: 'Giày Wika Victory TF',
    subtitle: 'Đệm đế êm ái giảm áp lực lên cổ chân khi chạy nhiều.',
    price: 39,
    weightGrams: 204,
    surface: 'AG',
    surfaceLabel: 'EVA Cushion TF',
    statusTag: 'Wika Victory',
    colorway3D: {
      swatchHex: '#e11d48',
      secondaryHex: '#facc15',
      primaryColor: 0xe11d48,
      secondaryColor: 0x18181b,
      accentColor: 0xfacc15,
      trimColor: 0xffffff,
    },
    upperSpec: 'Da TPU Mềm Ôm Chân + Lưỡi Gà Liền Co Giãn',
    outsoleSpec: 'Lót Đệm E.V.A Carbon + Đế Khâu Mũi Bền Bỉ',
  }),
  createBootProduct({
    id: 'zocker-space-tf',
    sku: 'ZK-SPC-TF',
    name: 'Giày Zocker Space TF',
    subtitle: 'Đế đinh kép độc quyền chống trơn trượt hiệu quả trên cỏ nhân tạo.',
    price: 46,
    weightGrams: 200,
    surface: 'AG',
    surfaceLabel: 'Dual-Stud TF',
    statusTag: 'Đinh Kép Độc Quyền',
    colorway3D: {
      swatchHex: '#14b8a6',
      secondaryHex: '#0f172a',
      primaryColor: 0x14b8a6,
      secondaryColor: 0x0f172a,
      accentColor: 0xf97316,
      trimColor: 0xffffff,
    },
    upperSpec: 'Da PU Vũ Trụ Vân Nổi Ma Sát Cao',
    outsoleSpec: 'Công Nghệ Đinh Kép (Ngôi Sao + Đinh Tròn) Bám Sân Cỏ Mòn',
  }),

  // ==========================================================================
  // 03. QUẢ BÓNG ĐÁ (11 MẪU — BALLS)
  // ==========================================================================
  createBallProduct({
    id: 'adidas-wc2026-trionda-pro',
    sku: 'AD-WC26-TRI',
    name: 'Quả Bóng Đá Chính Thức adidas FIFA World Cup 2026 Trionda Pro Cỡ 5',
    subtitle: 'Da tổng hợp chống nước và ruột bóng gia cố bền bỉ.',
    price: 170,
    weightGrams: 430,
    surface: 'All-Weather',
    surfaceLabel: 'FIFA Quality Pro · WC 2026',
    statusTag: 'World Cup 2026 Pro',
    externalUrl:
      'https://google.com/search?q=Balls+Qu%E1%BA%A3+B%C3%B3ng+%C4%90%C3%A1+Ch%C3%ADnh+Th%E1%BB%A9c+adidas+FIFA+World+Cup+2026+Trionda+Pro+*C%E1%BB%A1+5*&prds=catalogid%3A6919199766247219092%2Cgpcid%3A17986008728665450336%2CheadlineOfferDocid%3A12930677497866112083%2Cmid%3A576462887772053969%2Cproductid%3A11622361897710601975%2Cpvo%3A38%2Cpvt%3Ahg%2Crds%3APC_17986008728665450336%7CPROD_PC_17986008728665450336&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_Hgw74No-lLTbE3fojLwXZUbU5nM0AYv5P8xREoI3Q8AQneBMB3z7-g',
    colorway3D: {
      swatchHex: '#fafaf9',
      secondaryHex: '#e11d48',
      primaryColor: 0xfafaf9,
      secondaryColor: 0x0284c7,
      accentColor: 0xe11d48,
      trimColor: 0xd4af37,
    },
    shellSpec: 'SPEEDSHELL Thermally Bonded PU + Micro-Dimples',
    bladderSpec: 'High-Grade Butyl & Carbon-Latex Core',
  }),
  createBallProduct({
    id: 'adidas-ucl-league-25-26',
    sku: 'AD-UCL-25L',
    name: 'Banh Bóng đá Vòng Bảng adidas Ucl League Mùa Giải 25/26',
    subtitle: 'Bề mặt không đường may đạt chuẩn FIFA Quality.',
    price: 65,
    weightGrams: 432,
    surface: 'All-Weather',
    surfaceLabel: 'FIFA Quality · TSBE Seamless',
    statusTag: 'UCL Starball 25/26',
    externalUrl:
      'https://google.com/search?q=Banh+B%C3%B3ng+%C4%91%C3%A1+V%C3%B2ng+B%E1%BA%A3ng+adidas+Ucl+League+M%C3%B9a+Gi%E1%BA%A3i+25/26&prds=catalogid%3A17584258113946171284%2Cgpcid%3A3306572772888207774%2CheadlineOfferDocid%3A3639489888335842421%2Cmid%3A576462563299130932%2Cproductid%3A3780009677316203720%2Cpvo%3A38%2Cpvt%3Ahg%2Crds%3APC_3306572772888207774%7CPROD_PC_3306572772888207774&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_Hgyr2fFpk9pAN4swnVE8x3O4ULZKyVzZ0V9KxMN73MkYum0yObnH4w',
    colorway3D: {
      swatchHex: '#ffffff',
      secondaryHex: '#1d4ed8',
      primaryColor: 0xffffff,
      secondaryColor: 0x1d4ed8,
      accentColor: 0xfacc15,
      trimColor: 0x0f172a,
    },
    shellSpec: 'TSBE Seamless Thermal Construction + Star Panels',
    bladderSpec: 'Butyl Air-Lock Bladder',
  }),
  createBallProduct({
    id: 'molten-f5n3555',
    sku: 'MLT-F5N3555',
    name: 'Bóng đá Molten F5N3555',
    subtitle: 'Vân nổi cao cấp tăng ma sát và cảm giác bóng chuẩn xác.',
    price: 58,
    weightGrams: 434,
    surface: 'All-Weather',
    surfaceLabel: 'Hybrid Bonded · FIFA Basic',
    statusTag: 'Molten Japan Spec',
    externalUrl:
      'https://google.com/search?q=B%C3%B3ng+%C4%91%C3%A1+Molten+F5N3555&prds=catalogid%3A17940975476192005108%2Cgpcid%3A4903545418204723120%2CheadlineOfferDocid%3A15688454817713314313%2ClocalAnnotatedOfferId%3A15688454817713314313%2Cmid%3A576462543326860992%2Cproductid%3A13723378003263762401%2Cpvo%3A38%2Cpvt%3Ahg&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_HgxAa4DziMjoA0i36C4gFhsCyhdjMKns6OICNx8E9BR_u9uSiCryhQ',
    colorway3D: {
      swatchHex: '#f8fafc',
      secondaryHex: '#dc2626',
      primaryColor: 0xf8fafc,
      secondaryColor: 0xdc2626,
      accentColor: 0x18181b,
      trimColor: 0xdc2626,
    },
    shellSpec: '32-Panel Textured PU + ACENTEC Cross-Fusion',
    bladderSpec: 'Latex-Butyl Dual Layer Bladder',
  }),
  createBallProduct({
    id: 'dong-luc-uhv-203-sao',
    sku: 'DL-UHV-203',
    name: 'Bóng Đá Uhv 2.03 in Sao Số 5 Chính Hãng Động Lực',
    subtitle: 'Da PU Hàn Quốc chịu lực tốt và giữ hơi cực chuẩn.',
    price: 36,
    weightGrams: 438,
    surface: 'All-Weather',
    surfaceLabel: 'Korean PU · Size 5',
    statusTag: 'Động Lực Chính Hãng',
    externalUrl:
      'https://google.com/search?q=B%C3%B3ng+%C4%90%C3%A1+Uhv+2.03+in+Sao+S%E1%BB%91+5+Ch%C3%ADnh+H%C3%A3ng&prds=headlineOfferDocid%3A2904103400344659425%2Cproductid%3A2904103400344659425%2Cpvo%3A38%2Cpvt%3Ahg%2Crds%3APC_12044368472105585936%7CPROD_PC_12044368472105585936&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_HgxaMRd4fCCX4f8jSh_-cXOsV3vzD5cbYWbkR2u4o5SlSVDK-SXoAA',
    colorway3D: {
      swatchHex: '#ffffff',
      secondaryHex: '#0284c7',
      primaryColor: 0xffffff,
      secondaryColor: 0x0284c7,
      accentColor: 0xef4444,
      trimColor: 0x1e3a8a,
    },
    shellSpec: 'Da PU Hàn Quốc Đa Lớp Chống Mài Mòn',
    bladderSpec: 'Ruột Vecxi Cao Su Tự Nhiên Giữ Hơi Vượt Trội',
  }),
  createBallProduct({
    id: 'bong-duc-cao-cap-3-lop',
    sku: 'BL-MOLD-3L',
    name: 'Quả bóng đá size 5 đúc cao cấp 3 lớp',
    subtitle: 'Vỏ ngoài PU bóng nhẹ, nảy êm chân cho sân tập.',
    price: 28,
    weightGrams: 425,
    surface: 'AG',
    surfaceLabel: '3-Layer Molded PU',
    statusTag: 'Đúc 3 Lớp Êm Chân',
    externalUrl:
      'https://google.com/search?q=Qu%E1%BA%A3+b%C3%B3ng+%C4%91%C3%A1+size+5+Banh+b%C3%B3ng+%C4%91%C3%A1+%C4%91%C3%BAc+cao+c%E1%BA%A5p+lo%E1%BA%A1i+3+l%E1%BB%9Bp&prds=catalogid%3A2948409857097021901%2Cgpcid%3A8051564963320974138%2CheadlineOfferDocid%3A15887350505657925653%2Cmid%3A576462575306974973%2Cproductid%3A2733818110591078240%2Cpvo%3A38%2Cpvt%3Ahg%2Crds%3APC_8051564963320974138%7CPROD_PC_8051564963320974138&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_Hgym0mdBFd3UBXf4UyKDUA8kkY5UM4s9GUJFSUueBPJrS8qPoZAP5w',
    colorway3D: {
      swatchHex: '#facc15',
      secondaryHex: '#0f172a',
      primaryColor: 0xfacc15,
      secondaryColor: 0x0f172a,
      accentColor: 0xe11d48,
      trimColor: 0x18181b,
    },
    shellSpec: 'Đúc Nguyên Khối 3 Lớp Không Đường Chỉ',
    bladderSpec: 'Ruột Cao Su Tổng Hợp Đàn Hồi Êm Chân',
  }),
  createBallProduct({
    id: 'dong-luc-uhv-205-fifa',
    sku: 'DL-UHV-205',
    name: 'Bóng Động Lực UHV 2.05 FIFA',
    subtitle: 'Đạt chuẩn thi đấu chuyên nghiệp quốc gia.',
    price: 78,
    weightGrams: 432,
    surface: 'All-Weather',
    surfaceLabel: 'FIFA Quality Pro · V.League',
    statusTag: 'Bóng Thi Đấu V.League',
    colorway3D: {
      swatchHex: '#fafaf9',
      secondaryHex: '#b91c1c',
      primaryColor: 0xfafaf9,
      secondaryColor: 0xb91c1c,
      accentColor: 0xd4af37,
      trimColor: 0x1e293b,
    },
    shellSpec: 'Da PU Cao Cấp Nhật Bản + Lớp Đệm Xốp Đàn Hồi',
    bladderSpec: 'Van Khóa Khí Chuyên Nghiệp Đạt Chuẩn FIFA Quality Pro',
  }),
  createBallProduct({
    id: 'dong-luc-delta-so-5',
    sku: 'DL-DELTA-5',
    name: 'Bóng đá Động Lực Delta số 5',
    subtitle: 'Độ tròn hoàn hảo và chống thấm nước mưa tốt.',
    price: 42,
    weightGrams: 435,
    surface: 'SG-Pro',
    surfaceLabel: 'All-Weather Hydro-Shield',
    statusTag: 'Chống Thấm Nước',
    colorway3D: {
      swatchHex: '#ffffff',
      secondaryHex: '#10b981',
      primaryColor: 0xffffff,
      secondaryColor: 0x10b981,
      accentColor: 0x0f172a,
      trimColor: 0x047857,
    },
    shellSpec: 'Da PU Chống Thấm Nước + Keo Ép Kín Đường Khâu',
    bladderSpec: 'Ruột Bóng Gia Cường Sợi Polyester Đa Hướng',
  }),
  createBallProduct({
    id: 'kamito-star-match',
    sku: 'KM-STAR-M5',
    name: 'Bóng đá Kamito Star Match',
    subtitle: 'Cấu trúc nhiều lớp lót giúp bóng đi đầm và hiểm hóc.',
    price: 45,
    weightGrams: 436,
    surface: 'All-Weather',
    surfaceLabel: 'Multi-Ply Flight Core',
    statusTag: 'Quỹ Đạo Đầm Chắc',
    colorway3D: {
      swatchHex: '#f8fafc',
      secondaryHex: '#f97316',
      primaryColor: 0xf8fafc,
      secondaryColor: 0x1e293b,
      accentColor: 0xf97316,
      trimColor: 0x0f172a,
    },
    shellSpec: 'Vỏ Microfiber PU Nhám + 4 Lớp Lót Đệm Định Hình',
    bladderSpec: 'Ruột Bóng Butyl Giữ Áp Suất Ổn Định',
  }),
  createBallProduct({
    id: 'mitre-impel-max',
    sku: 'MT-IMP-MAX',
    name: 'Bóng đá Mitre Impel Max',
    subtitle: 'Bề mặt phím sần tăng độ bám khi sút uy lực.',
    price: 38,
    weightGrams: 430,
    surface: 'All-Weather',
    surfaceLabel: 'Vimini Grip Texture',
    statusTag: 'Anh Quốc Mitre',
    colorway3D: {
      swatchHex: '#f43f5e',
      secondaryHex: '#18181b',
      primaryColor: 0xfafaf9,
      secondaryColor: 0x18181b,
      accentColor: 0xf43f5e,
      trimColor: 0x18181b,
    },
    shellSpec: '6-Panel Vimini Outer Texture + 3.5 mm EVA Soft Foam',
    bladderSpec: 'High-Retention Molded Bladder',
  }),
  createBallProduct({
    id: 'thai-son-nam-chinh-hang',
    sku: 'TSN-PRO-FS',
    name: 'Bóng đá Thái Sơn Nam chính hãng',
    subtitle: 'Độ nảy tiêu chuẩn Futsal hoặc sân cỏ.',
    price: 39,
    weightGrams: 435,
    surface: 'AG',
    surfaceLabel: 'Low-Bounce Sân 5 / Sân 7',
    statusTag: 'Chuẩn Đầm Sân Cỏ Nhân Tạo',
    colorway3D: {
      swatchHex: '#38bdf8',
      secondaryHex: '#1e3a8a',
      primaryColor: 0xf8fafc,
      secondaryColor: 0x1e3a8a,
      accentColor: 0x38bdf8,
      trimColor: 0xef4444,
    },
    shellSpec: 'Da PU Mềm Chuyên Dụng Sân 5 & Sân 7 Cỏ Nhân Tạo',
    bladderSpec: 'Ruột Bóng Giảm Nảy Kiểm Soát Bóng Sệt Tối Ưu',
  }),
  createBallProduct({
    id: 'luc-si-star-so-4-5',
    sku: 'LS-STAR-45',
    name: 'Bóng đá lực sĩ Star số 4 và 5',
    subtitle: 'Độ bền cao phù hợp đá sân bê tông hoặc sân đất.',
    price: 26,
    weightGrams: 440,
    surface: 'AG',
    surfaceLabel: 'High-Abrasion Shield',
    statusTag: 'Siêu Bền Sân Đất/Cỏ',
    colorway3D: {
      swatchHex: '#eab308',
      secondaryHex: '#dc2626',
      primaryColor: 0xfef08a,
      secondaryColor: 0xdc2626,
      accentColor: 0x18181b,
      trimColor: 0x18181b,
    },
    shellSpec: 'Vỏ Da Tổng Hợp Chịu Mài Mòn Cao Trên Sân Cứng',
    bladderSpec: 'Khung Sợi Dù Gia Cường Chống Biến Dạng',
  }),

  // ==========================================================================
  // 04. GĂNG TAY THỦ MÔN (12 MẪU — GLOVES)
  // ==========================================================================
  createGloveProduct({
    id: 'bkeeper-pro-foam-gloves',
    sku: 'BK-GK-PRO',
    name: 'BKeeper Goalkeeper Gloves Professional High-quality foam',
    subtitle: 'Thanh bảo vệ ngón tay tháo rời cùng mút xốp độ bám vượt trội.',
    price: 75,
    weightGrams: 255,
    surface: 'All-Weather',
    surfaceLabel: 'Removable 5-Finger Spines',
    statusTag: 'BKeeper Pro Latex',
    externalUrl:
      'https://google.com/search?q=BKeeper+Goalkeeper+Gloves+Professional+High-quality+foam&prds=catalogid%3A15643572741095091197%2Cgpcid%3A5684252546036977334%2CheadlineOfferDocid%3A5115251475739382346%2Cmid%3A576462835811097630%2Cproductid%3A1560467236518206631%2Cpvo%3A38%2Cpvt%3Ahg%2Crds%3APC_5684252546036977334%7CPROD_PC_5684252546036977334&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_Hgz05XDhAtB9YHX7YlVfh3ApUrszhiJJW6OMeJbToOhowhgD0RmzsA',
    colorway3D: {
      swatchHex: '#18181b',
      secondaryHex: '#e11d48',
      primaryColor: 0x18181b,
      secondaryColor: 0xf5f5f4,
      accentColor: 0xe11d48,
      trimColor: 0xd4af37,
    },
    palmSpec: '4.0 mm High-Density Contact Latex + 3.0 mm Cushion Foam',
    cutSpec: 'Hybrid Negative Cut + 5 Xương Ngón Tháo Rời Linh Hoạt',
  }),
  createGloveProduct({
    id: 'adidas-predator-gl-ix3878',
    sku: 'AD-PRED-IX3878',
    name: 'adidas Predator Gl Thủ Môn Găng Tay Nam IX3878',
    subtitle: 'Lòng bàn tay mút Soft Grip Pro giảm chấn động lực sút.',
    price: 88,
    weightGrams: 242,
    surface: 'All-Weather',
    surfaceLabel: 'Soft Grip Pro Latex',
    statusTag: 'Predator IX3878',
    externalUrl:
      'https://google.com/search?q=adidas+Predator+Gl+Th%E1%BB%A7+M%C3%B4n+G%C4%83ng+Tay+Nam+IX3878&prds=catalogid%3A13108323579103165717%2Cgpcid%3A3345472400030358661%2CheadlineOfferDocid%3A380363347394080957%2Cmid%3A576462895457470387%2Cproductid%3A3794826463461034928%2Cpvo%3A38%2Cpvt%3Ahg%2Crds%3APC_3345472400030358661%7CPROD_PC_3345472400030358661&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_HgydBNtLXhefObqSzRs_MOXlV6Rn4WSvG9Vgqn3j3tnXAiE6OQxSag',
    colorway3D: {
      swatchHex: '#09090b',
      secondaryHex: '#f43f5e',
      primaryColor: 0x09090b,
      secondaryColor: 0xfafaf9,
      accentColor: 0xf43f5e,
      trimColor: 0xffffff,
    },
    palmSpec: 'Soft Grip Pro All-Weather Cushion Latex',
    cutSpec: 'Half-Wrap Wrist Strap + Debossed High-Definition Backhand',
  }),
  createGloveProduct({
    id: 'adidas-predator-training-gk',
    sku: 'AD-PRED-TRN',
    name: 'adidas Găng tay thủ môn TẬP LUYỆN Predator',
    subtitle: 'Kiểu cắt positive cut mang lại không gian rộng rãi và thoải mái.',
    price: 45,
    weightGrams: 230,
    surface: 'All-Weather',
    surfaceLabel: 'Positive Cut Training',
    statusTag: 'Predator Training',
    externalUrl:
      'https://google.com/search?q=adidas+G%C4%83ng+tay+th%E1%BB%A7+m%C3%B4n+T%E1%BA%ACP+LUY%E1%BB%86N+Predator&prds=catalogid%3A3991658290437549066%2Cgpcid%3A9215262265043032670%2CheadlineOfferDocid%3A939247701847588436%2Cmid%3A576462854415345376%2Cproductid%3A4751913911274725735%2Cpvo%3A38%2Cpvt%3Ahg%2Crds%3APC_9215262265043032670%7CPROD_PC_9215262265043032670&ibp=oshop&gemcid=c_afab6c599521a0ec&gemrid=r_2bbecc6f433a601c&pvo=38&opi=103135050&gl=VN&hl=vi&noiga=1&gemsp=AVZ_Hgwg_4TeUQ4asw5TmAoCdnJcWmsGlPikLgi9f9w4mX2Reo5bRi6WAQ',
    colorway3D: {
      swatchHex: '#eab308',
      secondaryHex: '#18181b',
      primaryColor: 0x18181b,
      secondaryColor: 0xfef08a,
      accentColor: 0xeab308,
      trimColor: 0xffffff,
    },
    palmSpec: '3.5 mm Durable Soft Grip Latex Chống Mài Mòn Sân Cỏ Nhân Tạo',
    cutSpec: 'Positive Cut Rộng Rãi Thoáng Khí + Đai Cổ Tay Vòng Bán Phần',
  }),
  createGloveProduct({
    id: 'nike-phantom-elite-gk',
    sku: 'NK-PHAN-ELGK',
    name: 'Găng tay thủ môn Nike Phantom Elite',
    subtitle: 'Lớp bọc cao su dính chặt giúp bắt dính bóng ở tốc độ cao.',
    price: 135,
    weightGrams: 238,
    surface: 'SG-Pro',
    surfaceLabel: 'ACC All Conditions Control',
    statusTag: 'Nike ACC Elite',
    colorway3D: {
      swatchHex: '#0284c7',
      secondaryHex: '#ffffff',
      primaryColor: 0x0f172a,
      secondaryColor: 0xf8fafc,
      accentColor: 0x0284c7,
      trimColor: 0x38bdf8,
    },
    palmSpec: '4.0 mm ACC (All Conditions Control) Contact Foam',
    cutSpec: 'Negative Cut + Neoprene Gussets Co Giãn Ôm Khít Ngón Tay',
  }),
  createGloveProduct({
    id: 'puma-one-protect-gk',
    sku: 'PM-ONE-PROT',
    name: 'Găng tay thủ môn Puma One Protect',
    subtitle: 'Khung xương chống lật ngón an toàn cho khớp ngón tay.',
    price: 82,
    weightGrams: 260,
    surface: 'All-Weather',
    surfaceLabel: 'Puma Finger Protection',
    statusTag: 'Khung Xương Bảo Vệ',
    colorway3D: {
      swatchHex: '#f97316',
      secondaryHex: '#18181b',
      primaryColor: 0x18181b,
      secondaryColor: 0xfafaf9,
      accentColor: 0xf97316,
      trimColor: 0xfacc15,
    },
    palmSpec: '4.0 mm Ultimate Grip Latex',
    cutSpec: 'Regular Cut + Hệ Thống Xương Khóa 4 Ngón Chống Bật Ngược',
  }),
  createGloveProduct({
    id: 'keepex-professional-gk',
    sku: 'KPX-PRO-DE',
    name: 'Găng tay thủ môn Keepex Professional',
    subtitle: 'Mút Đức cao cấp siêu bám trong điều kiện thời tiết ẩm ướt.',
    price: 68,
    weightGrams: 248,
    surface: 'SG-Pro',
    surfaceLabel: '4mm German Wet-Latex',
    statusTag: 'Mút Đức Siêu Bám',
    colorway3D: {
      swatchHex: '#10b981',
      secondaryHex: '#0f172a',
      primaryColor: 0x0f172a,
      secondaryColor: 0xecfdf5,
      accentColor: 0x10b981,
      trimColor: 0xffffff,
    },
    palmSpec: '4.0 mm German Giga-Contact Latex Kích Hoạt Độ Dính Khi Ẩm',
    cutSpec: 'Roll-Negative Hybrid Cut Tăng Tối Đa Diện Tích Ôm Bóng',
  }),
  createGloveProduct({
    id: 'hwan-sport-double-strap-gk',
    sku: 'HW-SPT-GK',
    name: 'Găng tay thủ môn Hwan Sport',
    subtitle: 'Cổ tay băng dính đôi cố định chắc chắn khớp cổ tay.',
    price: 42,
    weightGrams: 252,
    surface: 'All-Weather',
    surfaceLabel: 'Dual-Wrap Wrist Lock',
    statusTag: 'Đai Cổ Tay Đôi',
    colorway3D: {
      swatchHex: '#dc2626',
      secondaryHex: '#facc15',
      primaryColor: 0x1c1917,
      secondaryColor: 0xfafaf9,
      accentColor: 0xdc2626,
      trimColor: 0xfacc15,
    },
    palmSpec: '4.0 mm Super Soft Latex + Silicon Nội Vi Chống Trượt Tay',
    cutSpec: 'Băng Quấn Cổ Tay 2 Vòng Cố Định Chắc Chắn Khớp Cổ Tay',
  }),
  createGloveProduct({
    id: 'zocker-keep-flat-gk',
    sku: 'ZK-KEEP-GK',
    name: 'Găng tay thủ môn Zocker Keep',
    subtitle: 'Thiết kế mặt cắt phẳng tăng diện tích tiếp xúc trái bóng.',
    price: 38,
    weightGrams: 240,
    surface: 'AG',
    surfaceLabel: 'Flat Palm High-Contact',
    statusTag: 'Zocker Keep VN',
    colorway3D: {
      swatchHex: '#14b8a6',
      secondaryHex: '#0f172a',
      primaryColor: 0x0f172a,
      secondaryColor: 0xf0fdfa,
      accentColor: 0x14b8a6,
      trimColor: 0xffffff,
    },
    palmSpec: 'Mút Lòng Bàn Tay Chịu Ma Sát Cao Trên Sân Cỏ Nhân Tạo',
    cutSpec: 'Flat Palm Cut Mở Rộng Bề Mặt Đón Bóng',
  }),
  createGloveProduct({
    id: 'grand-sport-breathable-gk',
    sku: 'GS-AERO-GK',
    name: 'Găng tay thủ môn Grand Sport',
    subtitle: 'Độ đàn hồi tốt và thoáng khí nhờ các lỗ thoát mồ hôi.',
    price: 36,
    weightGrams: 228,
    surface: 'All-Weather',
    surfaceLabel: 'Air-Mesh Gussets',
    statusTag: 'Siêu Thoáng Khí',
    colorway3D: {
      swatchHex: '#2563eb',
      secondaryHex: '#ffffff',
      primaryColor: 0x1e3a8a,
      secondaryColor: 0xffffff,
      accentColor: 0x38bdf8,
      trimColor: 0xfacc15,
    },
    palmSpec: '3.5 mm Dumbex Latex Đàn Hồi Êm Ái',
    cutSpec: 'Khe Ngón Tay Phối Lưới Air-Mesh Thoát Nhiệt Nhanh',
  }),
  createGloveProduct({
    id: 'aglas-pro-4mm-gk',
    sku: 'AGL-PRO-4M',
    name: 'Găng tay thủ môn Aglas Pro',
    subtitle: 'Lớp đệm mút dày 4mm giảm đau rát khi đấm bóng mạnh.',
    price: 44,
    weightGrams: 256,
    surface: 'All-Weather',
    surfaceLabel: '4mm Shock-Absorb Palm',
    statusTag: 'Đệm Mút Dày 4mm',
    colorway3D: {
      swatchHex: '#8b5cf6',
      secondaryHex: '#18181b',
      primaryColor: 0x18181b,
      secondaryColor: 0xfafaf9,
      accentColor: 0x8b5cf6,
      trimColor: 0xf43f5e,
    },
    palmSpec: '4.0 mm German Latex + 3.5 mm Memory Foam Giảm Chấn',
    cutSpec: 'Vùng Punch Zone Cao Su 3D Dày Dặn Hỗ Trợ Đấm Bóng',
  }),
  createGloveProduct({
    id: 'daiwoos-spine-gk',
    sku: 'DW-SPINE-GK',
    name: 'Găng tay thủ môn Daiwoos',
    subtitle: 'Gân bảo vệ ngón tay cố định chống gập ngón hiệu quả.',
    price: 32,
    weightGrams: 250,
    surface: 'AG',
    surfaceLabel: 'Fixed 5-Finger Spines',
    statusTag: 'Gân Bảo Vệ Ngón',
    colorway3D: {
      swatchHex: '#ef4444',
      secondaryHex: '#09090b',
      primaryColor: 0x09090b,
      secondaryColor: 0xfafaf9,
      accentColor: 0xef4444,
      trimColor: 0xffffff,
    },
    palmSpec: 'Mút Latex Chống Mài Mòn Kết Hợp Đệm Giảm Lực',
    cutSpec: 'Gân Xương Bảo Vệ 5 Ngón Chống Lật Khớp Ngón Tay',
  }),
  createGloveProduct({
    id: 'just-keep-grassroots-gk',
    sku: 'JK-GRASS-GK',
    name: 'Găng tay thủ môn Just Keep',
    subtitle: 'Mức giá học sinh nhưng vẫn đảm bảo độ bám tốt cho sân phong trào.',
    price: 25,
    weightGrams: 222,
    surface: 'AG',
    surfaceLabel: 'Grassroots Turf Grip',
    statusTag: 'Bền Bỉ Phong Trào',
    colorway3D: {
      swatchHex: '#22c55e',
      secondaryHex: '#18181b',
      primaryColor: 0x18181b,
      secondaryColor: 0xfafaf9,
      accentColor: 0x22c55e,
      trimColor: 0xfacc15,
    },
    palmSpec: '3.5 mm All-Rounder Turf Latex Bền Bỉ',
    cutSpec: 'Flat Cut Thoải Mái Cho Học Sinh, Sinh Viên & Sân Phong Trào',
  }),
];
