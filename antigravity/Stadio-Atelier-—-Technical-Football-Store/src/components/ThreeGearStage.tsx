import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Layers,
  RotateCcw,
  Grid,
  Move3d,
  Check,
  Wind,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Heart,
  ArrowRight,
  ArrowUpRight,
  SlidersHorizontal,
} from 'lucide-react';
import {
  CATEGORY_CHAPTERS,
  PRODUCTS,
  Product,
  ProductCategory,
} from '../data/products';
import { ResilientImage } from './ResilientImage';
import {
  CATEGORY_LAYERS,
  CATEGORY_COLORWAYS,
  ExplodablePart,
  ColorwayPreset,
  createStudioEnvironment,
  createCarbonWeaveTexture,
  createJacquardKnitTexture,
  createNumberPlateTexture,
  drawNumberPlateCanvas,
  createBallDimpleTexture,
  buildKitAssembly,
  buildBallAssembly,
  buildBootAssembly,
  buildGloveAssembly,
} from '../utils/gearModels';

gsap.registerPlugin(ScrollTrigger);

interface ThreeGearStageProps {
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory, scrollIntoView?: boolean) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent, customSizeEu?: string) => void;
  quickAddedId: string | null;
  customName?: string;
  customNumber?: string;
}

type StudioLightingMode = 'studio' | 'floodlight' | 'windtunnel';
type CameraViewSlide = 0 | 1 | 2; // 0: Macro Close-Up (DFB Crest/Detail), 1: Full 360°, 2: Exploded CAD

const CAMERA_SLIDE_PRESETS: Record<
  ProductCategory,
  Record<
    CameraViewSlide,
    {
      camX: number;
      camY: number;
      camZ: number;
      lookX: number;
      lookY: number;
      rotX: number;
      rotY: number;
      autoSpin: boolean;
      explode: number;
      label: string;
    }
  >
> = {
  kits: {
    // Slide 0: Exact Macro framing of FC Bayern / DFB Collar, Inner Size Tag, Circular Crest, 5 Gold 3D Stars & Striped Jacquard
    0: {
      camX: 0.11,
      camY: 0.62,
      camZ: 2.32,
      lookX: 0.07,
      lookY: 0.44,
      rotX: 0.18,
      rotY: -0.15,
      autoSpin: false,
      explode: 0,
      label: '01. Cận Cảnh Macro Cổ Viền Vàng, Huy Hiệu & 5 Sao 3D',
    },
    // Slide 1: Full 360° Sculpted Jersey
    1: {
      camX: 0,
      camY: 0.18,
      camZ: 5.5,
      lookX: 0,
      lookY: 0.05,
      rotX: 0.08,
      rotY: -0.28,
      autoSpin: true,
      explode: 0,
      label: '02. Toàn Cảnh 360° Phom Áo Thi Đấu',
    },
    // Slide 2: Exploded Multi-Layer Deconstruction
    2: {
      camX: 0,
      camY: 0.22,
      camZ: 6.1,
      lookX: 0,
      lookY: 0.05,
      rotX: 0.14,
      rotY: -0.48,
      autoSpin: true,
      explode: 100,
      label: '03. Bóc Tách 4 Lớp Cấu Trúc Kỹ Thuật',
    },
  },
  balls: {
    0: {
      camX: 0.15,
      camY: 0.28,
      camZ: 2.65,
      lookX: 0.05,
      lookY: 0.15,
      rotX: 0.25,
      rotY: 0.35,
      autoSpin: false,
      explode: 0,
      label: '01. Cận Cảnh Rãnh Khí Động & Mối Hàn Nhiệt',
    },
    1: {
      camX: 0,
      camY: 0.1,
      camZ: 5.1,
      lookX: 0,
      lookY: 0,
      rotX: 0.2,
      rotY: 0.42,
      autoSpin: true,
      explode: 0,
      label: '02. Toàn Cảnh 360° Quả Bóng Thi Đấu',
    },
    2: {
      camX: 0,
      camY: 0.15,
      camZ: 6.2,
      lookX: 0,
      lookY: 0,
      rotX: 0.22,
      rotY: 0.55,
      autoSpin: true,
      explode: 100,
      label: '03. Bung Tỏa 20 Tấm Vỏ & Ruột Carbon-Latex',
    },
  },
  boots: {
    0: {
      camX: 0.32,
      camY: -0.05,
      camZ: 2.65,
      lookX: 0.18,
      lookY: -0.08,
      rotX: -0.22,
      rotY: -0.62,
      autoSpin: false,
      explode: 0,
      label: '01. Cận Cảnh Đế Carbon 11 Lớp & Đinh Titanium',
    },
    1: {
      camX: 0.08,
      camY: 0.18,
      camZ: 4.85,
      lookX: 0,
      lookY: 0.05,
      rotX: 0.16,
      rotY: -0.52,
      autoSpin: true,
      explode: 0,
      label: '02. Toàn Cảnh 360° Giày Veloce Carbon XI',
    },
    2: {
      camX: 0.1,
      camY: 0.15,
      camZ: 5.85,
      lookX: 0,
      lookY: 0,
      rotX: 0.2,
      rotY: -0.48,
      autoSpin: true,
      explode: 100,
      label: '03. Bóc Tách 5 Lớp Khung Gót, Lót & Đế Carbon',
    },
  },
  gloves: {
    0: {
      camX: -0.08,
      camY: 0.24,
      camZ: 2.55,
      lookX: -0.05,
      lookY: 0.2,
      rotX: 0.1,
      rotY: 0.22,
      autoSpin: false,
      explode: 0,
      label: '01. Cận Cảnh Mút German Latex 4mm & Ngón Tay',
    },
    1: {
      camX: -0.05,
      camY: 0.12,
      camZ: 5.2,
      lookX: 0,
      lookY: 0.05,
      rotX: 0.12,
      rotY: 0.28,
      autoSpin: true,
      explode: 0,
      label: '02. Toàn Cảnh 360° Găng Thủ Môn Negative-Cut',
    },
    2: {
      camX: -0.05,
      camY: 0.15,
      camZ: 6.0,
      lookX: 0,
      lookY: 0.05,
      rotX: 0.16,
      rotY: 0.42,
      autoSpin: true,
      explode: 100,
      label: '03. Bóc Tách 5 Thanh Xương Carbon Ortho-Spine',
    },
  },
};

const STAGE_SHOWCASE_META: Record<
  ProductCategory,
  {
    kicker: string;
    title: string;
    subtitle: string;
    sizes: string[];
    defaultSizeIdx: number;
  }
> = {
  kits: {
    kicker: 'FC BAYERN MÜNCHEN · AUTHENTIC PLAYER-ISSUE',
    title: 'FC Bayern Heimtrikot 24/25',
    subtitle: 'Rot & Weiß Checkered Jacquard · Gold-Piped Collar & 5 Sterne',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    defaultSizeIdx: 2,
  },
  balls: {
    kicker: 'FIFA QUALITY PRO · MATCH BALL',
    title: 'Architect Pro Official Ball',
    subtitle: 'Thermally Bonded 20-Panel Aero Shell · 0.0% Water Uptake',
    sizes: ['SIZE 4', 'SIZE 5', 'PRO BOX'],
    defaultSizeIdx: 1,
  },
  boots: {
    kicker: 'MONTEBELLUNA · SERIES XI',
    title: 'Veloce Carbon XI FG',
    subtitle: '11-Ply Biaxial Carbon Chassis · 178g Ultra-Light Speed Boot',
    sizes: ['40', '41', '42', '42.5', '43', '44'],
    defaultSizeIdx: 2,
  },
  gloves: {
    kicker: 'GERMAN CONTACT LATEX · PRO GK',
    title: 'Adaptive Grip Pro GK',
    subtitle: '4.0 mm Hydro-Contact Latex · 5 Removable Carbon Ortho-Spines',
    sizes: ['8.0', '8.5', '9.0', '9.5', '10.0'],
    defaultSizeIdx: 2,
  },
};

export const ThreeGearStage: React.FC<ThreeGearStageProps> = ({
  activeCategory,
  onSelectCategory,
  onSelectProduct,
  onQuickAdd,
  quickAddedId,
  customName = 'ROSSI',
  customNumber = '10',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<ProductCategory, HTMLElement | null>>({
    kits: null,
    balls: null,
    boots: null,
    gloves: null,
  });

  // Default to Slide 0 (Macro Detail View matching the DFB Heimtrikot 2024 reference photo!)
  const [cameraSlide, setCameraSlide] = useState<CameraViewSlide>(0);
  const [explodePercent, setExplodePercent] = useState<number>(0);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);
  const [lightingMode, setLightingMode] = useState<StudioLightingMode>('studio');
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);
  const [showCadDrawer, setShowCadDrawer] = useState<boolean>(false);
  const [wishlisted, setWishlisted] = useState<Record<ProductCategory, boolean>>({
    kits: false,
    balls: false,
    boots: false,
    gloves: false,
  });
  const [selectedStageSizeIdx, setSelectedStageSizeIdx] = useState<
    Record<ProductCategory, number>
  >({
    kits: 2, // 'L' selected by default matching the inner collar size print in photo
    balls: 1,
    boots: 2,
    gloves: 2,
  });
  const [selectedColorwayIdx, setSelectedColorwayIdx] = useState<
    Record<ProductCategory, number>
  >({
    kits: 0,
    balls: 0,
    boots: 0,
    gloves: 0,
  });
  const [previewProductByCat, setPreviewProductByCat] = useState<
    Record<ProductCategory, Product | null>
  >({
    kits: null,
    balls: null,
    boots: null,
    gloves: null,
  });
  const [expandedChapters, setExpandedChapters] = useState<
    Record<ProductCategory, boolean>
  >({
    kits: false,
    balls: false,
    boots: false,
    gloves: false,
  });

  const [webglReady, setWebglReady] = useState<boolean>(true);

  const autoRotateRef = useRef<boolean>(false);
  autoRotateRef.current = isAutoRotate;

  const activeCategoryRef = useRef<ProductCategory>(activeCategory);
  activeCategoryRef.current = activeCategory;

  const lightingModeRef = useRef<StudioLightingMode>(lightingMode);
  lightingModeRef.current = lightingMode;

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    rootGroup: THREE.Group;
    turntableGroup: THREE.Group;
    windTunnelGroup: THREE.Group;
    windLines: THREE.Line[];
    categoryGroups: Record<ProductCategory, THREE.Group>;
    explodableParts: Record<ProductCategory, ExplodablePart[]>;
    colorwayAppliers: Record<ProductCategory, (preset: ColorwayPreset) => void>;
    materialsToWireframe: THREE.MeshStandardMaterial[];
    ambientLight: THREE.AmbientLight;
    keyLight: THREE.DirectionalLight;
    rimLight: THREE.DirectionalLight;
    pointLightAccent: THREE.PointLight;
    numberTex: THREE.CanvasTexture;
    targetRotation: { x: number; y: number };
    targetLookAt: { x: number; y: number; z: number };
    currentLookAt: { x: number; y: number; z: number };
    targetZoomDist: number;
    baseZoomDist: number;
  } | null>(null);

  const applyExplodeFactor = useCallback(
    (cat: ProductCategory, factor01: number, animate: boolean = false) => {
      const ctx = sceneRef.current;
      if (!ctx) return;
      const parts = ctx.explodableParts[cat];
      parts.forEach((part) => {
        const tx = THREE.MathUtils.lerp(part.basePos.x, part.explodedPos.x, factor01);
        const ty = THREE.MathUtils.lerp(part.basePos.y, part.explodedPos.y, factor01);
        const tz = THREE.MathUtils.lerp(part.basePos.z, part.explodedPos.z, factor01);

        const rx = THREE.MathUtils.lerp(part.baseRot.x, part.explodedRot.x, factor01);
        const ry = THREE.MathUtils.lerp(part.baseRot.y, part.explodedRot.y, factor01);
        const rz = THREE.MathUtils.lerp(part.baseRot.z, part.explodedRot.z, factor01);

        if (animate) {
          gsap.to(part.mesh.position, {
            x: tx,
            y: ty,
            z: tz,
            duration: 0.65,
            ease: 'expo.out',
          });
          gsap.to(part.mesh.rotation, {
            x: rx,
            y: ry,
            z: rz,
            duration: 0.65,
            ease: 'expo.out',
          });
        } else {
          part.mesh.position.set(tx, ty, tz);
          part.mesh.rotation.set(rx, ry, rz);
        }
      });
    },
    []
  );

  const highlightLayer = useCallback(
    (cat: ProductCategory, layerId: string | null) => {
      const ctx = sceneRef.current;
      if (!ctx) return;

      ctx.materialsToWireframe.forEach((mat) => {
        if (mat.userData.baseEmissive !== undefined) {
          mat.emissive.setHex(mat.userData.baseEmissive);
          mat.emissiveIntensity = mat.userData.baseEmissiveIntensity ?? 0;
        }
      });

      if (!layerId) return;

      const matchingParts = ctx.explodableParts[cat].filter(
        (p) => p.layerId === layerId
      );
      matchingParts.forEach((p) => {
        p.highlightMaterials.forEach((mat) => {
          if (mat.userData.baseEmissive === undefined) {
            mat.userData.baseEmissive = mat.emissive.getHex();
            mat.userData.baseEmissiveIntensity = mat.emissiveIntensity;
          }
          mat.emissive.setHex(0xe11d48);
          gsap.fromTo(
            mat,
            { emissiveIntensity: 0.45 },
            { emissiveIntensity: 0.14, duration: 0.75, ease: 'power2.out' }
          );
        });
      });
    },
    []
  );

  // Apply one of the 3 curated Camera View Slides (0: Macro, 1: 360° Full, 2: Exploded CAD)
  const applyCameraSlide = useCallback(
    (cat: ProductCategory, slide: CameraViewSlide, animate: boolean = true) => {
      setCameraSlide(slide);
      const ctx = sceneRef.current;
      if (!ctx) return;

      const preset = CAMERA_SLIDE_PRESETS[cat][slide];
      setIsAutoRotate(preset.autoSpin);
      setExplodePercent(preset.explode);
      applyExplodeFactor(cat, preset.explode / 100, animate);

      // Hide floor turntable ring in close-up Macro mode so the fabric/product fills the frame cleanly
      ctx.turntableGroup.visible = slide !== 0;

      ctx.baseZoomDist = preset.camZ;
      ctx.targetZoomDist = preset.camZ;

      if (animate) {
        gsap.to(ctx.camera.position, {
          x: preset.camX,
          y: preset.camY,
          duration: 0.75,
          ease: 'power3.out',
        });
        gsap.to(ctx.targetLookAt, {
          x: preset.lookX,
          y: preset.lookY,
          z: 0,
          duration: 0.75,
          ease: 'power3.out',
        });
        gsap.to(ctx.targetRotation, {
          x: preset.rotX,
          y: preset.rotY,
          duration: 0.75,
          ease: 'power3.out',
        });
      } else {
        ctx.camera.position.set(preset.camX, preset.camY, preset.camZ);
        ctx.targetLookAt.x = preset.lookX;
        ctx.targetLookAt.y = preset.lookY;
        ctx.currentLookAt.x = preset.lookX;
        ctx.currentLookAt.y = preset.lookY;
        ctx.targetRotation.x = preset.rotX;
        ctx.targetRotation.y = preset.rotY;
      }
    },
    [applyExplodeFactor]
  );

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglReady(false);
      return;
    }

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 480;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const envTexture = createStudioEnvironment(renderer);
    scene.environment = envTexture;

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    const initialPreset = CAMERA_SLIDE_PRESETS[activeCategory][0];
    camera.position.set(initialPreset.camX, initialPreset.camY, initialPreset.camZ);

    // Daylight White Studio Grazing Lighting Rig (accentuates embossed jacquard & 3D stars!)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3.8, 5.2, 4.2);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe2e8f0, 1.35);
    rimLight.position.set(-4.8, 2.2, 2.5);
    scene.add(rimLight);

    const pointLightAccent = new THREE.PointLight(0xffffff, 1.6, 14);
    pointLightAccent.position.set(1.8, -1.2, 2.8);
    scene.add(pointLightAccent);

    // Precision Turntable Ring (visible in slides 1 & 2)
    const turntableGroup = new THREE.Group();
    turntableGroup.position.y = -1.52;
    turntableGroup.visible = false;
    scene.add(turntableGroup);

    const outerRingGeo = new THREE.RingGeometry(1.82, 1.85, 96);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x78716c,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI / 2;
    turntableGroup.add(outerRing);

    // Wind-Tunnel Aerodynamic Streamlines Group
    const windTunnelGroup = new THREE.Group();
    windTunnelGroup.visible = false;
    scene.add(windTunnelGroup);

    const windLines: THREE.Line[] = [];
    const streamOffsets = [
      { y: 0.85, z: 0.55, amp: 0.18 },
      { y: 0.45, z: 0.82, amp: 0.24 },
      { y: 0.05, z: 0.95, amp: 0.28 },
      { y: -0.35, z: 0.82, amp: 0.22 },
      { y: -0.75, z: 0.55, amp: 0.15 },
      { y: 0.65, z: -0.65, amp: 0.2 },
      { y: 0.15, z: -0.9, amp: 0.26 },
      { y: -0.45, z: -0.7, amp: 0.2 },
    ];
    streamOffsets.forEach((st, idx) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 40; i++) {
        const x = -2.8 + (i / 40) * 5.6;
        const deflection = Math.exp(-x * x * 0.8) * st.amp;
        const signZ = st.z >= 0 ? 1 : -1;
        pts.push(
          new THREE.Vector3(
            x,
            st.y + deflection * 0.45,
            st.z + signZ * deflection
          )
        );
      }
      const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const lMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0x0284c7 : 0xe11d48,
        transparent: true,
        opacity: 0.65,
      });
      const line = new THREE.Line(lGeo, lMat);
      line.userData = { baseY: st.y, baseZ: st.z, amp: st.amp, phase: idx * 0.9 };
      windTunnelGroup.add(line);
      windLines.push(line);
    });

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const materialsToWireframe: THREE.MeshStandardMaterial[] = [];
    const registerMat = (mat: THREE.MeshStandardMaterial) => {
      materialsToWireframe.push(mat);
      return mat;
    };

    const carbonTextures = createCarbonWeaveTexture();
    const knitBump = createJacquardKnitTexture();
    const numberTex = createNumberPlateTexture(customNumber, customName);
    const dimpleBump = createBallDimpleTexture();

    const kitBuilt = buildKitAssembly(registerMat, knitBump, numberTex);
    const ballBuilt = buildBallAssembly(registerMat, dimpleBump);
    const bootBuilt = buildBootAssembly(registerMat, carbonTextures, knitBump);
    const gloveBuilt = buildGloveAssembly(registerMat, carbonTextures, knitBump);

    const categoryGroups: Record<ProductCategory, THREE.Group> = {
      kits: kitBuilt.group,
      balls: ballBuilt.group,
      boots: bootBuilt.group,
      gloves: gloveBuilt.group,
    };

    const explodableParts: Record<ProductCategory, ExplodablePart[]> = {
      kits: kitBuilt.parts,
      balls: ballBuilt.parts,
      boots: bootBuilt.parts,
      gloves: gloveBuilt.parts,
    };

    const colorwayAppliers: Record<
      ProductCategory,
      (preset: ColorwayPreset) => void
    > = {
      kits: kitBuilt.applyColorway,
      balls: ballBuilt.applyColorway,
      boots: bootBuilt.applyColorway,
      gloves: gloveBuilt.applyColorway,
    };

    (Object.keys(explodableParts) as ProductCategory[]).forEach((cat) => {
      explodableParts[cat].forEach((part) => {
        part.mesh.traverse((child) => {
          child.userData.layerId = part.layerId;
          child.userData.category = cat;
        });
      });
    });

    (Object.keys(categoryGroups) as ProductCategory[]).forEach((cat) => {
      const grp = categoryGroups[cat];
      grp.visible = cat === activeCategory;
      rootGroup.add(grp);
    });

    const targetRotation = { x: initialPreset.rotX, y: initialPreset.rotY };
    const targetLookAt = { x: initialPreset.lookX, y: initialPreset.lookY, z: 0 };
    const currentLookAt = { x: initialPreset.lookX, y: initialPreset.lookY, z: 0 };

    rootGroup.rotation.set(initialPreset.rotX, initialPreset.rotY, 0);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      rootGroup,
      turntableGroup,
      windTunnelGroup,
      windLines,
      categoryGroups,
      explodableParts,
      colorwayAppliers,
      materialsToWireframe,
      ambientLight,
      keyLight,
      rimLight,
      pointLightAccent,
      numberTex,
      targetRotation,
      targetLookAt,
      currentLookAt,
      targetZoomDist: initialPreset.camZ,
      baseZoomDist: initialPreset.camZ,
    };

    // Pointer Drag Orbit + Raycaster Click Inspection
    let isDragging = false;
    let downX = 0;
    let downY = 0;
    let prevX = 0;
    let prevY = 0;
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      downX = e.clientX;
      downY = e.clientY;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !sceneRef.current) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      sceneRef.current.targetRotation.y += dx * 0.008;
      sceneRef.current.targetRotation.x = Math.max(
        -0.85,
        Math.min(0.85, sceneRef.current.targetRotation.x + dy * 0.008)
      );
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;

      const moveDist = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (moveDist < 5 && sceneRef.current) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        const currentCat = activeCategoryRef.current;
        const activeGroup = sceneRef.current.categoryGroups[currentCat];
        raycaster.setFromCamera(pointerNDC, sceneRef.current.camera);
        const hits = raycaster.intersectObjects(activeGroup.children, true);
        if (hits.length > 0) {
          let obj: THREE.Object3D | null = hits[0].object;
          while (obj && !obj.userData.layerId) {
            obj = obj.parent;
          }
          if (obj?.userData?.layerId) {
            const clickedLayer = obj.userData.layerId as string;
            setActiveLayerId(clickedLayer);
            highlightLayer(currentCat, clickedLayer);
          }
        }
      }
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container || !sceneRef.current) return;
      const w = container.clientWidth || 640;
      const h = container.clientHeight || 480;
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const tick = (time: number) => {
      if (!sceneRef.current) return;
      const {
        rootGroup: rg,
        turntableGroup: tg,
        windLines: wLines,
        targetRotation: tr,
        targetLookAt: tla,
        currentLookAt: cla,
        renderer: ren,
        scene: sc,
        camera: cam,
      } = sceneRef.current;

      if (!isDragging && autoRotateRef.current) {
        tr.y += 0.0036;
      }

      rg.rotation.y += (tr.y - rg.rotation.y) * 0.1;
      rg.rotation.x += (tr.x - rg.rotation.x) * 0.1;
      rg.position.y = Math.sin(time * 1.4) * 0.025;

      tg.rotation.y = rg.rotation.y * 0.5;

      cam.position.z += (sceneRef.current.targetZoomDist - cam.position.z) * 0.1;
      cla.x += (tla.x - cla.x) * 0.1;
      cla.y += (tla.y - cla.y) * 0.1;
      cam.lookAt(cla.x, cla.y, cla.z);

      if (lightingModeRef.current === 'windtunnel') {
        wLines.forEach((line) => {
          const posAttr = line.geometry.attributes.position;
          const { baseY, baseZ, amp, phase } = line.userData;
          const signZ = baseZ >= 0 ? 1 : -1;
          for (let i = 0; i <= 40; i++) {
            const x = -2.8 + (i / 40) * 5.6;
            const wave = Math.sin(x * 2.2 - time * 7.5 + phase) * 0.055;
            const deflection = Math.exp(-x * x * 0.8) * amp;
            posAttr.setXYZ(
              i,
              x,
              baseY + deflection * 0.45 + wave,
              baseZ + signZ * deflection + wave * 0.5
            );
          }
          posAttr.needsUpdate = true;
        });
      }

      ren.render(sc, cam);
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      domElem.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      envTexture.dispose();
      renderer.dispose();
    };
  }, [highlightLayer]);

  // Live update 3D Jersey Squad Number & Name Texture when Custom Lab inputs change
  useEffect(() => {
    const ctx = sceneRef.current;
    if (!ctx || !ctx.numberTex) return;
    const canvas = ctx.numberTex.image as HTMLCanvasElement;
    if (canvas) {
      drawNumberPlateCanvas(canvas, customNumber || '10', customName || 'ROSSI');
      ctx.numberTex.needsUpdate = true;
    }
  }, [customName, customNumber]);

  // GSAP Transition when `activeCategory` changes
  useEffect(() => {
    const ctx = sceneRef.current;
    if (!ctx) return;

    const { categoryGroups, rootGroup } = ctx;

    setActiveLayerId(CATEGORY_LAYERS[activeCategory][0].id);
    (Object.keys(ctx.explodableParts) as ProductCategory[]).forEach((cat) => {
      applyExplodeFactor(cat, 0, true);
    });
    highlightLayer(activeCategory, null);

    (Object.keys(categoryGroups) as ProductCategory[]).forEach((cat) => {
      const grp = categoryGroups[cat];
      if (cat === activeCategory) {
        grp.visible = true;
        grp.scale.set(0.88, 0.88, 0.88);
        gsap.to(grp.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.55,
          ease: 'power2.out',
        });
      } else {
        grp.visible = false;
      }
    });

    // Frame Slide 0 (Macro Detail View for Kits, or Full/Macro for others)
    applyCameraSlide(activeCategory, 0, true);

    gsap.fromTo(
      rootGroup.position,
      { z: -0.25 },
      { z: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeCategory, applyExplodeFactor, highlightLayer, applyCameraSlide]);

  // Lighting & Simulation Mode Switcher
  const handleSelectLightingMode = (mode: StudioLightingMode) => {
    setLightingMode(mode);
    const ctx = sceneRef.current;
    if (!ctx) return;

    ctx.windTunnelGroup.visible = mode === 'windtunnel';

    if (mode === 'studio') {
      gsap.to(ctx.ambientLight, { intensity: 1.45, duration: 0.45 });
      gsap.to(ctx.keyLight, { intensity: 2.5, duration: 0.45 });
      gsap.to(ctx.rimLight, { intensity: 1.35, duration: 0.45 });
      gsap.to(ctx.pointLightAccent, { intensity: 1.6, duration: 0.45 });
      ctx.pointLightAccent.color.setHex(0xffffff);
    } else if (mode === 'floodlight') {
      gsap.to(ctx.ambientLight, { intensity: 0.65, duration: 0.45 });
      gsap.to(ctx.keyLight, { intensity: 3.6, duration: 0.45 });
      gsap.to(ctx.rimLight, { intensity: 3.0, duration: 0.45 });
      gsap.to(ctx.pointLightAccent, { intensity: 4.2, duration: 0.45 });
      ctx.pointLightAccent.color.setHex(0x38bdf8);
    } else if (mode === 'windtunnel') {
      gsap.to(ctx.ambientLight, { intensity: 1.0, duration: 0.45 });
      gsap.to(ctx.keyLight, { intensity: 2.5, duration: 0.45 });
      gsap.to(ctx.rimLight, { intensity: 2.6, duration: 0.45 });
      gsap.to(ctx.pointLightAccent, { intensity: 3.8, duration: 0.45 });
      ctx.pointLightAccent.color.setHex(0xf43f5e);
    }
  };

  const handleSelectColorway = (cat: ProductCategory, idx: number) => {
    setSelectedColorwayIdx((prev) => ({ ...prev, [cat]: idx }));
    setPreviewProductByCat((prev) => ({ ...prev, [cat]: null }));
    const ctx = sceneRef.current;
    if (!ctx) return;
    const preset = CATEGORY_COLORWAYS[cat][idx];
    if (preset) {
      ctx.colorwayAppliers[cat](preset);
    }
  };

  const handlePreviewProductOn3D = useCallback((product: Product) => {
    setPreviewProductByCat((prev) => ({
      ...prev,
      [product.category]: product,
    }));
    const ctx = sceneRef.current;
    if (!ctx) return;
    const cw = product.colorway3D;
    ctx.colorwayAppliers[product.category]({
      id: cw.presetId || product.id,
      name: product.name,
      swatchHex: cw.swatchHex,
      secondaryHex: cw.secondaryHex,
      primaryColor: cw.primaryColor,
      secondaryColor: cw.secondaryColor,
      accentColor: cw.accentColor,
      trimColor: cw.trimColor,
    });
  }, []);

  // Magnifying Glass Button (`🔍`) in bottom-right of viewport toggles Macro Zoom <-> Full 360°
  const handleToggleMacroLens = () => {
    const nextSlide: CameraViewSlide = cameraSlide === 0 ? 1 : 0;
    applyCameraSlide(activeCategory, nextSlide, true);
  };

  const handleToggleExplode = () => {
    if (explodePercent > 20) {
      applyCameraSlide(activeCategory, 1, true);
    } else {
      applyCameraSlide(activeCategory, 2, true);
    }
  };

  const handleSliderExplode = (val: number) => {
    setExplodePercent(val);
    if (val > 20 && cameraSlide === 0) {
      // Pull camera back from Macro so user can see the full exploded assembly
      applyCameraSlide(activeCategory, 1, true);
    }
    applyExplodeFactor(activeCategory, val / 100, false);
  };

  const handleSelectLayer = (layerId: string) => {
    setActiveLayerId(layerId);
    highlightLayer(activeCategory, layerId);
    if (
      layerId === 'kit-crest' ||
      layerId === 'kit-shell' ||
      layerId === 'kit-collar'
    ) {
      applyCameraSlide(activeCategory, 0, true);
    } else if (explodePercent < 35) {
      applyCameraSlide(activeCategory, 2, true);
    }
  };

  const handleToggleWireframe = () => {
    const nextWire = !isWireframe;
    setIsWireframe(nextWire);
    if (!sceneRef.current) return;
    sceneRef.current.materialsToWireframe.forEach((mat) => {
      mat.wireframe = nextWire;
    });
  };

  // GSAP ScrollTrigger to sync Lenis scroll position & scrub 3D rotation across the 4 separated chapters
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    (Object.keys(sectionRefs.current) as ProductCategory[]).forEach((cat) => {
      const el = sectionRefs.current[cat];
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => onSelectCategory(cat, false),
        onEnterBack: () => onSelectCategory(cat, false),
        onUpdate: (self) => {
          if (sceneRef.current) {
            const velocityBoost = Math.max(
              -0.04,
              Math.min(0.04, self.getVelocity() * 0.00003)
            );
            sceneRef.current.targetRotation.y += velocityBoost;
          }
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [onSelectCategory]);

  const activeChapter =
    CATEGORY_CHAPTERS.find((c) => c.id === activeCategory) ||
    CATEGORY_CHAPTERS[0];

  const currentLayers = CATEGORY_LAYERS[activeCategory];
  const activeLayerObj =
    currentLayers.find((l) => l.id === activeLayerId) || currentLayers[0];
  const currentColorways = CATEGORY_COLORWAYS[activeCategory];
  const activeColorwayIdx = selectedColorwayIdx[activeCategory] || 0;

  const baseShowcaseMeta = STAGE_SHOWCASE_META[activeCategory];
  const previewedProduct = previewProductByCat[activeCategory];
  const stageProducts = PRODUCTS.filter((p) => p.category === activeCategory);
  const primaryStageProduct =
    previewedProduct || stageProducts[0] || PRODUCTS[0];

  const showcaseMeta = previewedProduct
    ? {
        ...baseShowcaseMeta,
        kicker: `${previewedProduct.sku} · ${previewedProduct.statusTag || previewedProduct.surfaceLabel}`,
        title: previewedProduct.name,
        subtitle: previewedProduct.subtitle,
      }
    : activeCategory === 'kits' && activeColorwayIdx === 1
    ? {
        ...baseShowcaseMeta,
        kicker: 'DEUTSCHLAND · STADIO ATELIER',
        title: 'DFB Heimtrikot 2024',
        subtitle: 'Mehr als ein Trikot. Eine Nation. · 28-Gauge Jacquard',
      }
    : activeCategory === 'kits' && activeColorwayIdx === 2
    ? {
        ...baseShowcaseMeta,
        kicker: 'MONTEBELLUNA · SERIES XI',
        title: 'Maestro Royale Home Shirt',
        subtitle: 'Midnight Navy & 24K Gold Piping · 142g Jacquard',
      }
    : baseShowcaseMeta;
  const activeSizeIdx = selectedStageSizeIdx[activeCategory] ?? 1;
  const isStageProductAdded = quickAddedId === primaryStageProduct.id;

  const isDarkViewport = lightingMode !== 'studio';

  return (
    <section
      id="three-atelier"
      className="max-w-[1360px] mx-auto px-6 lg:px-12 py-12 border-t border-stone-200"
    >
      {/* Top Section Header & 4-Category Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>Three.js Macro PBR · GSAP · Lenis Spatial Atelier</span>
            <span aria-hidden="true">·</span>
            <span>Cận Cảnh Vật Liệu & Bóc Tách 3D</span>
          </div>
          <h2 className="mt-1 text-3xl font-bold text-stone-900 tracking-tight">
            01. Áo Đấu · 02. Bóng · 03. Giày · 04. Găng
          </h2>
        </div>

        {/* Interactive 4-Category Segmented Control */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-200/80 rounded-xl">
          {CATEGORY_CHAPTERS.map((chap) => {
            const isActive = chap.id === activeCategory;
            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => onSelectCategory(chap.id, true)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                {chap.index}. {chap.titleVi} ({chap.titleEn})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Scrollytelling Layout */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Sticky Left 5 Columns: DFB-Inspired Clean Daylight 3D Showcase Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 bg-white text-stone-900 rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-xl">
          {/* Top Compact Bar: Colorway Swatches & Lighting Mode */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-stone-500">
                Phối màu 3D:
              </span>
              {currentColorways.map((cw, idx) => {
                const isSelected = idx === activeColorwayIdx;
                return (
                  <button
                    key={cw.id}
                    type="button"
                    onClick={() => handleSelectColorway(activeCategory, idx)}
                    title={cw.name}
                    aria-label={`Select colorway ${cw.name}`}
                    className={`w-5 h-5 rounded-full p-0.5 border transition-transform cursor-pointer ${
                      isSelected
                        ? 'border-stone-950 scale-110 ring-2 ring-stone-900/20'
                        : 'border-stone-300 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <span
                      className="block w-full h-full rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${cw.swatchHex} 55%, ${cw.secondaryHex} 55%)`,
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Studio / Floodlight / Wind-Tunnel Mode Pill */}
            <div className="flex items-center gap-0.5 bg-stone-100 p-0.5 rounded-lg border border-stone-200/70">
              <button
                type="button"
                onClick={() => handleSelectLightingMode('studio')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium inline-flex items-center gap-1 transition-colors cursor-pointer ${
                  lightingMode === 'studio'
                    ? 'bg-white text-stone-950 shadow-2xs font-semibold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <Sun className="w-3 h-3" />
                <span>Daylight</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectLightingMode('floodlight')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium inline-flex items-center gap-1 transition-colors cursor-pointer ${
                  lightingMode === 'floodlight'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <Moon className="w-3 h-3" />
                <span>Night</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectLightingMode('windtunnel')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium inline-flex items-center gap-1 transition-colors cursor-pointer ${
                  lightingMode === 'windtunnel'
                    ? 'bg-rose-700 text-white font-semibold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <Wind className="w-3 h-3" />
                <span>Aero</span>
              </button>
            </div>
          </div>

          {/* Rounded-2xl 3D Studio Viewport (Matching the uploaded DFB Heimtrikot 2024 Card!) */}
          <div
            className={`relative h-[390px] sm:h-[430px] w-full rounded-2xl overflow-hidden select-none transition-colors duration-300 ${
              isDarkViewport
                ? 'bg-[radial-gradient(ellipse_at_center,_#292524_0%,_#0c0a09_78%)]'
                : 'bg-[radial-gradient(circle_at_35%_25%,_#F7F6F2_0%,_#EAE8E3_62%,_#DFDDD7_100%)]'
            }`}
          >
            {webglReady ? (
              <div
                ref={mountRef}
                className="w-full h-full cursor-grab active:cursor-grabbing"
                aria-label={`Interactive 3D model for ${activeChapter.titleVi}`}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                <Move3d className="w-10 h-10 text-stone-700 mb-3" />
                <p className="text-sm font-semibold text-stone-900">
                  {activeChapter.modelSpecLabel}
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  {activeChapter.summary}
                </p>
              </div>
            )}

            {/* Top-Left Subtle Camera Angle Badge */}
            <div
              className={`absolute top-3.5 left-3.5 pointer-events-none text-[11px] font-medium flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border ${
                isDarkViewport
                  ? 'bg-stone-950/75 text-stone-200 border-stone-800'
                  : 'bg-white/85 text-stone-700 border-stone-200/80 shadow-2xs'
              }`}
            >
              <Move3d className="w-3.5 h-3.5 text-rose-600" />
              <span>
                {CAMERA_SLIDE_PRESETS[activeCategory][cameraSlide].label}
              </span>
            </div>

            {/* Bottom-Left Quick Layer / Explode Pill inside Viewport */}
            <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleToggleExplode}
                className={`px-3 py-2 rounded-full text-[11px] font-semibold backdrop-blur-md border transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  explodePercent > 20
                    ? 'bg-stone-900 text-white border-stone-900'
                    : isDarkViewport
                    ? 'bg-stone-900/85 text-white border-stone-700 hover:bg-stone-800'
                    : 'bg-white/90 text-stone-900 border-stone-200/90 hover:bg-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>
                  {explodePercent > 20 ? 'Ghép Nguyên Khối' : 'Bóc Tách 3D'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsAutoRotate((prev) => !prev)}
                className={`p-2 rounded-full backdrop-blur-md border transition-colors cursor-pointer shadow-sm ${
                  isDarkViewport
                    ? 'bg-stone-900/85 text-stone-200 border-stone-700 hover:text-white'
                    : 'bg-white/90 text-stone-800 border-stone-200/90 hover:bg-white'
                }`}
                aria-label="Toggle 3D rotation"
                title={isAutoRotate ? 'Tạm dừng xoay' : 'Tự động xoay 360°'}
              >
                {isAutoRotate ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Bottom-Right Iconic White Circular Magnifying Glass Button (`🔍` — Exact match to reference photo!) */}
            <button
              type="button"
              onClick={handleToggleMacroLens}
              aria-label={
                cameraSlide === 0
                  ? 'Thu nhỏ xem toàn cảnh 360°'
                  : 'Phóng đại cận cảnh Macro huy hiệu & vân vải'
              }
              title={
                cameraSlide === 0
                  ? 'Xem toàn cảnh 360° (Zoom Out)'
                  : 'Cận cảnh Macro Huy Hiệu & Vải Jacquard (Zoom In)'
              }
              className="absolute bottom-3.5 right-3.5 w-11 h-11 rounded-full bg-white text-stone-900 shadow-lg border border-stone-200/80 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              {cameraSlide === 0 ? (
                <ZoomOut className="w-5 h-5 stroke-[2]" />
              ) : (
                <ZoomIn className="w-5 h-5 stroke-[2]" />
              )}
            </button>
          </div>

          {/* 3-Slide Pagination Indicator Bars (`— - -` directly below viewport, matching photo!) */}
          <div
            className="mt-4 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Góc máy 3D"
          >
            {([0, 1, 2] as CameraViewSlide[]).map((slideIdx) => {
              const isCurrentSlide = cameraSlide === slideIdx;
              return (
                <button
                  key={slideIdx}
                  type="button"
                  role="tab"
                  aria-selected={isCurrentSlide}
                  onClick={() =>
                    applyCameraSlide(activeCategory, slideIdx, true)
                  }
                  title={CAMERA_SLIDE_PRESETS[activeCategory][slideIdx].label}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    isCurrentSlide
                      ? 'w-7 bg-stone-950'
                      : 'w-3 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              );
            })}
          </div>

          {/* Product Details, Wishlist Heart, Size Matrix & Primary Black CTA (Exact layout from reference image) */}
          <div className="mt-5 pt-1">
            <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-400">
              {showcaseMeta.kicker}
            </div>

            <div className="mt-1 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-bold text-stone-950 tracking-tight">
                {showcaseMeta.title}
              </h3>
              <button
                type="button"
                onClick={() =>
                  setWishlisted((prev) => ({
                    ...prev,
                    [activeCategory]: !prev[activeCategory],
                  }))
                }
                aria-label="Save to wishlist"
                className="p-1.5 text-stone-800 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    wishlisted[activeCategory]
                      ? 'fill-rose-600 text-rose-600'
                      : 'stroke-[1.75]'
                  }`}
                />
              </button>
            </div>

            <p className="mt-0.5 text-xs text-stone-500">
              {showcaseMeta.subtitle}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-lg font-bold text-stone-950 font-mono-tabular">
                  ${primaryStageProduct.price}.00
                </span>
                {primaryStageProduct.externalUrl && (
                  <a
                    href={primaryStageProduct.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-[11px] font-semibold text-stone-700 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Google Shopping</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowCadDrawer((prev) => !prev)}
                className="text-xs font-semibold text-stone-600 hover:text-stone-950 inline-flex items-center gap-1 underline underline-offset-4 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>
                  {showCadDrawer
                    ? 'Ẩn thanh trượt bóc tách CAD'
                    : 'Mở điều khiển bóc tách CAD 3D'}
                </span>
              </button>
            </div>

            {/* Expandable CAD Layer & Explode Slider Drawer */}
            {showCadDrawer && (
              <div className="mt-3 p-3.5 rounded-xl bg-stone-100 border border-stone-200/90 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800">
                    Độ tách lớp 3D ({explodePercent}%)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleToggleWireframe}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold border cursor-pointer ${
                        isWireframe
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      <Grid className="w-3 h-3 inline mr-1" />
                      Wireframe
                    </button>
                    <button
                      type="button"
                      onClick={() => applyCameraSlide(activeCategory, 0, true)}
                      className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white text-stone-700 border border-stone-300 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3 inline mr-1" />
                      Reset
                    </button>
                  </div>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={explodePercent}
                  onChange={(e) => handleSliderExplode(Number(e.target.value))}
                  aria-label="Explode 3D layers percentage"
                  className="w-full h-1.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-stone-950"
                />

                <div className="flex flex-wrap gap-1">
                  {currentLayers.map((layer) => {
                    const isSelected = activeLayerObj.id === layer.id;
                    return (
                      <button
                        key={layer.id}
                        type="button"
                        onClick={() => handleSelectLayer(layer.id)}
                        className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-stone-950 text-white font-semibold'
                            : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {layer.code}. {layer.nameVi}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Clean Size Selector Pills (`S · M · L · XL · XXL` matching photo) */}
            <div
              className="mt-4 grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${showcaseMeta.sizes.length}, minmax(0, 1fr))`,
              }}
            >
              {showcaseMeta.sizes.map((sz, idx) => {
                const isSelected = idx === activeSizeIdx;
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() =>
                      setSelectedStageSizeIdx((prev) => ({
                        ...prev,
                        [activeCategory]: idx,
                      }))
                    }
                    className={`py-2.5 px-2 text-xs rounded-lg border transition-colors font-medium cursor-pointer ${
                      isSelected
                        ? 'bg-stone-950 text-white border-stone-950 font-semibold shadow-xs'
                        : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>

            {/* Full-Width Solid Black Primary Action Bar (`IN DEN WARENKORB →` / `THÊM VÀO TÚI ĐẤU →`) */}
            <button
              type="button"
              onClick={(e) =>
                onQuickAdd(
                  primaryStageProduct,
                  e,
                  showcaseMeta.sizes[activeSizeIdx]
                )
              }
              className={`mt-4 w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-[0.12em] transition-colors flex items-center justify-center gap-3 cursor-pointer ${
                isStageProductAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-950 hover:bg-stone-800 text-white'
              }`}
            >
              {isStageProductAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>ĐÃ THÊM VÀO TÚI ĐẤU (SIZE {showcaseMeta.sizes[activeSizeIdx]})</span>
                </>
              ) : (
                <>
                  <span>IN DEN WARENKORB · THÊM VÀO GIỎ</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right 7 Columns: 4 Distinct Separated Sections (Áo Đấu, Bóng, Giày, Găng) */}
        <div className="lg:col-span-7 space-y-16">
          {CATEGORY_CHAPTERS.map((chapter) => {
            const chapterProducts = PRODUCTS.filter(
              (p) => p.category === chapter.id
            );
            const isCurrentChapter = chapter.id === activeCategory;
            const chapterLayers = CATEGORY_LAYERS[chapter.id];

            return (
              <div
                key={chapter.id}
                id={`chapter-${chapter.id}`}
                data-chapter-category={chapter.id}
                ref={(el) => {
                  sectionRefs.current[chapter.id] = el;
                }}
                className={`rounded-xl border transition-colors p-6 sm:p-8 ${
                  isCurrentChapter
                    ? 'bg-white border-stone-900 shadow-md'
                    : 'bg-white/80 border-stone-200'
                }`}
              >
                {/* Chapter Editorial Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                  <span>{chapter.kicker}</span>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(chapter.id, false)}
                    className={`font-semibold underline underline-offset-4 cursor-pointer ${
                      isCurrentChapter
                        ? 'text-rose-700'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {isCurrentChapter
                      ? '● Đang hiển thị trên sân khấu 3D'
                      : 'Kích hoạt mô hình 3D'}
                  </button>
                </div>

                <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                  {chapter.index}. {chapter.titleVi} — {chapter.headline}
                </h3>

                <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                  {chapter.summary}
                </p>

                {/* Interactive 3D Layer Architecture Breakdown Strip inside each Chapter */}
                <div className="mt-5 p-4 rounded-xl bg-[#F9F8F6] border border-stone-200/90">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2.5">
                    <span className="font-semibold text-stone-800">
                      Cấu Trúc Giải Phẫu 3D ({chapterLayers.length} Lớp Kỹ Thuật)
                    </span>
                    <span>Click để soi cận cảnh hoặc bóc tách 3D</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {chapterLayers.map((layer) => {
                      const isHighlighted =
                        isCurrentChapter && activeLayerObj.id === layer.id;
                      return (
                        <button
                          key={layer.id}
                          type="button"
                          onClick={() => {
                            if (!isCurrentChapter) {
                              onSelectCategory(chapter.id, false);
                            }
                            setTimeout(() => handleSelectLayer(layer.id), 50);
                          }}
                          className={`text-left p-2.5 rounded-lg border transition-colors cursor-pointer ${
                            isHighlighted
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="font-semibold truncate">
                              {layer.code}. {layer.nameVi}
                            </span>
                            <span
                              className={`font-mono-tabular text-[11px] shrink-0 ${
                                isHighlighted ? 'text-rose-400' : 'text-stone-500'
                              }`}
                            >
                              {layer.metric.split('·')[0]}
                            </span>
                          </div>
                          <div
                            className={`mt-0.5 text-[11px] truncate ${
                              isHighlighted ? 'text-stone-300' : 'text-stone-500'
                            }`}
                          >
                            {layer.material}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick 3D Model Product Selector Strip for all products in this chapter */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-stone-800">
                      Chọn mẫu thử nhanh trên sân khấu 3D ({chapterProducts.length} mẫu):
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedChapters((prev) => ({
                          ...prev,
                          [chapter.id]: !prev[chapter.id],
                        }))
                      }
                      className="text-xs font-semibold text-rose-700 hover:underline cursor-pointer"
                    >
                      {expandedChapters[chapter.id]
                        ? 'Thu gọn danh sách (6 mẫu)'
                        : `Xem toàn bộ ${chapterProducts.length} mẫu`}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {chapterProducts.map((prod) => {
                      const isPreviewed =
                        previewProductByCat[chapter.id]?.id === prod.id;
                      return (
                        <button
                          key={prod.id}
                          type="button"
                          onClick={() => {
                            if (!isCurrentChapter) {
                              onSelectCategory(chapter.id, false);
                            }
                            setTimeout(() => handlePreviewProductOn3D(prod), 30);
                          }}
                          className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isPreviewed
                              ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                              : 'bg-[#F9F8F6] text-stone-700 border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/15"
                            style={{
                              background: `linear-gradient(135deg, ${prod.colorway3D.swatchHex} 55%, ${prod.colorway3D.secondaryHex} 55%)`,
                            }}
                          />
                          <span className="max-w-[180px] truncate">
                            {prod.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dedicated Product Cards for this Separated Category */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {(expandedChapters[chapter.id]
                    ? chapterProducts
                    : chapterProducts.slice(0, 6)
                  ).map((product) => {
                    const isQuickAdded = quickAddedId === product.id;
                    const isPreviewedOnStage =
                      previewProductByCat[chapter.id]?.id === product.id;
                    return (
                      <article
                        key={product.id}
                        onMouseEnter={() => {
                          if (isCurrentChapter) {
                            handlePreviewProductOn3D(product);
                          }
                        }}
                        onClick={() => onSelectProduct(product)}
                        className={`group bg-[#F9F8F6] border rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
                          isPreviewedOnStage && isCurrentChapter
                            ? 'border-stone-900 ring-1 ring-stone-900/15'
                            : 'border-stone-200'
                        }`}
                      >
                        <div>
                          <div className="aspect-4/3 w-full bg-[#F2F0EC] overflow-hidden relative">
                            <ResilientImage
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                              fallbackTitle={product.name}
                              fallbackSubtitle={product.subtitle}
                            />
                            {/* Colorway Swatch Badge on Top-Left of Product Card */}
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-stone-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-stone-800 shadow-2xs">
                              <span
                                className="w-3 h-3 rounded-full border border-stone-300"
                                style={{
                                  background: `linear-gradient(135deg, ${product.colorway3D.swatchHex} 55%, ${product.colorway3D.secondaryHex} 55%)`,
                                }}
                              />
                              <span>{product.sku}</span>
                            </div>

                            {product.externalUrl && (
                              <a
                                href={product.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                title="Xem trên Google Shopping"
                                className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-stone-900/85 hover:bg-stone-950 text-white text-[11px] font-medium inline-flex items-center gap-1 backdrop-blur-xs transition-colors"
                              >
                                <span>Shopping</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </a>
                            )}
                          </div>

                          <div className="p-5">
                            <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
                              <span className="uppercase tracking-wider font-medium">
                                {chapter.titleVi}
                              </span>
                              {product.statusTag && (
                                <span className="text-stone-600 font-medium">
                                  {product.statusTag}
                                </span>
                              )}
                            </div>

                            <div className="mt-1.5 flex items-baseline justify-between gap-3">
                              <h4 className="text-base font-semibold text-stone-900 group-hover:text-rose-700 transition-colors line-clamp-2">
                                {product.name}
                              </h4>
                              <span className="text-[15px] font-semibold text-stone-900 font-mono-tabular shrink-0">
                                ${product.price}.00
                              </span>
                            </div>

                            <div className="mt-1.5 flex items-center gap-2 text-xs text-stone-500">
                              <span className="font-mono-tabular">
                                {product.weightGrams} g
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{product.surfaceLabel}</span>
                            </div>

                            <p className="mt-2.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                              {product.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="px-5 pb-5 pt-3 border-t border-stone-200/70 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProduct(product);
                            }}
                            className="flex-1 py-2 px-3 rounded-lg border border-stone-300 bg-white hover:border-stone-900 text-xs font-semibold text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Configure & Size
                          </button>
                          <button
                            type="button"
                            onClick={(e) => onQuickAdd(product, e)}
                            className={`py-2 px-3.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              isQuickAdded
                                ? 'bg-emerald-700 text-white'
                                : 'bg-stone-900 hover:bg-stone-800 text-white'
                            }`}
                          >
                            {isQuickAdded ? (
                              <span className="inline-flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Added
                              </span>
                            ) : (
                              'Quick Add'
                            )}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {chapterProducts.length > 6 && (
                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedChapters((prev) => ({
                          ...prev,
                          [chapter.id]: !prev[chapter.id],
                        }))
                      }
                      className="px-5 py-2.5 rounded-lg border border-stone-300 bg-[#F9F8F6] hover:border-stone-900 text-xs font-semibold text-stone-900 transition-colors cursor-pointer"
                    >
                      {expandedChapters[chapter.id]
                        ? `Thu gọn bớt danh sách (${chapter.titleVi})`
                        : `Hiển thị đầy đủ ${chapterProducts.length} mẫu ${chapter.titleVi} →`}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
