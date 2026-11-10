export type ProductCategory = 'kits' | 'balls' | 'boots' | 'gloves';
export type PitchSurface = 'FG' | 'SG-Pro' | 'AG' | 'All-Weather';

export interface TechnicalSpec {
  label: string;
  value: string;
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
  statusTag?: string; // Max 1 subtle unboxed text tag
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
    titleVi: 'Áo Đấu',
    titleEn: 'Match Kits',
    kicker: '01. Áo Đấu · Player-Issue Jacquard Apparel',
    headline: '28-Gauge Body-Mapped Jacquard Knit.',
    summary:
      'Engineered on circular Italian looms with hydrophobic micro-filament yarn. Thoracic ventilation zones evacuate perspiration 3.4x faster than standard replica shirts while maintaining zero-chafe flatlock geometry.',
    accentHex: '#be123c',
    modelSpecLabel: '3D Torso Loom Matrix · 28-Gauge Jacquard + Thermal Zones',
    explodeLabel: 'Deconstruct Knit Layers',
    metrics: [
      { label: 'Garment Mass (M)', value: '142 g' },
      { label: 'Air Permeability', value: '410 mm/s' },
      { label: 'Moisture Evacuation', value: '3.4x Faster' },
    ],
  },
  {
    id: 'balls',
    index: '02',
    titleVi: 'Bóng Thi Đấu',
    titleEn: 'Match Balls',
    kicker: '02. Bóng Thi Đấu · Thermally Bonded Aerodynamics',
    headline: '14-Panel Wind-Tunnel Flight Stability.',
    summary:
      'High-frequency thermal fusion eliminates stitch seams for 0.0% water uptake in torrential fixtures. Micro-dimpled polyurethane shells stabilize boundary-layer airflow at velocities above 95 km/h.',
    accentHex: '#e11d48',
    modelSpecLabel: '3D Geodesic Aero-Core · Carbon-Latex Bladder + 14 Panels',
    explodeLabel: 'Expand Thermal Panels',
    metrics: [
      { label: 'Official Mass', value: '432 g' },
      { label: 'Sphericity Deviation', value: '< 1.1%' },
      { label: 'Water Absorption', value: '0.0%' },
    ],
  },
  {
    id: 'boots',
    index: '03',
    titleVi: 'Giày Đinh',
    titleEn: 'Pitch Boots',
    kicker: '03. Giày Đinh · Montebelluna Carbon & K-Leather Lasts',
    headline: '11-Ply Biaxial Carbon & 72-Hour Lasting.',
    summary:
      'Hand-lasted in Treviso for 72 hours. Choose between our 178 g biaxial carbon propulsion chassis for firm grass, drum-dyed heritage kangaroo leather, or knee-safe hollow conical studs for 4G artificial turf.',
    accentHex: '#f43f5e',
    modelSpecLabel: '3D Last & Biaxial Chassis · 11 Carbon Plies + Titanium Studs',
    explodeLabel: 'Separate Carbon Soleplate',
    metrics: [
      { label: 'Single Boot Mass', value: '178 g' },
      { label: 'Energy Return', value: '91.4%' },
      { label: '90-Min Water Uptake', value: '0.2%' },
    ],
  },
  {
    id: 'gloves',
    index: '04',
    titleVi: 'Găng Thủ Môn',
    titleEn: 'GK Gloves',
    kicker: '04. Găng Thủ Môn · German Contact Latex & Ortho-Spine',
    headline: '4.0 mm German Contact Latex & Negative Cut.',
    summary:
      'Internal negative-stitched gussets wrap the fingers in continuous 4.0 mm German Contact Latex with 3.0 mm damping foam. Optional bi-directional ortho-spines prevent hyperextension on point-blank saves.',
    accentHex: '#fb7185',
    modelSpecLabel: '3D Negative-Cut Anatomy · 4mm Latex Palm + 4 Ortho-Spines',
    explodeLabel: 'Isolate Ortho-Spine & Latex',
    metrics: [
      { label: 'Latex Thickness', value: '4.0 mm' },
      { label: 'Pair Mass (Size 9)', value: '245 g' },
      { label: 'Grip Coefficient', value: '1.42 μ (Wet)' },
    ],
  },
];

export const HERO_IMAGE = '/src/assets/images/hero_pitch_boot_1794307152243.jpg';

export const PRODUCTS: Product[] = [
  // ================= 01. ÁO ĐẤU (KITS) =================
  {
    id: 'maestro-match-jersey',
    sku: 'SA-KT-101',
    name: 'Maestro Player-Issue Home Shirt',
    subtitle: 'Body-Mapped Jacquard Knit · Midnight Navy & Chalk',
    category: 'kits',
    categoryLabel: 'Áo Đấu · Match Kits',
    price: 155,
    weightGrams: 142,
    surface: 'All-Weather',
    surfaceLabel: 'Player-Issue Slim Cut',
    statusTag: 'Authentic Spec',
    image: '/src/assets/images/product_match_jersey_1794307153903.jpg',
    description:
      'Constructed on 28-gauge circular jacquard looms using hydrophobic micro-filament yarn. Engineered ventilation zones across the thoracic spine and underarms evacuate moisture 3.4x faster than standard replica polyester.',
    craftsmanshipNote:
      'Finished with flat-locked zero-chafe seams, a ribbed heritage cotton-blend collar, and a woven high-density crest.',
    sizes: [
      { eu: 'S', uk: '36"', us: 'S', cm: '92–96' },
      { eu: 'M', uk: '39"', us: 'M', cm: '97–102' },
      { eu: 'L', uk: '42"', us: 'L', cm: '103–108' },
      { eu: 'XL', uk: '45"', us: 'XL', cm: '109–115' },
    ],
    variants: [
      { code: 'All-Weather', name: 'Player-Issue Slim Cut', studInfo: 'Anatomical torso taper with high-stretch raglan sleeves' },
      { code: 'FG', name: 'Club Tailored Standard', studInfo: 'Relaxed pitch-to-terrace silhouette with identical jacquard fabric' },
    ],
    specs: [
      { label: 'Garment Weight (Size M)', value: '142 g' },
      { label: 'Fabric Construction', value: '28-Gauge Circular Jacquard' },
      { label: 'Air Permeability', value: '410 mm/s (ISO 9237)' },
      { label: 'Collar Trim', value: '2x2 Ribbed Mercerized Trim' },
    ],
    customizable: {
      allowName: true,
      allowNumber: true,
      maxNameLength: 12,
      fee: 22,
      label: 'Official Felt Back Name & Squad Number',
    },
  },
  {
    id: 'trasferta-away-jersey',
    sku: 'SA-KT-104',
    name: 'Trasferta Aero-Mesh Away Shirt',
    subtitle: 'Ultra-Light 128g Climacool Weave · Chalk & Crimson Trim',
    category: 'kits',
    categoryLabel: 'Áo Đấu · Match Kits',
    price: 160,
    weightGrams: 128,
    surface: 'All-Weather',
    surfaceLabel: 'High-Heat Fixture Spec',
    statusTag: '128g Ultra-Light',
    image: '/src/assets/images/product_match_jersey_1794307153903.jpg',
    description:
      'Developed for high-humidity away fixtures. Open-cell micro-perforated side panels channel cross-breeze directly across the ribcage while anti-cling interior yarns prevent wet fabric adhesion.',
    craftsmanshipNote:
      'Laser-perforated underarm gussets and ultrasonic bonded hem reduce seam bulk by 34%.',
    sizes: [
      { eu: 'S', uk: '36"', us: 'S', cm: '92–96' },
      { eu: 'M', uk: '39"', us: 'M', cm: '97–102' },
      { eu: 'L', uk: '42"', us: 'L', cm: '103–108' },
      { eu: 'XL', uk: '45"', us: 'XL', cm: '109–115' },
    ],
    variants: [
      { code: 'All-Weather', name: 'Player-Issue Slim Cut', studInfo: 'Zero-drag race cut with bonded hem' },
      { code: 'FG', name: 'Club Tailored Standard', studInfo: 'Classic tailored fit with woven locker tag' },
    ],
    specs: [
      { label: 'Garment Weight (Size M)', value: '128 g' },
      { label: 'Seam Bonding', value: 'Ultrasonic Flat-Weld' },
      { label: 'Air Permeability', value: '485 mm/s (ISO 9237)' },
      { label: 'UV Protection', value: 'UPF 50+ Ceramic Yarn' },
    ],
    customizable: {
      allowName: true,
      allowNumber: true,
      maxNameLength: 12,
      fee: 22,
      label: 'Official Felt Back Name & Squad Number',
    },
  },

  // ================= 02. BÓNG THI ĐẤU (BALLS) =================
  {
    id: 'architect-match-ball',
    sku: 'SA-BL-302',
    name: 'Architect Pro Official Match Ball',
    subtitle: 'Thermally Bonded 14-Panel Geometry · Micro-Dimpled Shell',
    category: 'balls',
    categoryLabel: 'Bóng · Match Balls',
    price: 165,
    weightGrams: 432,
    surface: 'All-Weather',
    surfaceLabel: 'FIFA Quality Pro',
    statusTag: 'FIFA Quality Pro',
    image: '/src/assets/images/product_match_ball_1794307155925.jpg',
    description:
      'Wind-tunnel calibrated 14-panel thermally bonded match ball. Aerodynamic micro-grooves stabilize boundary-layer airflow at velocities above 95 km/h, eliminating unpredictable knuckle wobble on long diagonal switches.',
    craftsmanshipNote:
      'High-frequency thermal fusion eliminates thread stitching for 0.0% water absorption in torrential match conditions.',
    sizes: [
      { eu: 'Size 5', uk: 'Size 5', us: 'Size 5', cm: '68.5–69.5' },
      { eu: 'Size 4', uk: 'Size 4', us: 'Size 4', cm: '63.5–66.0' },
    ],
    variants: [
      { code: 'All-Weather', name: 'Chalk / Crimson / Slate', studInfo: 'High-contrast geometric tracking graphic for floodlit pitches' },
      { code: 'SG-Pro', name: 'Winter Hi-Vis Optic', studInfo: 'High-luminance pigment coating for low-visibility winter fixtures' },
    ],
    specs: [
      { label: 'Official Match Mass', value: '432 g' },
      { label: 'Sphericity Deviation', value: '< 1.1%' },
      { label: 'Pressure Loss (72 hr)', value: '< 4.0%' },
      { label: 'Bladder Core', value: 'Carbon-Latex Butyl Valve' },
    ],
    customizable: {
      allowName: true,
      allowNumber: false,
      maxNameLength: 10,
      fee: 15,
      label: 'Club / Squad Panel Stencil',
    },
  },
  {
    id: 'notturno-floodlight-ball',
    sku: 'SA-BL-309',
    name: 'Notturno Floodlight Winter Pro Ball',
    subtitle: 'High-Visibility Crimson Tracking Matrix · 4-Ply EPDM Foam',
    category: 'balls',
    categoryLabel: 'Bóng · Match Balls',
    price: 175,
    weightGrams: 435,
    surface: 'SG-Pro',
    surfaceLabel: 'Wet & Winter Pitch Spec',
    statusTag: 'Winter Hi-Vis',
    image: '/src/assets/images/product_match_ball_1794307155925.jpg',
    description:
      'Calibrated specifically for wet, frost-hardened, and floodlit evening pitches. A 4.0 mm EPDM nitrogen-cell foam backing maintains consistent rebound elasticity even when pitch temperatures drop below 2°C.',
    craftsmanshipNote:
      'Hydro-repellent fluorocarbon topcoat sheds surface mud and standing water on impact.',
    sizes: [
      { eu: 'Size 5', uk: 'Size 5', us: 'Size 5', cm: '68.5–69.5' },
    ],
    variants: [
      { code: 'SG-Pro', name: 'Floodlight Crimson / Obsidian', studInfo: 'High-frequency optical contrast pattern for peripheral vision tracking' },
      { code: 'All-Weather', name: 'Standard Day Match Spec', studInfo: 'Classic chalk white base with slate flight rings' },
    ],
    specs: [
      { label: 'Official Match Mass', value: '435 g' },
      { label: 'Cold Rebound Stability', value: '-5°C to +35°C' },
      { label: 'Water Uptake', value: '0.0% Thermal Weld' },
      { label: 'Surface Micro-Grooves', value: '0.4 mm Aero-Channels' },
    ],
    customizable: {
      allowName: true,
      allowNumber: false,
      maxNameLength: 10,
      fee: 15,
      label: 'Club / Squad Panel Stencil',
    },
  },

  // ================= 03. GIÀY ĐINH (BOOTS) =================
  {
    id: 'kronos-carbon-fg',
    sku: 'SA-FW-019',
    name: 'Veloce Carbon XI Firm-Ground',
    subtitle: '11-Layer Biaxial Carbon Soleplate · Micro-Textured Fly-Weave',
    category: 'boots',
    categoryLabel: 'Giày · Pitch Boots',
    price: 295,
    weightGrams: 178,
    surface: 'FG',
    surfaceLabel: 'Firm Ground (FG)',
    statusTag: 'Limited Run',
    image: '/src/assets/images/product_carbon_boot_1794307152493.jpg',
    description:
      'Engineered for explosive first-step propulsion on natural dry and slightly wet grass pitches. The aerospace-grade 11-layer biaxial carbon chassis returns 91.4% of forefoot flexion energy while locking the calcaneus in an anatomical heel pocket.',
    craftsmanshipNote:
      'Lasted for 72 hours in our Montebelluna workshop to eliminate internal seam pressure during high-angle cutting maneuvers.',
    sizes: [
      { eu: '40', uk: '6.5', us: '7.5', cm: '25.0' },
      { eu: '41', uk: '7.5', us: '8.5', cm: '26.0' },
      { eu: '42', uk: '8.0', us: '9.0', cm: '26.5' },
      { eu: '42.5', uk: '8.5', us: '9.5', cm: '27.0' },
      { eu: '43', uk: '9.0', us: '10.0', cm: '27.5' },
      { eu: '44', uk: '9.5', us: '10.5', cm: '28.0' },
      { eu: '45', uk: '10.5', us: '11.5', cm: '29.0' },
    ],
    variants: [
      { code: 'FG', name: 'Firm Ground (FG)', studInfo: '11 bladed chevron carbon studs for natural short-grass turf' },
      { code: 'SG-Pro', name: 'Soft Ground Pro (SG-Pro)', studInfo: '6 replaceable CNC aluminum conical studs + 5 molded blades' },
      { code: 'AG', name: 'Artificial Grass (AG)', studInfo: '15 hollow conical TPU studs with heat-dissipating soleplate' },
    ],
    specs: [
      { label: 'Single Boot Mass (EU 42)', value: '178 g' },
      { label: 'Soleplate Architecture', value: '11-Ply Biaxial Carbon' },
      { label: '90-Min Water Uptake', value: '0.2%' },
      { label: 'Upper Thickness', value: '1.15 mm Micro-Weave' },
    ],
    customizable: {
      allowName: true,
      allowNumber: true,
      maxNameLength: 8,
      fee: 20,
      label: 'Laser Heel ID & Squad Number',
    },
  },
  {
    id: 'aurora-heritage-leather',
    sku: 'SA-FW-004',
    name: 'Aurora 1928 K-Leather SG/FG',
    subtitle: 'Quilted Unbleached Kangaroo Leather · Fold-Over Tongue',
    category: 'boots',
    categoryLabel: 'Giày · Pitch Boots',
    price: 265,
    weightGrams: 218,
    surface: 'SG-Pro',
    surfaceLabel: 'Hybrid Soft/Firm Ground',
    statusTag: 'Hand-Lasted',
    image: '/src/assets/images/product_leather_boot_1794307156020.jpg',
    description:
      'A purist playmaker boot crafted from drum-dyed, chrome-free kangaroo leather with diamond forefoot quilting that molds to the exact contours of your instep within two training sessions.',
    craftsmanshipNote:
      'Features brushed titanium-alloy conical studs and a vegetable-tanned leather heel lining for zero heel slip in wet conditions.',
    sizes: [
      { eu: '40', uk: '6.5', us: '7.5', cm: '25.0' },
      { eu: '41', uk: '7.5', us: '8.5', cm: '26.0' },
      { eu: '42', uk: '8.0', us: '9.0', cm: '26.5' },
      { eu: '43', uk: '9.0', us: '10.0', cm: '27.5' },
      { eu: '44', uk: '9.5', us: '10.5', cm: '28.0' },
      { eu: '45', uk: '10.5', us: '11.5', cm: '29.0' },
    ],
    variants: [
      { code: 'SG-Pro', name: 'Mixed Pitch (SG-Pro)', studInfo: 'Brushed titanium conical studs for lush or damp natural grass' },
      { code: 'FG', name: 'Classic 12-Stud (FG)', studInfo: '12 conical Pebax studs for balanced rotational release' },
    ],
    specs: [
      { label: 'Single Boot Mass (EU 42)', value: '218 g' },
      { label: 'Vamp Material', value: '1.6 mm Full-Grain K-Leather' },
      { label: 'Stitch Density', value: '9 Stitches / cm' },
      { label: 'Stud Material', value: 'Brushed Titanium Alloy' },
    ],
    customizable: {
      allowName: true,
      allowNumber: true,
      maxNameLength: 8,
      fee: 25,
      label: 'Gold-Foil Tongue Embossing',
    },
  },
  {
    id: 'kronos-ag-elite',
    sku: 'SA-FW-022',
    name: 'Veloce Carbon XI Artificial-Pitch',
    subtitle: 'Heat-Shield Carbon Chassis · 15 Conical Hollow Studs',
    category: 'boots',
    categoryLabel: 'Giày · Pitch Boots',
    price: 280,
    weightGrams: 186,
    surface: 'AG',
    surfaceLabel: 'Artificial Grass (AG)',
    statusTag: 'Knee-Safe AG',
    image: '/src/assets/images/hero_pitch_boot_1794307152243.jpg',
    description:
      'Purpose-built for 3G and 4G synthetic rubber-crumb turf. Replaces aggressive bladed cleats with 15 multi-depth hollow conical studs to reduce rotational knee torque by 38% while preserving full carbon snap.',
    craftsmanshipNote:
      'Reinforced with a 0.6 mm ballistic TPU toe-bumper lamination to prevent artificial turf abrasion from delaminating the forefoot.',
    sizes: [
      { eu: '40', uk: '6.5', us: '7.5', cm: '25.0' },
      { eu: '41', uk: '7.5', us: '8.5', cm: '26.0' },
      { eu: '42', uk: '8.0', us: '9.0', cm: '26.5' },
      { eu: '42.5', uk: '8.5', us: '9.5', cm: '27.0' },
      { eu: '43', uk: '9.0', us: '10.0', cm: '27.5' },
      { eu: '44', uk: '9.5', us: '10.5', cm: '28.0' },
    ],
    variants: [
      { code: 'AG', name: '3G/4G Artificial Grass (AG)', studInfo: '15 hollow conical studs with thermal midsole barrier' },
      { code: 'FG', name: 'Firm Ground (FG)', studInfo: '11 bladed chevron carbon studs for natural grass' },
    ],
    specs: [
      { label: 'Single Boot Mass (EU 42)', value: '186 g' },
      { label: 'Rotational Torque Reduction', value: '-38% vs Bladed FG' },
      { label: 'Toe Abrasion Shield', value: '0.6 mm Ballistic TPU' },
      { label: 'Thermal Insulation', value: 'Aerogel Insole Liner' },
    ],
    customizable: {
      allowName: true,
      allowNumber: true,
      maxNameLength: 8,
      fee: 20,
      label: 'Laser Heel ID & Squad Number',
    },
  },

  // ================= 04. GĂNG THỦ MÔN (GLOVES) =================
  {
    id: 'adaptive-grip-gloves',
    sku: 'SA-GK-408',
    name: 'Adaptive Grip Pro Negative-Cut GK',
    subtitle: '4.0 mm German Contact Latex · Removable Wrist Strap',
    category: 'gloves',
    categoryLabel: 'Găng · GK Gloves',
    price: 140,
    weightGrams: 245,
    surface: 'All-Weather',
    surfaceLabel: 'All-Weather Latex',
    statusTag: '4mm Contact Latex',
    image: '/src/assets/images/product_gk_gloves_1794307156833.jpg',
    description:
      'Internal negative-stitched gussets wrap the index and little fingers in continuous 4.0 mm German Contact Latex for a second-skin ball feel without internal seam ridges.',
    craftsmanshipNote:
      '3D-injected silicone punch zone over a breathable neoprene backhand provides directional clearance control without restricting fist flexion.',
    sizes: [
      { eu: '8.0', uk: '8.0', us: '8.0', cm: '19.5' },
      { eu: '8.5', uk: '8.5', us: '8.5', cm: '20.5' },
      { eu: '9.0', uk: '9.0', us: '9.0', cm: '21.5' },
      { eu: '9.5', uk: '9.5', us: '9.5', cm: '22.5' },
      { eu: '10.0', uk: '10.0', us: '10.0', cm: '23.5' },
      { eu: '10.5', uk: '10.5', us: '10.5', cm: '24.5' },
    ],
    variants: [
      { code: 'All-Weather', name: 'Negative Cut (Fingerless Spine)', studInfo: 'Maximum latex-to-ball tactile feedback' },
      { code: 'SG-Pro', name: 'Negative Cut + 4-Finger Ortho-Spine', studInfo: 'Removable bi-directional hyperextension protection rods' },
    ],
    specs: [
      { label: 'Pair Weight (Size 9)', value: '245 g' },
      { label: 'Palm Compound', value: '4.0 mm German Contact + 3 mm Foam' },
      { label: 'Cut Geometry', value: 'Rolled-Thumb Negative Cut' },
      { label: 'Backhand Matrix', value: 'Perforated Compression Neoprene' },
    ],
    customizable: {
      allowName: true,
      allowNumber: true,
      maxNameLength: 8,
      fee: 15,
      label: 'Wrist Strap Keeper ID Print',
    },
  },
  {
    id: 'aqua-shield-gk-gloves',
    sku: 'SA-GK-412',
    name: 'AcquaTempesta Hybrid Roll-Finger GK',
    subtitle: '4.5 mm Hydro-Absorb German Latex · Dual-Tension Cuff',
    category: 'gloves',
    categoryLabel: 'Găng · GK Gloves',
    price: 155,
    weightGrams: 262,
    surface: 'SG-Pro',
    surfaceLabel: 'Wet Pitch Hydro-Latex',
    statusTag: 'Wet-Weather Pro',
    image: '/src/assets/images/product_gk_gloves_1794307156833.jpg',
    description:
      'Engineered with porous hydro-activated latex micro-cells that increase surface tackiness when saturated with rainwater. Hybrid roll-negative finger geometry maximizes ball contact area on high crosses.',
    craftsmanshipNote:
      'Extended latex palm wrap along the ulnar edge prevents ball slip when parrying low shots across wet turf.',
    sizes: [
      { eu: '8.0', uk: '8.0', us: '8.0', cm: '19.5' },
      { eu: '8.5', uk: '8.5', us: '8.5', cm: '20.5' },
      { eu: '9.0', uk: '9.0', us: '9.0', cm: '21.5' },
      { eu: '9.5', uk: '9.5', us: '9.5', cm: '22.5' },
      { eu: '10.0', uk: '10.0', us: '10.0', cm: '23.5' },
    ],
    variants: [
      { code: 'SG-Pro', name: 'Roll-Negative Hybrid Cut', studInfo: 'Rolled index/pinky with negative middle fingers for wet grip' },
      { code: 'All-Weather', name: 'Ortho-Spine Armed Edition', studInfo: 'Includes 5 removable carbon-composite finger spines' },
    ],
    specs: [
      { label: 'Pair Weight (Size 9)', value: '262 g' },
      { label: 'Palm Compound', value: '4.5 mm Hydro-Contact Latex' },
      { label: 'Wet Grip Index', value: '1.42 μ Coefficient' },
      { label: 'Wrist Closure', value: '360° Elastic Neoprene Tunnel' },
    ],
    customizable: {
      allowName: true,
      allowNumber: true,
      maxNameLength: 8,
      fee: 15,
      label: 'Wrist Strap Keeper ID Print',
    },
  },
];
