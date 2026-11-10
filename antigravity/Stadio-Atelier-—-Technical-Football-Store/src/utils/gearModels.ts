import * as THREE from 'three';
import { ProductCategory } from '../data/products';

export interface LayerTelemetry {
  id: string;
  code: string;
  nameVi: string;
  nameEn: string;
  material: string;
  metric: string;
  detail: string;
}

export interface ColorwayPreset {
  id: string;
  name: string;
  swatchHex: string;
  secondaryHex: string;
  primaryColor: number;
  secondaryColor: number;
  accentColor: number;
  trimColor: number;
}

export interface ExplodablePart {
  id: string;
  layerId: string;
  mesh: THREE.Object3D;
  basePos: THREE.Vector3;
  explodedPos: THREE.Vector3;
  baseRot: THREE.Euler;
  explodedRot: THREE.Euler;
  highlightMaterials: THREE.MeshStandardMaterial[];
}

export const CATEGORY_LAYERS: Record<ProductCategory, LayerTelemetry[]> = {
  kits: [
    {
      id: 'kit-crest',
      code: 'L01',
      nameVi: 'Huy Hiệu Dệt Nổi & 4 Sao Thêu 3D',
      nameEn: '3D Woven Crest & 4 Embroidered Stars',
      material: 'High-Density Satin Stitch + TPU Relief',
      metric: '0.8 mm Tactile Relief',
      detail: 'Huy hiệu tròn đa vòng sắc nét kết hợp 4 ngôi sao 5 cánh thêu nổi 3D bắt sáng theo góc nhìn.',
    },
    {
      id: 'kit-shell',
      code: 'L02',
      nameVi: 'Vải Dệt Nổi Jacquard Hình Học 28-Gauge',
      nameEn: 'Geometric Embossed Jacquard Knit',
      material: 'Hydrophobic Micro-Filament PES',
      metric: '142 g · 410 mm/s Airflow',
      detail: 'Họa tiết tam giác & kim cương dập nổi nguyên khối trên bề mặt vải kèm viền cổ dệt gân 2x2.',
    },
    {
      id: 'kit-core',
      code: 'L03',
      nameVi: 'Lõi Thoát Nhiệt Lồng Ngực & Lưới Hông',
      nameEn: 'Thoracic Thermal Vent & Mesh Gusset',
      material: 'Open-Cell Diamond Capillary Mesh',
      metric: '3.4x Moisture Evacuation',
      detail: 'Mảng lưới mắt cáo thoáng khí ở sườn áo và rãnh thoát nhiệt cột sống giúp hạ nhiệt nhanh.',
    },
    {
      id: 'kit-sleeves',
      code: 'L04',
      nameVi: 'Tay Áo Raglan Khí Động Học',
      nameEn: 'Articulated Raglan Sleeves',
      material: '4-Way Stretch Elastane Knit',
      metric: 'Zero-Chafe Ultrasonic Seam',
      detail: 'Đường ép nhiệt siêu âm phẳng và cắt chéo Raglan giải phóng hoàn toàn biên độ xoay khớp vai.',
    },
  ],
  balls: [
    {
      id: 'ball-panels',
      code: 'L01',
      nameVi: '20 Tấm Vỏ Khí Động Học Ép Nhiệt',
      nameEn: 'Thermally Bonded Aero Panels',
      material: 'Micro-Dimpled PU Shell',
      metric: '0.0% Water Uptake',
      detail: 'Các tấm vỏ đa diện tích hợp rãnh vi điểm 0.4mm giúp ổn định lớp biên không khí ở vận tốc >95 km/h.',
    },
    {
      id: 'ball-foam',
      code: 'L02',
      nameVi: 'Khung Đệm Đàn Hồi EPDM 4-Ply',
      nameEn: 'EPDM Nitrogen-Cell Foam Cage',
      material: '4.0 mm Cross-Linked EPDM Foam',
      metric: '98.2% Rebound Consistency',
      detail: 'Lớp bọt khí nitơ kín hấp thụ xung lực và duy trì độ nảy chuẩn FIFA từ -5°C đến +35°C.',
    },
    {
      id: 'ball-carcass',
      code: 'L03',
      nameVi: 'Mạng Sợi Gia Cường Đa Hướng',
      nameEn: 'Geodesic Filament Winding Matrix',
      material: 'High-Tenacity Polyester Twill',
      metric: '< 1.1% Sphericity Deviation',
      detail: 'Khung sợi căng đa trục giữ độ tròn tuyệt đối sau hơn 2,000 cú sút ở vận tốc cao.',
    },
    {
      id: 'ball-bladder',
      code: 'L04',
      nameVi: 'Ruột Bóng Carbon-Latex & Van Kín',
      nameEn: 'Carbon-Latex Bladder Core',
      material: 'Natural Latex + Carbon Black + Butyl Valve',
      metric: '< 4.0% Pressure Loss / 72h',
      detail: 'Ruột bóng pha hạt carbon siêu đàn hồi cùng van khóa khí kép chống rò rỉ áp suất.',
    },
  ],
  boots: [
    {
      id: 'boot-upper',
      code: 'L01',
      nameVi: 'Thân Giày Fly-Weave & Vân Ma Sát',
      nameEn: 'Hydrophobic Fly-Weave & Grip Ribs',
      material: '1.15 mm Micro-Filament + 0.08 mm Grip Skin',
      metric: '0.2% Water Uptake',
      detail: 'Vân nổi khí động học ở má trong và mu bàn chân tăng tốc độ xoáy bóng trong điều kiện sân ướt.',
    },
    {
      id: 'boot-heel',
      code: 'L02',
      nameVi: 'Khung Khóa Gót Carbon Ngoại Vi',
      nameEn: 'External Calcaneus Carbon Lock',
      material: 'Forged Carbon Composite + Suede Pods',
      metric: 'Zero Internal Heel Slip',
      detail: 'Ôm trọn xương gót chân và gân Achilles, chống lật cổ chân khi đổi hướng đột ngột ở góc gắt.',
    },
    {
      id: 'boot-insole',
      code: 'L03',
      nameVi: 'Lót Giày Giải Phẫu Học Aerogel',
      nameEn: 'Anatomical Dual-Density Footbed',
      material: 'Pebax Foam + Forefoot Flex Channels',
      metric: '-32% Peak Stud Pressure',
      detail: 'Thiết kế uốn lượn theo vòm bàn chân kết hợp đệm giảm chấn gót và rãnh gập xương bàn chân.',
    },
    {
      id: 'boot-carbon',
      code: 'L04',
      nameVi: 'Đế Sợi Carbon Biaxial 11 Lớp',
      nameEn: '11-Ply Biaxial Carbon Chassis',
      material: 'Aerospace Pre-Preg Carbon Fiber',
      metric: '91.4% Energy Return',
      detail: 'Độ cứng phân bổ theo vùng: mũi giày đàn hồi cực nhanh trong 0.04s, giữa bàn chân chống xoắn trục.',
    },
    {
      id: 'boot-studs',
      code: 'L05',
      nameVi: 'Hệ Đinh Chevron & Conical Titanium',
      nameEn: 'Titanium-Base Chevron & Conical Studs',
      material: 'CNC Brushed Titanium + TPU Tips',
      metric: '11-Stud Tri-Zone Traction',
      detail: 'Đinh mũi hình mũi tên tạo lực đạp bứt tốc bước đầu; đinh gót ổn định lực phanh trụ.',
    },
  ],
  gloves: [
    {
      id: 'glove-palm',
      code: 'L01',
      nameVi: 'Mặt Mút German Contact Latex 4.0mm',
      nameEn: '4.0mm German Contact Latex Palm',
      material: '4mm Natural Contact Latex + 3mm Damping Foam',
      metric: '1.42 μ Wet Grip Coefficient',
      detail: 'Cấu trúc vi bọt hút nước kích hoạt độ dính tối đa ngay cả dưới trời mưa lớn.',
    },
    {
      id: 'glove-spines',
      code: 'L02',
      nameVi: '5 Thanh Xương Carbon Ortho-Spine',
      nameEn: '5-Finger Carbon Ortho-Spines',
      material: 'Articulated Bi-Directional Carbon Rods',
      metric: '180° Hyperextension Lock',
      detail: 'Cho phép nắm tay linh hoạt nhưng khóa cứng ngay lập tức khi chịu lực sút căng cận thành.',
    },
    {
      id: 'glove-backhand',
      code: 'L03',
      nameVi: 'Mu Găng Neoprene & Vùng Đấm Bóng 3D',
      nameEn: 'Neoprene Backhand & 3D Silicone Punch Zone',
      material: 'Perforated Compression Neoprene + Silicone Fins',
      metric: 'Directional Clearance Control',
      detail: 'Các gờ silicone đúc nổi 3D trên khớp ngón tay truyền lực chính xác khi đấm bóng giải nguy.',
    },
    {
      id: 'glove-wrist',
      code: 'L04',
      nameVi: 'Đai Cổ Tay 360° Dual-Tension',
      nameEn: '360° Elastic Neoprene Wrist Tunnel',
      material: 'Elastic Latex Wrap + Keeper ID Window',
      metric: '245 g Total Pair Mass',
      detail: 'Cổ tay liền mạch ôm khít khớp cổ tay kèm đai quấn 2 vòng cố định chắc chắn.',
    },
  ],
};

export const CATEGORY_COLORWAYS: Record<ProductCategory, ColorwayPreset[]> = {
  kits: [
    {
      id: 'dfb-heimtrikot-white',
      name: 'Heimtrikot 2024 (Pure White / Obsidian)',
      swatchHex: '#f8fafc',
      secondaryHex: '#09090b',
      primaryColor: 0xf4f4f2,
      secondaryColor: 0xfafaf9,
      accentColor: 0x141413,
      trimColor: 0xd6d3d1,
    },
    {
      id: 'maestro-navy',
      name: 'Maestro Home (Midnight Navy / Chalk)',
      swatchHex: '#172554',
      secondaryHex: '#e11d48',
      primaryColor: 0x172554,
      secondaryColor: 0xf5f5f4,
      accentColor: 0xe11d48,
      trimColor: 0x38bdf8,
    },
    {
      id: 'notturno-obsidian',
      name: 'Terza Kit (Obsidian / Gold)',
      swatchHex: '#18181b',
      secondaryHex: '#eab308',
      primaryColor: 0x18181b,
      secondaryColor: 0xd4af37,
      accentColor: 0xeab308,
      trimColor: 0xfef08a,
    },
  ],
  balls: [
    {
      id: 'architect-pro',
      name: 'Architect Pro (Chalk / Crimson)',
      swatchHex: '#fafaf9',
      secondaryHex: '#e11d48',
      primaryColor: 0xfafaf9,
      secondaryColor: 0x1c1917,
      accentColor: 0xe11d48,
      trimColor: 0x94a3b8,
    },
    {
      id: 'notturno-hivis',
      name: 'Notturno Winter (Hi-Vis Optic)',
      swatchHex: '#facc15',
      secondaryHex: '#e11d48',
      primaryColor: 0xfacc15,
      secondaryColor: 0x09090b,
      accentColor: 0xe11d48,
      trimColor: 0xf97316,
    },
    {
      id: 'finale-cobalt',
      name: 'Finale Champions (Pearl / Cobalt)',
      swatchHex: '#e2e8f0',
      secondaryHex: '#2563eb',
      primaryColor: 0xf1f5f9,
      secondaryColor: 0x0f172a,
      accentColor: 0x2563eb,
      trimColor: 0x38bdf8,
    },
  ],
  boots: [
    {
      id: 'veloce-obsidian',
      name: 'Veloce Carbon XI (Obsidian / Crimson)',
      swatchHex: '#1c1917',
      secondaryHex: '#e11d48',
      primaryColor: 0x18181b,
      secondaryColor: 0x09090b,
      accentColor: 0xe11d48,
      trimColor: 0xf4f4f5,
    },
    {
      id: 'aurora-heritage',
      name: 'Aurora 1928 K-Leather (Ivory / Gold)',
      swatchHex: '#f5f5f4',
      secondaryHex: '#ca8a04',
      primaryColor: 0xf2efe9,
      secondaryColor: 0x27272a,
      accentColor: 0xd97706,
      trimColor: 0x78350f,
    },
    {
      id: 'veloce-ag-cyan',
      name: 'Veloce AG Elite (Slate / Electric Cyan)',
      swatchHex: '#0f172a',
      secondaryHex: '#06b6d4',
      primaryColor: 0x0f172a,
      secondaryColor: 0x09090b,
      accentColor: 0x06b6d4,
      trimColor: 0x38bdf8,
    },
  ],
  gloves: [
    {
      id: 'adaptive-pro',
      name: 'Adaptive Grip Pro (Chalk / Crimson)',
      swatchHex: '#f5f5f4',
      secondaryHex: '#e11d48',
      primaryColor: 0xf5f5f4,
      secondaryColor: 0x1c1917,
      accentColor: 0xe11d48,
      trimColor: 0x57534e,
    },
    {
      id: 'acquatempesta-wet',
      name: 'AcquaTempesta Wet (Hydro Cyan / Obsidian)',
      swatchHex: '#38bdf8',
      secondaryHex: '#0f172a',
      primaryColor: 0xe0f2fe,
      secondaryColor: 0x0f172a,
      accentColor: 0x0284c7,
      trimColor: 0x38bdf8,
    },
    {
      id: 'blackout-keeper',
      name: 'Shadow Edition (Stealth Black / Gold)',
      swatchHex: '#18181b',
      secondaryHex: '#eab308',
      primaryColor: 0x27272a,
      secondaryColor: 0x09090b,
      accentColor: 0xeab308,
      trimColor: 0x71717a,
    },
  ],
};

// ============================================================================
// PROCEDURAL CANVAS TEXTURE GENERATORS
// ============================================================================

export function createStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0xdfddd8);

  // Overhead daylight softbox
  const topBox = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  topBox.position.set(0, 8, 0);
  topBox.rotation.x = Math.PI / 2;
  envScene.add(topBox);

  // Left soft key light
  const leftStrip = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 8),
    new THREE.MeshBasicMaterial({ color: 0xf8fafc })
  );
  leftStrip.position.set(-8, 4, 5);
  leftStrip.lookAt(0, 0, 0);
  envScene.add(leftStrip);

  // Right grazing fill strip for embossed fabric relief
  const rightStrip = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 6),
    new THREE.MeshBasicMaterial({ color: 0xe7e5e4 })
  );
  rightStrip.position.set(8, 2, 4);
  rightStrip.lookAt(0, 0, 0);
  envScene.add(rightStrip);

  // Warm studio floor bounce
  const floorBox = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 18),
    new THREE.MeshBasicMaterial({ color: 0xd6d3d1 })
  );
  floorBox.position.set(0, -6, 0);
  floorBox.rotation.x = -Math.PI / 2;
  envScene.add(floorBox);

  const envTexture = pmremGenerator.fromScene(envScene, 0.04).texture;
  pmremGenerator.dispose();
  return envTexture;
}

export function createCarbonWeaveTexture(): {
  map: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#09090b';
  ctx.fillRect(0, 0, 256, 256);

  const step = 16;
  for (let y = 0; y < 256; y += step) {
    for (let x = 0; x < 256; x += step) {
      const isAlt = (x / step + y / step) % 2 === 0;
      const grad = ctx.createLinearGradient(x, y, x + step, y + step);
      if (isAlt) {
        grad.addColorStop(0, '#18181b');
        grad.addColorStop(0.5, '#3f3f46');
        grad.addColorStop(1, '#09090b');
      } else {
        grad.addColorStop(0, '#09090b');
        grad.addColorStop(0.5, '#27272a');
        grad.addColorStop(1, '#18181b');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, step - 1, step - 1);
    }
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(6, 3);

  const bumpMap = new THREE.CanvasTexture(canvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(6, 3);

  return { map, bumpMap };
}

/**
 * Generates the iconic DFB Heimtrikot 2024 geometric triangle/diamond embossed
 * jacquard knit relief texture + fine micro-knit ribbing.
 */
export function createJacquardKnitTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Base raised jacquard ridge height
  ctx.fillStyle = '#b8b8b8';
  ctx.fillRect(0, 0, 1024, 1024);

  // Fine diagonal micro-knit thread texture across entire fabric
  ctx.strokeStyle = '#a4a4a4';
  ctx.lineWidth = 1.2;
  for (let i = -1024; i < 2048; i += 5) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 1024, 1024);
    ctx.stroke();
  }

  // Draw recessed geometric triangles & chevrons (DFB Heimtrikot 2024 pattern)
  const tile = 256;
  for (let ty = 0; ty < 1024; ty += tile) {
    for (let tx = 0; tx < 1024; tx += tile) {
      ctx.save();
      ctx.translate(tx, ty);

      const drawRecessedPolygon = (pts: [number, number][], depthGray: string) => {
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i][0], pts[i][1]);
        }
        ctx.closePath();
        ctx.fillStyle = depthGray;
        ctx.fill();

        // Crisp embossed seam bevel around each triangle
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#dcdcdc';
        ctx.stroke();

        // Inner fine knit lines inside the recessed triangle
        ctx.save();
        ctx.clip();
        ctx.strokeStyle = '#686868';
        ctx.lineWidth = 1.5;
        for (let k = -tile; k < tile * 2; k += 6) {
          ctx.beginPath();
          ctx.moveTo(k, 0);
          ctx.lineTo(k - tile, tile);
          ctx.stroke();
        }
        ctx.restore();
      };

      // Upper-left triangle
      drawRecessedPolygon(
        [
          [18, 14],
          [158, 14],
          [68, 142],
        ],
        '#7c7c7c'
      );

      // Center-right large geometric wedge
      drawRecessedPolygon(
        [
          [176, 18],
          [242, 118],
          [112, 168],
        ],
        '#727272'
      );

      // Lower-left chevron facet
      drawRecessedPolygon(
        [
          [16, 162],
          [124, 182],
          [44, 244],
        ],
        '#767676'
      );

      // Lower-right diamond facet
      drawRecessedPolygon(
        [
          [142, 184],
          [242, 142],
          [228, 242],
          [96, 244],
        ],
        '#6e6e6e'
      );

      ctx.restore();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2.2, 2.2);
  return tex;
}

/**
 * Generates fine 2x2 ribbed knit collar bump map (visible in top-right macro view).
 */
export function createCollarRibTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  for (let x = 0; x < 512; x += 6) {
    ctx.fillStyle = '#e5e5e5';
    ctx.fillRect(x, 0, 3, 128);
    ctx.fillStyle = '#555555';
    ctx.fillRect(x + 3, 0, 3, 128);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 1);
  return tex;
}

/**
 * Generates the circular woven crest badge texture (inspired by DFB Heimtrikot 2024).
 */
export function createCircularCrestTexture(): {
  map: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;
  const cx = 512;
  const cy = 512;

  // Satin white woven badge background with subtle diagonal twill weave
  ctx.fillStyle = '#f5f5f4';
  ctx.fillRect(0, 0, 1024, 1024);

  ctx.strokeStyle = '#e7e5e4';
  ctx.lineWidth = 2;
  for (let i = -1024; i < 2048; i += 8) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 1024, 1024);
    ctx.stroke();
  }

  // Outer satin embroidered border ring
  ctx.beginPath();
  ctx.arc(cx, cy, 480, 0, Math.PI * 2);
  ctx.strokeStyle = '#d6d3d1';
  ctx.lineWidth = 34;
  ctx.stroke();

  // Segmented outer black ring (3 curved bars like DFB crest)
  const segments = [
    [-Math.PI * 0.78, -Math.PI * 0.22],
    [-Math.PI * 0.14, Math.PI * 0.44],
    [Math.PI * 0.56, Math.PI * 1.14],
  ];
  ctx.strokeStyle = '#141413';
  ctx.lineWidth = 42;
  ctx.lineCap = 'butt';
  segments.forEach(([startAngle, endAngle]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 422, startAngle, endAngle);
    ctx.stroke();
  });

  // Middle continuous black ring
  ctx.beginPath();
  ctx.arc(cx, cy, 366, 0, Math.PI * 2);
  ctx.strokeStyle = '#141413';
  ctx.lineWidth = 18;
  ctx.stroke();

  // Inner black ring enclosing the eagle emblem
  ctx.beginPath();
  ctx.arc(cx, cy, 246, 0, Math.PI * 2);
  ctx.strokeStyle = '#141413';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Circular Typography ("DEUTSCHER · FUSSBALL-BUND")
  const drawCircularText = (
    text: string,
    radius: number,
    startAngle: number,
    endAngle: number,
    flipBottom: boolean = false
  ) => {
    ctx.save();
    ctx.font = '800 54px "Plus Jakarta Sans", "Outfit", sans-serif';
    ctx.fillStyle = '#141413';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const chars = text.split('');
    const angleSpan = endAngle - startAngle;
    const step = angleSpan / Math.max(1, chars.length - 1);

    chars.forEach((ch, idx) => {
      const angle = startAngle + idx * step;
      ctx.save();
      ctx.translate(
        cx + Math.cos(angle) * radius,
        cy + Math.sin(angle) * radius
      );
      ctx.rotate(angle + (flipBottom ? -Math.PI / 2 : Math.PI / 2));
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    });
    ctx.restore();
  };

  drawCircularText('DEUTSCHER', 306, -Math.PI * 0.62, Math.PI * 0.06, false);
  drawCircularText('FUSSBALL-BUND', 306, Math.PI * 0.96, Math.PI * 0.22, true);

  // Heraldic Eagle Emblem in the Center
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = '#141413';

  // Eagle central torso & shield
  ctx.beginPath();
  ctx.moveTo(0, -135);
  ctx.bezierCurveTo(48, -110, 56, -20, 32, 65);
  ctx.lineTo(0, 118);
  ctx.lineTo(-32, 65);
  ctx.bezierCurveTo(-56, -20, -48, -110, 0, -135);
  ctx.fill();

  // Eagle head & beak (facing right/left heraldic)
  ctx.beginPath();
  ctx.arc(6, -136, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(28, -148);
  ctx.lineTo(68, -134);
  ctx.lineTo(32, -120);
  ctx.closePath();
  ctx.fill();

  // Spread heraldic wings with distinct feather slots (left & right)
  for (const side of [-1, 1]) {
    ctx.save();
    ctx.scale(side, 1);

    // Upper wing shoulder arch
    ctx.beginPath();
    ctx.moveTo(24, -82);
    ctx.bezierCurveTo(95, -138, 178, -112, 196, -54);
    ctx.lineTo(175, -38);
    ctx.bezierCurveTo(132, -72, 78, -74, 28, -42);
    ctx.closePath();
    ctx.fill();

    // 6 distinct vertical/fanned flight feathers
    for (let f = 0; f < 6; f++) {
      const fx = 52 + f * 24;
      const fyTop = -58 + f * 6;
      const fyBot = 58 - f * 8;
      ctx.beginPath();
      ctx.roundRect(fx, fyTop, 16, fyBot - fyTop, 8);
      ctx.fill();
    }

    // Talons & tail feathers at bottom
    ctx.beginPath();
    ctx.moveTo(22, 62);
    ctx.lineTo(78, 112);
    ctx.lineTo(54, 128);
    ctx.lineTo(14, 82);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // Center tail plume
  ctx.beginPath();
  ctx.moveTo(-26, 85);
  ctx.lineTo(0, 162);
  ctx.lineTo(26, 85);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  const map = new THREE.CanvasTexture(canvas);
  map.needsUpdate = true;

  const bumpMap = new THREE.CanvasTexture(canvas);
  bumpMap.needsUpdate = true;

  return { map, bumpMap };
}

/**
 * Builds a true 3D faceted 5-pointed embroidered star geometry.
 */
function createFivePointStarGeometry(
  outerR: number = 0.055,
  innerR: number = 0.023,
  height: number = 0.024
): THREE.BufferGeometry {
  const vertices: number[] = [];
  const pts: [number, number][] = [];

  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    pts.push([Math.cos(angle) * r, -Math.sin(angle) * r]);
  }

  // 10 triangular facets rising to the 3D star apex (0, 0, height)
  for (let i = 0; i < 10; i++) {
    const p1 = pts[i];
    const p2 = pts[(i + 1) % 10];
    vertices.push(0, 0, height, p1[0], p1[1], 0, p2[0], p2[1], 0);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.computeVertexNormals();
  return geo;
}

export function drawNumberPlateCanvas(
  canvas: HTMLCanvasElement,
  numStr: string = '10',
  nameStr: string = 'ROSSI'
): void {
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cleanName = (nameStr || 'ROSSI').trim().toUpperCase();
  const cleanNum = (numStr || '10').trim();

  // Top player name arch
  ctx.fillStyle = '#141413';
  ctx.font = '700 28px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(cleanName, 128, 48);

  // Squad number
  ctx.font = '800 150px "Outfit", sans-serif';
  ctx.strokeStyle = 'rgba(225, 29, 72, 0.9)';
  ctx.lineWidth = 5;
  ctx.strokeText(cleanNum, 128, 196);
  ctx.fillStyle = '#141413';
  ctx.fillText(cleanNum, 128, 196);

  // Bottom atelier crest mark
  ctx.font = '600 13px "JetBrains Mono", monospace';
  ctx.fillStyle = '#78716c';
  ctx.fillText('DFB · STADIO ATELIER 2024', 128, 232);
}

export function createNumberPlateTexture(
  numStr: string = '10',
  nameStr: string = 'ROSSI'
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  drawNumberPlateCanvas(canvas, numStr, nameStr);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function createBallDimpleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 256, 256);

  const spacing = 14;
  for (let y = 7; y < 256; y += spacing) {
    for (let x = 7; x < 256; x += spacing) {
      const offsetX = ((y / spacing) % 2) * (spacing * 0.5);
      ctx.fillStyle = '#525252';
      ctx.beginPath();
      ctx.arc((x + offsetX) % 256, y, 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#a3a3a3';
      ctx.beginPath();
      ctx.arc(((x + offsetX) % 256) - 1, y - 1, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  return tex;
}

// ============================================================================
// 1. BUILD KITS (ÁO ĐẤU) — DFB HEIMTRIKOT 2024 & JACQUARD MACRO ASSEMBLY
// ============================================================================

export function buildKitAssembly(
  registerMat: (mat: THREE.MeshStandardMaterial) => THREE.MeshStandardMaterial,
  knitBump: THREE.CanvasTexture,
  numberTex: THREE.CanvasTexture
): {
  group: THREE.Group;
  parts: ExplodablePart[];
  applyColorway: (preset: ColorwayPreset) => void;
} {
  const group = new THREE.Group();
  const parts: ExplodablePart[] = [];

  const collarRibBump = createCollarRibTexture();
  const crestTextures = createCircularCrestTexture();

  // Default to crisp DFB Heimtrikot 2024 White Embossed Jacquard
  const primaryMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xf4f4f2,
      roughness: 0.62,
      metalness: 0.04,
      bumpMap: knitBump,
      bumpScale: 0.036,
      clearcoat: 0.08,
      clearcoatRoughness: 0.6,
      side: THREE.DoubleSide,
    })
  );

  const secondaryMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xfafaf9,
      roughness: 0.55,
      metalness: 0.04,
      bumpMap: collarRibBump,
      bumpScale: 0.032,
    })
  );

  const accentMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0x141413,
      roughness: 0.34,
      metalness: 0.25,
      clearcoat: 0.35,
    })
  );

  const crestFaceMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: crestTextures.map,
      bumpMap: crestTextures.bumpMap,
      bumpScale: 0.018,
      roughness: 0.42,
      metalness: 0.08,
      clearcoat: 0.2,
    })
  );

  const ventCoreMat = registerMat(
    new THREE.MeshStandardMaterial({
      color: 0xd6d3d1,
      roughness: 0.4,
      metalness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.52,
    })
  );

  // --- LAYER 1: Sculpted Anatomical Torso Shell with Embossed Geometric Jacquard ---
  const torsoShellGroup = new THREE.Group();

  const torsoGeo = new THREE.CylinderGeometry(0.94, 0.85, 2.18, 64, 36, true);
  const posAttr = torsoGeo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < posAttr.count; i++) {
    v.fromBufferAttribute(posAttr, i);
    const normY = v.y / 1.09; // -1 to +1
    const angle = Math.atan2(v.z, v.x);

    let widthFactor = 1.0;
    if (normY > 0.65) {
      widthFactor = 1.18 - (normY - 0.65) * 1.42;
    } else if (normY > 0) {
      widthFactor = 1.02 + normY * 0.24;
    } else {
      widthFactor = 0.92 + Math.pow(Math.abs(normY), 1.6) * 0.12;
    }

    // Smooth athletic chest plane in front (z > 0) so the circular crest & 4 stars sit naturally
    const frontBump =
      v.z > 0 && normY > -0.1 && normY < 0.75
        ? Math.sin(((normY + 0.1) / 0.85) * Math.PI) *
          Math.pow(Math.sin(angle), 2) *
          0.12
        : 0;

    // Subtle fabric drape folds
    const drapeWave =
      v.z > 0 ? Math.sin(v.x * 5.2 + v.y * 3.8) * 0.008 : 0;

    const hemDrop =
      normY < -0.85 && v.z < 0 ? -0.08 * Math.abs(Math.sin(angle)) : 0;

    v.x *= widthFactor * 1.12;
    v.z = v.z * 0.54 + frontBump + drapeWave;
    v.y += hemDrop;
    posAttr.setXYZ(i, v.x, v.y, v.z);
  }
  torsoGeo.computeVertexNormals();

  const torsoMesh = new THREE.Mesh(torsoGeo, primaryMat);
  torsoShellGroup.add(torsoMesh);

  // Diagonal Heat-Bonded Seam Strip & Breathable Side Waffle Gusset (matching bottom-right of DFB photo)
  const seamTapeGeo = new THREE.BoxGeometry(0.032, 0.72, 0.015);
  const seamTape = new THREE.Mesh(seamTapeGeo, secondaryMat);
  seamTape.position.set(0.58, 0.14, 0.49);
  seamTape.rotation.z = -0.72;
  seamTape.rotation.y = 0.36;
  torsoShellGroup.add(seamTape);

  // Bottom ultrasonic bonded hem trim
  const hemGeo = new THREE.TorusGeometry(0.85, 0.03, 12, 48);
  hemGeo.scale(1.12, 0.55, 1);
  const hemMesh = new THREE.Mesh(hemGeo, secondaryMat);
  hemMesh.rotation.x = Math.PI / 2;
  hemMesh.position.set(0, -1.07, 0);
  torsoShellGroup.add(hemMesh);

  group.add(torsoShellGroup);
  parts.push({
    id: 'kit-torso-part',
    layerId: 'kit-shell',
    mesh: torsoShellGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 0, -0.28),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0, 0, 0),
    highlightMaterials: [primaryMat],
  });

  // --- LAYER 2: Inner Thoracic Thermal Vent Core ---
  const coreGroup = new THREE.Group();
  const coreGeo = new THREE.CylinderGeometry(0.82, 0.74, 1.88, 24, 14);
  coreGeo.scale(1.06, 1, 0.45);
  const coreMesh = new THREE.Mesh(coreGeo, ventCoreMat);
  coreGroup.add(coreMesh);

  group.add(coreGroup);
  parts.push({
    id: 'kit-core-part',
    layerId: 'kit-core',
    mesh: coreGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, -0.15, -0.92),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0.08, 0, 0),
    highlightMaterials: [ventCoreMat],
  });

  // --- LAYER 3: Left & Right Articulated Raglan Sleeves ---
  const buildSleeve = (side: -1 | 1) => {
    const sGroup = new THREE.Group();

    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.72, 0.88, 0),
      new THREE.Vector3(side * 1.12, 0.68, 0.03),
      new THREE.Vector3(side * 1.44, 0.32, 0.06),
      new THREE.Vector3(side * 1.62, 0.06, 0.08),
    ]);
    const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.28, 24, false);
    const tPos = tubeGeo.attributes.position;
    const tv = new THREE.Vector3();
    for (let i = 0; i < tPos.count; i++) {
      tv.fromBufferAttribute(tPos, i);
      const distOut = Math.max(0, (Math.abs(tv.x) - 0.72) / 0.9);
      const scale = 1 - distOut * 0.22;
      tv.y = tv.y * scale + (1 - scale) * 0.45;
      tv.z *= 0.82;
      tPos.setXYZ(i, tv.x, tv.y, tv.z);
    }
    tubeGeo.computeVertexNormals();
    const sMesh = new THREE.Mesh(tubeGeo, primaryMat);
    sGroup.add(sMesh);

    const cuffGeo = new THREE.TorusGeometry(0.22, 0.036, 14, 32);
    cuffGeo.scale(1, 0.84, 1);
    const cuffMesh = new THREE.Mesh(cuffGeo, secondaryMat);
    cuffMesh.position.set(side * 1.6, 0.09, 0.07);
    cuffMesh.rotation.y = side * (Math.PI / 2 - 0.55);
    cuffMesh.rotation.x = 0.45;
    sGroup.add(cuffMesh);

    // Three shoulder stripes
    for (let st = -1; st <= 1; st++) {
      const stripeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.62, 1.02, st * 0.055),
        new THREE.Vector3(side * 1.12, 0.82, 0.03 + st * 0.055),
        new THREE.Vector3(side * 1.46, 0.46, 0.06 + st * 0.055),
      ]);
      const stripeGeo = new THREE.TubeGeometry(stripeCurve, 16, 0.016, 8, false);
      const stripeMesh = new THREE.Mesh(stripeGeo, accentMat);
      sGroup.add(stripeMesh);
    }

    return sGroup;
  };

  const leftSleeveGroup = buildSleeve(-1);
  const rightSleeveGroup = buildSleeve(1);
  group.add(leftSleeveGroup, rightSleeveGroup);

  parts.push({
    id: 'kit-sleeve-l',
    layerId: 'kit-sleeves',
    mesh: leftSleeveGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(-0.68, 0.22, 0.15),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0, 0, 0.12),
    highlightMaterials: [primaryMat, secondaryMat],
  });

  parts.push({
    id: 'kit-sleeve-r',
    layerId: 'kit-sleeves',
    mesh: rightSleeveGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0.68, 0.22, 0.15),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0, 0, -0.12),
    highlightMaterials: [primaryMat, secondaryMat],
  });

  // --- LAYER 4: 2x2 Ribbed Collar, Circular DFB/Atelier Crest & 4 Embroidered 3D Stars ---
  const trimPackGroup = new THREE.Group();

  // Thick 2x2 Ribbed Crew Collar (with fine vertical rib bump map)
  const collarGeo = new THREE.TorusGeometry(0.45, 0.088, 24, 64);
  collarGeo.scale(1.16, 0.72, 1);
  const collarMesh = new THREE.Mesh(collarGeo, secondaryMat);
  collarMesh.rotation.x = Math.PI / 2 + 0.24;
  collarMesh.position.set(0, 1.06, 0.06);
  trimPackGroup.add(collarMesh);

  // Circular Woven Crest Assembly on Chest (positioned so macro camera frames it + collar + 4 stars!)
  const crestAssembly = new THREE.Group();
  crestAssembly.position.set(0.32, 0.46, 0.54);
  crestAssembly.rotation.y = 0.19;
  crestAssembly.rotation.x = -0.06;

  // Disc face with high-res DFB Eagle & Circular Typography
  const badgeDiscGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.018, 64);
  badgeDiscGeo.rotateX(Math.PI / 2);
  badgeDiscGeo.rotateZ(-Math.PI / 2);
  const badgeDisc = new THREE.Mesh(badgeDiscGeo, crestFaceMat);
  crestAssembly.add(badgeDisc);

  // Raised Satin-Stitched Border Ring around the circular crest
  const satinRimGeo = new THREE.TorusGeometry(0.24, 0.014, 16, 64);
  const satinRim = new THREE.Mesh(satinRimGeo, secondaryMat);
  satinRim.position.z = 0.008;
  crestAssembly.add(satinRim);

  // 4 Faceted 3D Five-Pointed Embroidered Stars arcing diagonally above-right of the circular crest
  // (Matching the exact arc in the user's DFB Heimtrikot 2024 reference photo!)
  const starGeo = createFivePointStarGeometry(0.044, 0.018, 0.02);
  const starArcAngles = [0.98, 0.68, 0.38, 0.08]; // Diagonal arc from top to right
  const starArcRadius = 0.315;

  starArcAngles.forEach((ang, idx) => {
    const starMesh = new THREE.Mesh(starGeo, accentMat);
    starMesh.position.set(
      Math.cos(ang) * starArcRadius,
      Math.sin(ang) * starArcRadius,
      0.006
    );
    starMesh.rotation.z = -0.15 - idx * 0.08;
    crestAssembly.add(starMesh);
  });

  trimPackGroup.add(crestAssembly);

  // Back Squad Number "10" Graphic Plate (on the back of the jersey)
  const plateMat = new THREE.MeshBasicMaterial({
    map: numberTex,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const backPlateGeo = new THREE.PlaneGeometry(0.95, 0.95);
  const backPlate = new THREE.Mesh(backPlateGeo, plateMat);
  backPlate.position.set(0, 0.08, -0.52);
  backPlate.rotation.y = Math.PI;
  trimPackGroup.add(backPlate);

  group.add(trimPackGroup);
  parts.push({
    id: 'kit-crest-part',
    layerId: 'kit-crest',
    mesh: trimPackGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 0.28, 0.68),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(-0.06, 0, 0),
    highlightMaterials: [accentMat, crestFaceMat, secondaryMat],
  });

  const applyColorway = (preset: ColorwayPreset) => {
    primaryMat.color.setHex(preset.primaryColor);
    secondaryMat.color.setHex(preset.secondaryColor);
    accentMat.color.setHex(preset.accentColor);
    ventCoreMat.color.setHex(preset.trimColor);
  };

  return { group, parts, applyColorway };
}

// ============================================================================
// 2. BUILD BALLS (BÓNG THI ĐẤU) — RADIALLY EXPLODING MULTI-PANEL GEODESIC BALL
// ============================================================================

export function buildBallAssembly(
  registerMat: (mat: THREE.MeshStandardMaterial) => THREE.MeshStandardMaterial,
  dimpleBump: THREE.CanvasTexture
): {
  group: THREE.Group;
  parts: ExplodablePart[];
  applyColorway: (preset: ColorwayPreset) => void;
} {
  const group = new THREE.Group();
  const parts: ExplodablePart[] = [];

  const panelWhiteMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xfafaf9,
      roughness: 0.24,
      metalness: 0.05,
      bumpMap: dimpleBump,
      bumpScale: 0.015,
      clearcoat: 0.85,
      clearcoatRoughness: 0.18,
    })
  );

  const panelAccentMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xe11d48,
      roughness: 0.22,
      metalness: 0.18,
      bumpMap: dimpleBump,
      bumpScale: 0.015,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
    })
  );

  const panelDarkMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0x1c1917,
      roughness: 0.28,
      metalness: 0.25,
      bumpMap: dimpleBump,
      bumpScale: 0.012,
      clearcoat: 0.75,
    })
  );

  const foamCageMat = registerMat(
    new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.55,
      metalness: 0.2,
    })
  );

  const carcassMat = registerMat(
    new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.3,
      metalness: 0.7,
      wireframe: true,
    })
  );

  const bladderMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xe11d48,
      roughness: 0.32,
      metalness: 0.2,
      emissive: 0x881337,
      emissiveIntensity: 0.45,
      clearcoat: 0.5,
    })
  );

  // --- LAYER 4 (INNERMOST): Carbon-Latex Bladder Core & Butyl Valve ---
  const bladderGroup = new THREE.Group();
  const bladderGeo = new THREE.SphereGeometry(0.66, 36, 36);
  const bladderMesh = new THREE.Mesh(bladderGeo, bladderMat);
  bladderGroup.add(bladderMesh);

  const valveGeo = new THREE.CylinderGeometry(0.08, 0.11, 0.16, 20);
  const valveMesh = new THREE.Mesh(valveGeo, panelDarkMat);
  valveMesh.position.set(0, 0.66, 0);
  bladderGroup.add(valveMesh);

  group.add(bladderGroup);
  parts.push({
    id: 'ball-bladder-part',
    layerId: 'ball-bladder',
    mesh: bladderGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 0, 0),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0, 0.4, 0),
    highlightMaterials: [bladderMat],
  });

  // --- LAYER 3: Geodesic Filament Winding Matrix ---
  const carcassGeo = new THREE.IcosahedronGeometry(0.86, 2);
  const carcassMesh = new THREE.Mesh(carcassGeo, carcassMat);
  group.add(carcassMesh);
  parts.push({
    id: 'ball-carcass-part',
    layerId: 'ball-carcass',
    mesh: carcassMesh,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 0, 0.22),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0.25, -0.35, 0),
    highlightMaterials: [carcassMat],
  });

  // --- LAYER 2: EPDM Nitrogen-Cell Foam Seam Cage ---
  const foamGroup = new THREE.Group();
  const seamBaseGeo = new THREE.IcosahedronGeometry(1.04, 1);
  const edgesGeo = new THREE.EdgesGeometry(seamBaseGeo);
  const edgePos = edgesGeo.attributes.position;
  for (let i = 0; i < edgePos.count; i += 2) {
    const vStart = new THREE.Vector3().fromBufferAttribute(edgePos, i);
    const vEnd = new THREE.Vector3().fromBufferAttribute(edgePos, i + 1);
    const mid = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);
    const len = vStart.distanceTo(vEnd);

    const strutGeo = new THREE.CylinderGeometry(0.028, 0.028, len, 8);
    const strut = new THREE.Mesh(strutGeo, foamCageMat);
    strut.position.copy(mid);
    strut.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3().subVectors(vEnd, vStart).normalize()
    );
    foamGroup.add(strut);
  }
  group.add(foamGroup);
  parts.push({
    id: 'ball-foam-part',
    layerId: 'ball-foam',
    mesh: foamGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 0, 0),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(-0.18, 0.25, 0),
    highlightMaterials: [foamCageMat],
  });

  // --- LAYER 1 (OUTER): 20 Radially Exploding Curved Spherical Thermal Panels ---
  const ico = new THREE.IcosahedronGeometry(1.16, 0);
  const icoPos = ico.attributes.position;

  const subdivideTriangle = (
    a: THREE.Vector3,
    b: THREE.Vector3,
    c: THREE.Vector3,
    depth: number
  ): [THREE.Vector3, THREE.Vector3, THREE.Vector3][] => {
    if (depth === 0) return [[a, b, c]];
    const ab = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
    const bc = new THREE.Vector3().addVectors(b, c).multiplyScalar(0.5);
    const ca = new THREE.Vector3().addVectors(c, a).multiplyScalar(0.5);
    return [
      ...subdivideTriangle(a, ab, ca, depth - 1),
      ...subdivideTriangle(ab, b, bc, depth - 1),
      ...subdivideTriangle(ca, bc, c, depth - 1),
      ...subdivideTriangle(ab, bc, ca, depth - 1),
    ];
  };

  for (let f = 0; f < icoPos.count; f += 3) {
    const vA = new THREE.Vector3().fromBufferAttribute(icoPos, f);
    const vB = new THREE.Vector3().fromBufferAttribute(icoPos, f + 1);
    const vC = new THREE.Vector3().fromBufferAttribute(icoPos, f + 2);

    const faceCenter = new THREE.Vector3()
      .add(vA)
      .add(vB)
      .add(vC)
      .divideScalar(3)
      .normalize();

    const inset = 0.038;
    const iA = vA.clone().lerp(faceCenter.clone().multiplyScalar(vA.length()), inset);
    const iB = vB.clone().lerp(faceCenter.clone().multiplyScalar(vB.length()), inset);
    const iC = vC.clone().lerp(faceCenter.clone().multiplyScalar(vC.length()), inset);

    const subTris = subdivideTriangle(iA, iB, iC, 2);
    const vertices: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];

    const outerRadius = 1.18;
    const innerRadius = 1.09;

    subTris.forEach(([p1, p2, p3]) => {
      const o1 = p1.clone().normalize().multiplyScalar(outerRadius);
      const o2 = p2.clone().normalize().multiplyScalar(outerRadius);
      const o3 = p3.clone().normalize().multiplyScalar(outerRadius);

      vertices.push(o1.x, o1.y, o1.z, o2.x, o2.y, o2.z, o3.x, o3.y, o3.z);
      const n1 = o1.clone().normalize();
      const n2 = o2.clone().normalize();
      const n3 = o3.clone().normalize();
      normals.push(n1.x, n1.y, n1.z, n2.x, n2.y, n2.z, n3.x, n3.y, n3.z);
      uvs.push(o1.x, o1.y, o2.x, o2.y, o3.x, o3.y);

      const in1 = p1.clone().normalize().multiplyScalar(innerRadius);
      const in2 = p2.clone().normalize().multiplyScalar(innerRadius);
      const in3 = p3.clone().normalize().multiplyScalar(innerRadius);
      vertices.push(in1.x, in1.y, in1.z, in3.x, in3.y, in3.z, in2.x, in2.y, in2.z);
      normals.push(-n1.x, -n1.y, -n1.z, -n3.x, -n3.y, -n3.z, -n2.x, -n2.y, -n2.z);
      uvs.push(0, 0, 1, 0, 0, 1);
    });

    const panelGeo = new THREE.BufferGeometry();
    panelGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    panelGeo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    panelGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

    const panelIdx = f / 3;
    const mat =
      panelIdx % 5 === 0
        ? panelAccentMat
        : panelIdx % 4 === 1
        ? panelDarkMat
        : panelWhiteMat;

    const panelMesh = new THREE.Mesh(panelGeo, mat);
    group.add(panelMesh);

    const radialOffset = faceCenter.clone().multiplyScalar(0.68);
    parts.push({
      id: `ball-panel-${panelIdx}`,
      layerId: 'ball-panels',
      mesh: panelMesh,
      basePos: new THREE.Vector3(0, 0, 0),
      explodedPos: radialOffset,
      baseRot: new THREE.Euler(0, 0, 0),
      explodedRot: new THREE.Euler(
        faceCenter.y * 0.15,
        -faceCenter.x * 0.15,
        0
      ),
      highlightMaterials: [panelWhiteMat, panelAccentMat, panelDarkMat],
    });
  }

  // Dual Wind-Tunnel Slipstream Orbital Rings
  const aeroRing1 = new THREE.Mesh(
    new THREE.TorusGeometry(1.52, 0.016, 16, 80),
    panelAccentMat
  );
  aeroRing1.rotation.set(Math.PI / 2.6, 0.35, 0);
  group.add(aeroRing1);

  const aeroRing2 = new THREE.Mesh(
    new THREE.TorusGeometry(1.64, 0.01, 12, 80),
    foamCageMat
  );
  aeroRing2.rotation.set(-Math.PI / 3.1, -0.4, 0.2);
  group.add(aeroRing2);

  parts.push({
    id: 'ball-aero-ring-1',
    layerId: 'ball-panels',
    mesh: aeroRing1,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 0, 0.35),
    baseRot: new THREE.Euler(Math.PI / 2.6, 0.35, 0),
    explodedRot: new THREE.Euler(Math.PI / 2.2, 0.65, 0),
    highlightMaterials: [panelAccentMat],
  });

  const applyColorway = (preset: ColorwayPreset) => {
    panelWhiteMat.color.setHex(preset.primaryColor);
    panelDarkMat.color.setHex(preset.secondaryColor);
    panelAccentMat.color.setHex(preset.accentColor);
    foamCageMat.color.setHex(preset.trimColor);
  };

  return { group, parts, applyColorway };
}

// ============================================================================
// 3. BUILD BOOTS (GIÀY ĐINH) — SCULPTED MONTEBELLUNA CARBON SPEED BOOT
// ============================================================================

function createFootprintShape(scaleWidth: number = 1, scaleLen: number = 1): THREE.Shape {
  const s = new THREE.Shape();
  const L = scaleLen;
  const W = scaleWidth;
  s.moveTo(-1.08 * L, 0);
  s.bezierCurveTo(-1.08 * L, 0.28 * W, -0.75 * L, 0.31 * W, -0.35 * L, 0.25 * W);
  s.bezierCurveTo(-0.05 * L, 0.21 * W, 0.25 * L, 0.38 * W, 0.58 * L, 0.39 * W);
  s.bezierCurveTo(0.88 * L, 0.38 * W, 1.12 * L, 0.22 * W, 1.15 * L, 0.02 * W);
  s.bezierCurveTo(1.16 * L, -0.18 * W, 0.92 * L, -0.36 * W, 0.55 * L, -0.38 * W);
  s.bezierCurveTo(0.2 * L, -0.39 * W, -0.12 * L, -0.18 * W, -0.42 * L, -0.22 * W);
  s.bezierCurveTo(-0.75 * L, -0.28 * W, -1.08 * L, -0.26 * W, -1.08 * L, 0);
  return s;
}

export function buildBootAssembly(
  registerMat: (mat: THREE.MeshStandardMaterial) => THREE.MeshStandardMaterial,
  carbonTextures: { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture },
  knitBump: THREE.CanvasTexture
): {
  group: THREE.Group;
  parts: ExplodablePart[];
  applyColorway: (preset: ColorwayPreset) => void;
} {
  const group = new THREE.Group();
  const parts: ExplodablePart[] = [];

  const upperMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0x18181b,
      roughness: 0.36,
      metalness: 0.18,
      bumpMap: knitBump,
      bumpScale: 0.02,
      clearcoat: 0.35,
      clearcoatRoughness: 0.4,
    })
  );

  const carbonMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0x18181b,
      map: carbonTextures.map,
      bumpMap: carbonTextures.bumpMap,
      bumpScale: 0.015,
      roughness: 0.15,
      metalness: 0.82,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    })
  );

  const accentMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xe11d48,
      roughness: 0.22,
      metalness: 0.65,
      clearcoat: 0.8,
    })
  );

  const insoleMat = registerMat(
    new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      roughness: 0.48,
      metalness: 0.1,
    })
  );

  const trimMat = registerMat(
    new THREE.MeshStandardMaterial({
      color: 0xf4f4f5,
      roughness: 0.25,
      metalness: 0.75,
    })
  );

  const applyArchCurve = (geo: THREE.BufferGeometry, thicknessY: number) => {
    geo.rotateX(Math.PI / 2);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      let archY = 0;
      if (v.x < -0.2) {
        archY = Math.pow((-v.x - 0.2) / 0.9, 1.4) * 0.12;
      } else if (v.x > 0.45) {
        archY = Math.pow((v.x - 0.45) / 0.7, 1.8) * 0.11;
      } else {
        archY = Math.sin(((v.x + 0.2) / 0.65) * Math.PI) * 0.045;
      }
      v.y += archY + thicknessY;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
  };

  // --- LAYER 1: Sculpted Anatomical Boot Upper, Knit Ankle Collar & Strike Zone Ribs ---
  const upperGroup = new THREE.Group();

  const lastGeo = new THREE.SphereGeometry(1.0, 48, 32);
  const lPos = lastGeo.attributes.position;
  const lv = new THREE.Vector3();
  for (let i = 0; i < lPos.count; i++) {
    lv.fromBufferAttribute(lPos, i);
    const x = lv.x * 1.14;
    const isTop = lv.y > 0;

    let widthProfile = 0.36;
    if (x > 0.3) {
      widthProfile = 0.39 * Math.cos(((x - 0.3) / 0.85) * (Math.PI * 0.46));
    } else if (x > -0.35) {
      widthProfile = 0.29 + ((x + 0.35) / 0.65) * 0.09;
    } else {
      widthProfile = 0.31 * Math.cos(((x + 0.35) / -0.8) * (Math.PI * 0.38));
    }

    const asymmetryShift = x > 0.2 ? -Math.pow((x - 0.2) / 0.9, 1.5) * 0.05 : 0;
    const z = lv.z * Math.max(0.08, widthProfile) + asymmetryShift;

    let y = 0;
    if (!isTop) {
      y = lv.y * 0.08;
    } else {
      let maxH = 0.22;
      if (x > 0.25) {
        maxH = 0.14 + (1 - (x - 0.25) / 0.9) * 0.24;
      } else if (x > -0.55) {
        maxH = 0.38 + ((-x + 0.25) / 0.8) * 0.34;
      } else {
        maxH = 0.68 - Math.pow((-x - 0.55) / 0.6, 1.6) * 0.18;
      }
      y = Math.pow(lv.y, 0.82) * maxH;
    }

    let archOffset = 0;
    if (x < -0.2) archOffset = Math.pow((-x - 0.2) / 0.9, 1.4) * 0.12;
    else if (x > 0.45) archOffset = Math.pow((x - 0.45) / 0.7, 1.8) * 0.11;
    else archOffset = Math.sin(((x + 0.2) / 0.65) * Math.PI) * 0.045;

    lPos.setXYZ(i, x, y + archOffset - 0.02, z);
  }
  lastGeo.computeVertexNormals();
  const vampMesh = new THREE.Mesh(lastGeo, upperMat);
  upperGroup.add(vampMesh);

  const collarGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.38, 32, 8, false);
  collarGeo.scale(1.18, 1, 0.85);
  const collarMesh = new THREE.Mesh(collarGeo, upperMat);
  collarMesh.position.set(-0.56, 0.68, 0);
  collarMesh.rotation.z = 0.26;
  upperGroup.add(collarMesh);

  const ankleRimGeo = new THREE.TorusGeometry(0.28, 0.024, 12, 36);
  ankleRimGeo.scale(1.18, 0.85, 1);
  const ankleRim = new THREE.Mesh(ankleRimGeo, accentMat);
  ankleRim.position.set(-0.61, 0.86, 0);
  ankleRim.rotation.x = Math.PI / 2;
  ankleRim.rotation.y = -0.26;
  upperGroup.add(ankleRim);

  for (let i = 0; i < 6; i++) {
    const t = i / 5;
    const lx = -0.25 + t * 0.52;
    const ly = 0.56 - t * 0.21;
    const laceGeo = new THREE.CapsuleGeometry(0.014, 0.24 - t * 0.04, 8, 12);
    const lace = new THREE.Mesh(laceGeo, trimMat);
    lace.position.set(lx, ly, 0);
    lace.rotation.x = Math.PI / 2;
    lace.rotation.z = 0.35;
    upperGroup.add(lace);
  }

  for (let i = 0; i < 4; i++) {
    const finGeo = new THREE.BoxGeometry(0.32 - i * 0.04, 0.032, 0.02);
    const finL = new THREE.Mesh(finGeo, accentMat);
    finL.position.set(0.15 + i * 0.18, 0.22 - i * 0.03, 0.36 - i * 0.03);
    finL.rotation.z = -0.35;
    finL.rotation.y = 0.18;

    const finR = new THREE.Mesh(finGeo, accentMat);
    finR.position.set(0.15 + i * 0.18, 0.22 - i * 0.03, -(0.35 - i * 0.03));
    finR.rotation.z = -0.35;
    finR.rotation.y = -0.18;
    upperGroup.add(finL, finR);
  }

  group.add(upperGroup);
  parts.push({
    id: 'boot-upper-part',
    layerId: 'boot-upper',
    mesh: upperGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 0.62, 0),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0, 0, 0.05),
    highlightMaterials: [upperMat, trimMat],
  });

  // --- LAYER 2: External Calcaneus Carbon Heel Lock Cradle ---
  const heelCupGroup = new THREE.Group();
  const heelCupGeo = new THREE.CylinderGeometry(
    0.33,
    0.31,
    0.44,
    32,
    8,
    true,
    Math.PI * 0.55,
    Math.PI * 0.9
  );
  heelCupGeo.scale(1.15, 1, 0.96);
  const heelCupMesh = new THREE.Mesh(heelCupGeo, carbonMat);
  heelCupMesh.position.set(-0.76, 0.26, 0);
  heelCupMesh.rotation.z = 0.14;
  heelCupGroup.add(heelCupMesh);

  const spineGeo = new THREE.BoxGeometry(0.05, 0.42, 0.08);
  const spineMesh = new THREE.Mesh(spineGeo, accentMat);
  spineMesh.position.set(-1.12, 0.28, 0);
  spineMesh.rotation.z = 0.18;
  heelCupGroup.add(spineMesh);

  group.add(heelCupGroup);
  parts.push({
    id: 'boot-heel-part',
    layerId: 'boot-heel',
    mesh: heelCupGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(-0.52, 0.42, 0),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0, 0, 0.14),
    highlightMaterials: [carbonMat, accentMat],
  });

  // --- LAYER 3: Contoured Anatomical Dual-Density Insole ---
  const insoleGroup = new THREE.Group();
  const insoleShape = createFootprintShape(0.88, 0.94);
  const insoleGeo = new THREE.ExtrudeGeometry(insoleShape, {
    depth: 0.055,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.018,
    bevelThickness: 0.018,
  });
  applyArchCurve(insoleGeo, -0.05);
  const insoleMesh = new THREE.Mesh(insoleGeo, insoleMat);
  insoleGroup.add(insoleMesh);

  group.add(insoleGroup);
  parts.push({
    id: 'boot-insole-part',
    layerId: 'boot-insole',
    mesh: insoleGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 0.12, 0),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0, 0, 0),
    highlightMaterials: [insoleMat],
  });

  // --- LAYER 4: 11-Ply Biaxial Carbon Fiber Soleplate Chassis ---
  const soleplateGroup = new THREE.Group();
  const soleShape = createFootprintShape(0.98, 1.02);
  const soleGeo = new THREE.ExtrudeGeometry(soleShape, {
    depth: 0.065,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.022,
    bevelThickness: 0.02,
  });
  applyArchCurve(soleGeo, -0.15);
  const soleMesh = new THREE.Mesh(soleGeo, carbonMat);
  soleplateGroup.add(soleMesh);

  const torsionBarGeo = new THREE.BoxGeometry(0.68, 0.035, 0.045);
  const barL = new THREE.Mesh(torsionBarGeo, accentMat);
  barL.position.set(-0.1, -0.16, 0.11);
  const barR = new THREE.Mesh(torsionBarGeo, accentMat);
  barR.position.set(-0.1, -0.16, -0.11);
  soleplateGroup.add(barL, barR);

  group.add(soleplateGroup);
  parts.push({
    id: 'boot-carbon-part',
    layerId: 'boot-carbon',
    mesh: soleplateGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, -0.34, 0),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0, 0, -0.03),
    highlightMaterials: [carbonMat],
  });

  // --- LAYER 5: 11 Bladed Chevron & Conical Titanium Studs ---
  const studsGroup = new THREE.Group();
  const studPositions: { x: number; y: number; z: number; isBlade: boolean; rotY: number }[] = [
    { x: 0.92, y: -0.21, z: 0.15, isBlade: true, rotY: 0.25 },
    { x: 0.92, y: -0.21, z: -0.14, isBlade: true, rotY: -0.25 },
    { x: 0.62, y: -0.25, z: 0.25, isBlade: true, rotY: 0.15 },
    { x: 0.62, y: -0.25, z: -0.24, isBlade: true, rotY: -0.15 },
    { x: 0.52, y: -0.26, z: 0.0, isBlade: false, rotY: 0 },
    { x: 0.28, y: -0.25, z: 0.24, isBlade: false, rotY: 0 },
    { x: 0.28, y: -0.25, z: -0.23, isBlade: false, rotY: 0 },
    { x: -0.62, y: -0.22, z: 0.18, isBlade: true, rotY: 0.1 },
    { x: -0.62, y: -0.22, z: -0.18, isBlade: true, rotY: -0.1 },
    { x: -0.94, y: -0.18, z: 0.15, isBlade: true, rotY: -0.15 },
    { x: -0.94, y: -0.18, z: -0.15, isBlade: true, rotY: 0.15 },
  ];

  studPositions.forEach((sp) => {
    const singleStud = new THREE.Group();
    if (sp.isBlade) {
      const baseBladeGeo = new THREE.BoxGeometry(0.13, 0.14, 0.045);
      const baseBlade = new THREE.Mesh(baseBladeGeo, trimMat);
      const tipBladeGeo = new THREE.BoxGeometry(0.09, 0.11, 0.036);
      const tipBlade = new THREE.Mesh(tipBladeGeo, accentMat);
      tipBlade.position.y = -0.11;
      singleStud.add(baseBlade, tipBlade);
    } else {
      const baseConeGeo = new THREE.CylinderGeometry(0.058, 0.044, 0.14, 16);
      const baseCone = new THREE.Mesh(baseConeGeo, trimMat);
      const tipConeGeo = new THREE.CylinderGeometry(0.044, 0.028, 0.1, 16);
      const tipCone = new THREE.Mesh(tipConeGeo, accentMat);
      tipCone.position.y = -0.11;
      singleStud.add(baseCone, tipCone);
    }
    singleStud.position.set(sp.x, sp.y, sp.z);
    singleStud.rotation.y = sp.rotY;
    studsGroup.add(singleStud);
  });

  group.add(studsGroup);
  parts.push({
    id: 'boot-studs-part',
    layerId: 'boot-studs',
    mesh: studsGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, -0.76, 0),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0, 0, 0),
    highlightMaterials: [accentMat, trimMat],
  });

  const applyColorway = (preset: ColorwayPreset) => {
    upperMat.color.setHex(preset.primaryColor);
    carbonMat.color.setHex(preset.secondaryColor);
    accentMat.color.setHex(preset.accentColor);
    insoleMat.color.setHex(preset.accentColor);
    trimMat.color.setHex(preset.trimColor);
  };

  return { group, parts, applyColorway };
}

// ============================================================================
// 4. BUILD GLOVES (GĂNG THỦ MÔN) — ARTICULATED NEGATIVE-CUT PRO GK GLOVE
// ============================================================================

export function buildGloveAssembly(
  registerMat: (mat: THREE.MeshStandardMaterial) => THREE.MeshStandardMaterial,
  carbonTextures: { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture },
  knitBump: THREE.CanvasTexture
): {
  group: THREE.Group;
  parts: ExplodablePart[];
  applyColorway: (preset: ColorwayPreset) => void;
} {
  const group = new THREE.Group();
  const parts: ExplodablePart[] = [];

  const latexPalmMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xf5f5f4,
      roughness: 0.48,
      metalness: 0.04,
      bumpMap: knitBump,
      bumpScale: 0.014,
      clearcoat: 0.22,
      clearcoatRoughness: 0.4,
    })
  );

  const neopreneBackMat = registerMat(
    new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.55,
      metalness: 0.18,
      bumpMap: knitBump,
      bumpScale: 0.022,
    })
  );

  const spineCarbonMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xe11d48,
      map: carbonTextures.map,
      roughness: 0.2,
      metalness: 0.75,
      clearcoat: 0.9,
    })
  );

  const siliconePunchMat = registerMat(
    new THREE.MeshPhysicalMaterial({
      color: 0x57534e,
      roughness: 0.28,
      metalness: 0.35,
      clearcoat: 0.65,
    })
  );

  const fingerDefs = [
    { name: 'index', x: -0.42, y: 0.36, len: 0.78, spreadZ: 0.09, rad: 0.115 },
    { name: 'middle', x: -0.14, y: 0.42, len: 0.88, spreadZ: 0.025, rad: 0.12 },
    { name: 'ring', x: 0.15, y: 0.38, len: 0.82, spreadZ: -0.03, rad: 0.115 },
    { name: 'pinky', x: 0.42, y: 0.26, len: 0.66, spreadZ: -0.1, rad: 0.102 },
  ];

  // --- LAYER 1: 4.0mm German Contact Latex Palm & Articulated Curved Fingers ---
  const palmGroup = new THREE.Group();

  const palmShape = new THREE.Shape();
  palmShape.moveTo(-0.54, -0.58);
  palmShape.quadraticCurveTo(-0.62, 0.05, -0.54, 0.38);
  palmShape.quadraticCurveTo(0, 0.48, 0.54, 0.28);
  palmShape.quadraticCurveTo(0.58, -0.15, 0.48, -0.58);
  palmShape.quadraticCurveTo(0, -0.68, -0.54, -0.58);

  const palmGeo = new THREE.ExtrudeGeometry(palmShape, {
    depth: 0.11,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  });
  const palmMesh = new THREE.Mesh(palmGeo, latexPalmMat);
  palmMesh.position.set(0, -0.12, 0.06);
  palmGroup.add(palmMesh);

  const thenarGeo = new THREE.SphereGeometry(0.28, 24, 16);
  thenarGeo.scale(1.1, 1.35, 0.42);
  const thenarMesh = new THREE.Mesh(thenarGeo, latexPalmMat);
  thenarMesh.position.set(-0.32, -0.32, 0.16);
  thenarMesh.rotation.z = -0.35;
  palmGroup.add(thenarMesh);

  fingerDefs.forEach((f) => {
    const fChain = new THREE.Group();
    fChain.position.set(f.x, f.y, 0.12);
    fChain.rotation.z = f.spreadZ;

    const segLen = f.len / 3;
    let curY = 0;
    let curZ = 0;
    let curAngle = 0.12;

    for (let s = 0; s < 3; s++) {
      const r = f.rad * (1 - s * 0.08);
      const segGeo = new THREE.CapsuleGeometry(r, segLen * 0.78, 12, 16);
      segGeo.scale(1, 1, 0.82);
      const segMesh = new THREE.Mesh(segGeo, latexPalmMat);

      const midY = curY + Math.cos(curAngle) * (segLen * 0.5);
      const midZ = curZ + Math.sin(curAngle) * (segLen * 0.5);
      segMesh.position.set(0, midY, midZ);
      segMesh.rotation.x = curAngle;
      fChain.add(segMesh);

      curY += Math.cos(curAngle) * segLen;
      curZ += Math.sin(curAngle) * segLen;
      curAngle += 0.16;
    }

    palmGroup.add(fChain);
  });

  const thumbGroup = new THREE.Group();
  thumbGroup.position.set(-0.62, -0.22, 0.16);
  thumbGroup.rotation.z = 0.62;
  thumbGroup.rotation.y = 0.35;

  const thumbProx = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.135, 0.32, 12, 16),
    latexPalmMat
  );
  thumbProx.position.set(0, 0.18, 0.04);
  thumbProx.rotation.x = 0.22;
  const thumbDist = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.12, 0.26, 12, 16),
    latexPalmMat
  );
  thumbDist.position.set(0, 0.48, 0.14);
  thumbDist.rotation.x = 0.42;
  thumbGroup.add(thumbProx, thumbDist);
  palmGroup.add(thumbGroup);

  group.add(palmGroup);
  parts.push({
    id: 'glove-palm-part',
    layerId: 'glove-palm',
    mesh: palmGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 0.05, 0.52),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0.06, 0, 0),
    highlightMaterials: [latexPalmMat],
  });

  // --- LAYER 2: 5 Segmented Carbon Ortho-Spine Finger Protection Rods ---
  const spinesGroup = new THREE.Group();
  fingerDefs.forEach((f) => {
    const rodGroup = new THREE.Group();
    rodGroup.position.set(f.x, f.y - 0.18, 0.01);
    rodGroup.rotation.z = f.spreadZ;

    const numVertebrae = 5;
    for (let vIdx = 0; vIdx < numVertebrae; vIdx++) {
      const t = vIdx / (numVertebrae - 1);
      const vGeo = new THREE.BoxGeometry(0.075, 0.15, 0.038);
      const vMesh = new THREE.Mesh(vGeo, spineCarbonMat);
      const vy = t * (f.len + 0.12);
      const vz = Math.pow(t, 1.6) * 0.22;
      vMesh.position.set(0, vy, vz);
      vMesh.rotation.x = t * 0.36;
      rodGroup.add(vMesh);
    }
    spinesGroup.add(rodGroup);
  });

  const thumbSpine = new THREE.Mesh(
    new THREE.BoxGeometry(0.07, 0.52, 0.038),
    spineCarbonMat
  );
  thumbSpine.position.set(-0.74, -0.02, 0.14);
  thumbSpine.rotation.z = 0.62;
  thumbSpine.rotation.x = 0.28;
  spinesGroup.add(thumbSpine);

  group.add(spinesGroup);
  parts.push({
    id: 'glove-spines-part',
    layerId: 'glove-spines',
    mesh: spinesGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 0.34, -0.18),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(-0.08, 0, 0),
    highlightMaterials: [spineCarbonMat],
  });

  // --- LAYER 3: Neoprene Backhand & 3D Silicone Punch Zone ---
  const backhandGroup = new THREE.Group();
  const backGeo = new THREE.ExtrudeGeometry(palmShape, {
    depth: 0.09,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.035,
    bevelThickness: 0.035,
  });
  const backMesh = new THREE.Mesh(backGeo, neopreneBackMat);
  backMesh.position.set(0, -0.12, -0.12);
  backhandGroup.add(backMesh);

  fingerDefs.forEach((f) => {
    const dorsalFinger = new THREE.Mesh(
      new THREE.CapsuleGeometry(f.rad * 0.92, f.len * 0.85, 10, 14),
      neopreneBackMat
    );
    dorsalFinger.scale.set(1, 1, 0.65);
    dorsalFinger.position.set(f.x, f.y + f.len * 0.42, 0.02);
    dorsalFinger.rotation.z = f.spreadZ;
    dorsalFinger.rotation.x = 0.24;
    backhandGroup.add(dorsalFinger);
  });

  for (let r = 0; r < 3; r++) {
    const punchBarGeo = new THREE.BoxGeometry(0.96 - r * 0.08, 0.08, 0.055);
    const punchBar = new THREE.Mesh(punchBarGeo, siliconePunchMat);
    punchBar.position.set(0, 0.22 - r * 0.14, -0.14);
    punchBar.rotation.z = -0.05;
    backhandGroup.add(punchBar);
  }

  group.add(backhandGroup);
  parts.push({
    id: 'glove-backhand-part',
    layerId: 'glove-backhand',
    mesh: backhandGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 0, -0.62),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(-0.1, 0, 0),
    highlightMaterials: [neopreneBackMat, siliconePunchMat],
  });

  // --- LAYER 4: 360° Elastic Neoprene Wrist Tunnel & Dual-Tension Strap ---
  const wristGroup = new THREE.Group();
  const tunnelGeo = new THREE.CylinderGeometry(0.46, 0.42, 0.48, 36);
  tunnelGeo.scale(1.12, 1, 0.62);
  const tunnelMesh = new THREE.Mesh(tunnelGeo, neopreneBackMat);
  tunnelMesh.position.set(0, -0.92, 0.0);
  wristGroup.add(tunnelMesh);

  const strapGeo = new THREE.TorusGeometry(0.45, 0.085, 16, 40);
  strapGeo.scale(1.14, 0.66, 1.35);
  const strapMesh = new THREE.Mesh(strapGeo, spineCarbonMat);
  strapMesh.rotation.x = Math.PI / 2;
  strapMesh.position.set(0, -0.88, 0.01);
  wristGroup.add(strapMesh);

  const idWindowGeo = new THREE.BoxGeometry(0.38, 0.14, 0.04);
  const idWindow = new THREE.Mesh(idWindowGeo, latexPalmMat);
  idWindow.position.set(0.08, -0.88, 0.34);
  wristGroup.add(idWindow);

  group.add(wristGroup);
  parts.push({
    id: 'glove-wrist-part',
    layerId: 'glove-wrist',
    mesh: wristGroup,
    basePos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, -0.54, 0),
    baseRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0, 0.18, 0),
    highlightMaterials: [spineCarbonMat, neopreneBackMat],
  });

  const applyColorway = (preset: ColorwayPreset) => {
    latexPalmMat.color.setHex(preset.primaryColor);
    neopreneBackMat.color.setHex(preset.secondaryColor);
    spineCarbonMat.color.setHex(preset.accentColor);
    siliconePunchMat.color.setHex(preset.trimColor);
  };

  return { group, parts, applyColorway };
}
