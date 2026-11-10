/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  Check,
  Ruler,
  PackageCheck,
} from 'lucide-react';
import {
  PRODUCTS,
  HERO_IMAGE,
  Product,
  ProductCategory,
  PitchSurface,
} from './data/products';
import { ResilientImage } from './components/ResilientImage';
import {
  ProductDetailModal,
  CartItemConfig,
} from './components/ProductDetailModal';
import { CartDrawer, ConfirmedOrder } from './components/CartDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ThreeGearStage } from './components/ThreeGearStage';

gsap.registerPlugin(ScrollTrigger);

const HERO_HOTSPOTS = [
  {
    id: 'soleplate',
    title: '11-Ply Biaxial Carbon Chassis',
    metric: '91.4% Energy Return',
    detail:
      'Graduated forefoot stiffness snaps back within 0.04 seconds of toe-off while torsional midfoot channels allow natural metatarsal decoupling.',
  },
  {
    id: 'upper',
    title: '1.15 mm Hydrophobic Fly-Weave',
    metric: '0.2% Water Uptake',
    detail:
      'High-tenacity micro-filament yarn laminated with a 0.08 mm directional friction skin for consistent ball spin rate in wet floodlit conditions.',
  },
  {
    id: 'heel',
    title: 'Anatomical Calcaneus Lock',
    metric: 'Zero Internal Slip',
    detail:
      'Dual-density memory pods and reverse-grain microfiber suede lining secure the Achilles tendon during high-angle deceleration.',
  },
];

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll & sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Cart State
  const [cart, setCart] = useState<CartItemConfig[]>([
    {
      product: PRODUCTS[0], // Áo Đá Bóng Nam adidas Sân Nhà Manchester United Fc Authentic 26/27
      sizeEu: 'L',
      sizeDisplay: 'EU L',
      variantCode: PRODUCTS[0].variants[0].code,
      variantName: PRODUCTS[0].variants[0].name,
      customName: '',
      customNumber: '',
      unitPrice: PRODUCTS[0].price,
      quantity: 1,
    },
  ]);

  // Active 3D Category State ('kits' | 'balls' | 'boots' | 'gloves')
  const [active3DCategory, setActive3DCategory] = useState<ProductCategory>('kits');

  // Filter & Search State for Full Catalog Matrix
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>('all');
  const [selectedSurface, setSelectedSurface] = useState<'all' | PitchSurface>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'weight-asc'>('featured');

  // Interactive Hero Hotspot State
  const [activeHotspotId, setActiveHotspotId] = useState<string>('soleplate');

  // Modals & Drawers
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<ConfirmedOrder | null>(null);

  // Interactive Custom Studio State
  const [studioProductId, setStudioProductId] = useState<string>(PRODUCTS[0].id);
  const [studioName, setStudioName] = useState<string>('ROSSI');
  const [studioNumber, setStudioNumber] = useState<string>('10');
  const [studioSizeIdx, setStudioSizeIdx] = useState<number>(1);
  const [studioAdded, setStudioAdded] = useState<boolean>(false);

  const studioProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === studioProductId) || PRODUCTS[0],
    [studioProductId]
  );

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSurface =
        selectedSurface === 'all' ||
        p.surface === selectedSurface ||
        p.variants.some((v) => v.code === selectedSurface);
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);
      return matchesCategory && matchesSurface && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'weight-asc') return a.weightGrams - b.weightGrams;
      return 0;
    });
  }, [selectedCategory, selectedSurface, searchQuery, sortBy]);

  // Smooth Scroll via Lenis to a specific 3D Category Chapter
  const handleSelect3DCategory = useCallback(
    (cat: ProductCategory, shouldScroll: boolean = false) => {
      setActive3DCategory(cat);
      if (shouldScroll) {
        const targetSelector = `#chapter-${cat}`;
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetSelector, {
            offset: -96,
            duration: 1.05,
          });
        } else {
          const el = document.querySelector(targetSelector);
          el?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    []
  );

  const scrollToSection = (id: string, categoryFilter?: 'all' | ProductCategory) => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
    const targetSelector = `#${id}`;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetSelector, {
        offset: -88,
        duration: 1.05,
      });
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart Handlers
  const handleAddToCart = (newItem: CartItemConfig) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.sizeDisplay === newItem.sizeDisplay &&
          item.variantCode === newItem.variantCode &&
          item.customName === newItem.customName &&
          item.customNumber === newItem.customNumber
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + newItem.quantity,
        };
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleQuickAdd = (
    product: Product,
    e: React.MouseEvent,
    customSizeEu?: string
  ) => {
    e.stopPropagation();
    const defaultSize = product.sizes[Math.min(1, product.sizes.length - 1)];
    const chosenEu = customSizeEu || defaultSize.eu;
    handleAddToCart({
      product,
      sizeEu: chosenEu,
      sizeDisplay: `EU ${chosenEu}`,
      variantCode: product.variants[0].code,
      variantName: product.variants[0].name,
      customName: '',
      customNumber: '',
      unitPrice: product.price,
      quantity: 1,
    });
    setQuickAddedId(product.id);
    setTimeout(() => {
      setQuickAddedId((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item, idx) =>
          idx === index ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddStudioBuild = () => {
    const safeIdx = studioSizeIdx < studioProduct.sizes.length ? studioSizeIdx : 0;
    const sizeObj = studioProduct.sizes[safeIdx];
    const hasCustom =
      studioName.trim().length > 0 || studioNumber.trim().length > 0;
    const unitPrice =
      studioProduct.price + (hasCustom ? studioProduct.customizable.fee : 0);

    handleAddToCart({
      product: studioProduct,
      sizeEu: sizeObj.eu,
      sizeDisplay: `EU ${sizeObj.eu}`,
      variantCode: studioProduct.variants[0].code,
      variantName: studioProduct.variants[0].name,
      customName: studioName.trim().toUpperCase(),
      customNumber: studioProduct.customizable.allowNumber
        ? studioNumber.trim()
        : '',
      unitPrice,
      quantity: 1,
    });
    setStudioAdded(true);
    setTimeout(() => setStudioAdded(false), 1200);
  };

  const totalBagCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalBagAmount = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const activeHotspot =
    HERO_HOTSPOTS.find((h) => h.id === activeHotspotId) || HERO_HOTSPOTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-stone-900">
      {/* Mandatory 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 lg:px-12 py-4 bg-[#F9F8F6]/95 backdrop-blur-xs border-b border-stone-200">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('top');
          }}
          className="text-xl font-bold tracking-tight text-stone-900 font-display whitespace-nowrap shrink-0"
        >
          Stadio Atelier
        </a>

        {/* Zone 2: 5 concise single-line navigation links for the separated 3D sections */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          <button
            type="button"
            onClick={() => handleSelect3DCategory('kits', true)}
            className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Áo Đấu
          </button>
          <button
            type="button"
            onClick={() => handleSelect3DCategory('balls', true)}
            className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Bóng
          </button>
          <button
            type="button"
            onClick={() => handleSelect3DCategory('boots', true)}
            className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Giày
          </button>
          <button
            type="button"
            onClick={() => handleSelect3DCategory('gloves', true)}
            className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Găng
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('custom-studio')}
            className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Custom Lab
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 font-mono-tabular cursor-pointer"
          >
            Match Bag ({totalBagCount}) — ${totalBagAmount}
          </button>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* SECTION 1: Storefront Hero & Quantitative Proof Strip */}
        <section className="max-w-[1360px] mx-auto px-6 lg:px-12 pt-8 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Hero Left Column */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-stone-200 rounded-xl p-7 lg:p-10">
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>Montebelluna Bootroom</span>
                  <span aria-hidden="true">·</span>
                  <span>Three.js + GSAP + Lenis</span>
                  <span aria-hidden="true">·</span>
                  <span>Series XI</span>
                </div>

                <h1
                  className="text-stone-900 font-bold tracking-tight leading-[1.08]"
                  style={{
                    fontSize: 'clamp(2.25rem, 3.6vw, 3.5rem)',
                    textWrap: 'balance',
                  }}
                >
                  Biaxial Carbon Propulsion for the 90th Minute.
                </h1>

                <p className="text-base text-stone-600 leading-relaxed max-w-[60ch]">
                  Khám phá 4 phân khu kỹ thuật tách biệt — Áo Đấu Jacquard, Bóng Ép Nhiệt, Giày Đinh Carbon và Găng Thủ Môn German Latex — qua sân khấu không gian 3D tương tác thời gian thực.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-stone-200 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelect3DCategory('kits', true)}
                    className="px-5 py-3 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-sm font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Khám Phá 3D: Áo · Bóng · Giày · Găng</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="px-4 py-3 rounded-lg border border-stone-300 hover:border-stone-900 text-xs font-semibold text-stone-800 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Calibrate Boot Size</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>01. Áo Đấu</span>
                  <span aria-hidden="true">·</span>
                  <span>02. Bóng</span>
                  <span aria-hidden="true">·</span>
                  <span>03. Giày</span>
                  <span aria-hidden="true">·</span>
                  <span>04. Găng</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Floodlit Pitch Showcase & Interactive Engineering Callouts */}
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-stone-200 bg-stone-950 min-h-[420px] lg:min-h-[540px] flex flex-col justify-end">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Veloce Carbon XI Firm-Ground Football Boot on wet stadium pitch under floodlights"
                className="absolute inset-0 w-full h-full object-cover"
                fallbackTitle="Veloce Carbon XI Firm-Ground"
                fallbackSubtitle="11-Ply Biaxial Carbon Soleplate · 178g"
              />

              {/* Measured Scrim Overlay for WCAG AA Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

              {/* Interactive Technical Callout Bar on Hero Media */}
              <div className="relative z-10 p-6 md:p-8 text-white space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-1 p-1 bg-white/15 backdrop-blur-md rounded-lg">
                    {HERO_HOTSPOTS.map((spot) => (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => setActiveHotspotId(spot.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          activeHotspotId === spot.id
                            ? 'bg-white text-stone-950 font-semibold'
                            : 'text-stone-200 hover:text-white'
                        }`}
                      >
                        {spot.title.split(' ')[1]}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs font-mono-tabular text-stone-300">
                    {activeHotspot.metric}
                  </span>
                </div>

                <div className="max-w-xl">
                  <h2 className="text-base font-semibold text-white tracking-wide">
                    {activeHotspot.title}
                  </h2>
                  <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                    {activeHotspot.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Quantitative Proof Strip Below Hero Split */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 bg-white border border-stone-200 rounded-xl p-6">
            <div>
              <div className="text-2xl font-bold text-stone-900 font-mono-tabular">
                142 g
              </div>
              <div className="mt-1 text-xs text-stone-500">
                01. Áo Đấu Maestro 28-gauge jacquard knit siêu thoáng khí
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-stone-900 font-mono-tabular">
                0.0%
              </div>
              <div className="mt-1 text-xs text-stone-500">
                02. Bóng Architect Pro ép nhiệt cao tần chống thấm nước tuyệt đối
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-stone-900 font-mono-tabular">
                178 g
              </div>
              <div className="mt-1 text-xs text-stone-500">
                03. Giày Veloce Carbon XI với đế 11 lớp sợi carbon biaxial
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-stone-900 font-mono-tabular">
                4.0 mm
              </div>
              <div className="mt-1 text-xs text-stone-500">
                04. Găng Adaptive Grip mút German Contact Latex & xương trợ lực
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Separated 3D Three.js + GSAP + Lenis Chapters (Áo Đấu, Bóng, Giày, Găng) */}
        <ThreeGearStage
          activeCategory={active3DCategory}
          onSelectCategory={handleSelect3DCategory}
          onSelectProduct={(product) => setActiveProduct(product)}
          onQuickAdd={handleQuickAdd}
          quickAddedId={quickAddedId}
          customName={studioName}
          customNumber={studioNumber}
        />

        {/* SECTION 3: Full Filterable Catalog Matrix */}
        <section
          id="collection"
          className="max-w-[1360px] mx-auto px-6 lg:px-12 py-12 border-t border-stone-200"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>Full Specification Index</span>
                <span aria-hidden="true">·</span>
                <span>Filter by Category & Surface Traction</span>
              </div>
              <h2 className="mt-1 text-3xl font-bold text-stone-900 tracking-tight">
                Complete Equipment Matrix
              </h2>
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search áo đấu, bóng, giày, găng..."
                  aria-label="Search football gear"
                  className="pl-9 pr-4 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 w-56 sm:w-64"
                />
              </div>

              <div className="inline-flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <select
                  aria-label="Sort products"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as 'featured' | 'price-asc' | 'weight-asc'
                    )
                  }
                  className="text-xs font-medium text-stone-800 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="featured">Sort: Featured Spec</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="weight-asc">Mass: Lightest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Filter Bars (4 Separated Categories + Pitch Surface) */}
          <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/75 rounded-lg w-fit">
              {(
                [
                  { id: 'all', label: `Tất Cả (${PRODUCTS.length})` },
                  {
                    id: 'kits',
                    label: `01. Áo Đấu CLB (${PRODUCTS.filter((p) => p.category === 'kits').length})`,
                  },
                  {
                    id: 'balls',
                    label: `02. Quả Bóng Đá (${PRODUCTS.filter((p) => p.category === 'balls').length})`,
                  },
                  {
                    id: 'boots',
                    label: `03. Giày Đá Bóng (${PRODUCTS.filter((p) => p.category === 'boots').length})`,
                  },
                  {
                    id: 'gloves',
                    label: `04. Găng Thủ Môn (${PRODUCTS.filter((p) => p.category === 'gloves').length})`,
                  },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-stone-500 mr-1">
                Surface / Spec:
              </span>
              <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/75 rounded-lg">
                {(
                  [
                    { id: 'all', label: 'All Surfaces' },
                    { id: 'FG', label: 'FG Firm Grass' },
                    { id: 'SG-Pro', label: 'SG-Pro Wet Pitch' },
                    { id: 'AG', label: 'AG Artificial' },
                  ] as const
                ).map((surf) => (
                  <button
                    key={surf.id}
                    type="button"
                    onClick={() => setSelectedSurface(surf.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedSurface === surf.id
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {surf.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3-Column Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white border border-stone-200 rounded-xl mt-8">
              <p className="text-base font-semibold text-stone-900">
                No equipment matches your active filter combination.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSurface('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const isQuickAdded = quickAddedId === product.id;
                return (
                  <article
                    key={product.id}
                    onClick={() => setActiveProduct(product)}
                    className="group bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
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
                            title="Tham khảo trên Google Shopping"
                            className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-stone-900/85 hover:bg-stone-950 text-white text-[11px] font-medium inline-flex items-center gap-1 backdrop-blur-xs transition-colors"
                          >
                            <span>Shopping</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
                          <span className="uppercase tracking-wider font-medium">
                            {product.categoryLabel}
                          </span>
                          {product.statusTag && (
                            <span className="text-stone-600 font-medium">
                              {product.statusTag}
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex items-baseline justify-between gap-4">
                          <h3 className="text-base font-semibold text-stone-900 group-hover:text-rose-700 transition-colors">
                            {product.name}
                          </h3>
                          <span className="text-[15px] font-semibold text-stone-900 font-mono-tabular shrink-0">
                            ${product.price}.00
                          </span>
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-xs text-stone-500">
                          <span className="font-mono-tabular">
                            {product.weightGrams} g
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{product.surfaceLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">
                            {product.sizes[0].eu}–{product.sizes[product.sizes.length - 1].eu}
                          </span>
                        </div>

                        <p className="mt-3 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                          {product.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProduct(product);
                        }}
                        className="flex-1 py-2.5 px-3 rounded-lg border border-stone-200 hover:border-stone-900 text-xs font-semibold text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Configure & Size
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`py-2.5 px-3.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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
          )}
        </section>

        {/* SECTION 4: Custom Personalization Lab & Claim-to-Proof Club Testimonial */}
        <section
          id="custom-studio"
          className="max-w-[1360px] mx-auto px-6 lg:px-12 py-14 border-t border-stone-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-7 lg:p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>Custom Atelier Lab</span>
                  <span aria-hidden="true">·</span>
                  <span>Laser Heel ID & Official Squad Numbering</span>
                </div>
                <h2 className="mt-1 text-2xl lg:text-3xl font-bold text-stone-900 tracking-tight">
                  Configure Player-Issue Personalization
                </h2>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                  Every boot, jersey, ball, and goalkeeper glove can be customized at our Montebelluna bench before dispatch.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                      1. Select Equipment Base
                    </label>
                    <select
                      value={studioProductId}
                      onChange={(e) => {
                        setStudioProductId(e.target.value);
                        setStudioSizeIdx(0);
                      }}
                      className="w-full px-3.5 py-2.5 text-xs font-medium bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          [{p.categoryLabel.split('·')[0].trim()}] {p.name} (${p.price} + ${p.customizable.fee} Custom)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                      2. Select Size (EU / Match Scale)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {studioProduct.sizes.map((s, idx) => (
                        <button
                          key={s.eu}
                          type="button"
                          onClick={() => setStudioSizeIdx(idx)}
                          className={`px-2.5 py-2 text-xs font-mono-tabular rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            studioSizeIdx === idx
                              ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          {s.eu}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                      3. Player Back Name / Heel Laser ID (Max {studioProduct.customizable.maxNameLength})
                    </label>
                    <input
                      type="text"
                      maxLength={studioProduct.customizable.maxNameLength}
                      value={studioName}
                      onChange={(e) => setStudioName(e.target.value.toUpperCase())}
                      placeholder="ROSSI"
                      className="w-full px-3.5 py-2.5 text-xs font-mono-tabular uppercase bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  {studioProduct.customizable.allowNumber && (
                    <div>
                      <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                        4. Squad Number
                      </label>
                      <input
                        type="text"
                        maxLength={2}
                        value={studioNumber}
                        onChange={(e) =>
                          setStudioNumber(e.target.value.replace(/\D/g, ''))
                        }
                        placeholder="10"
                        className="w-full px-3.5 py-2.5 text-xs font-mono-tabular bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                    <ResilientImage
                      src={studioProduct.image}
                      alt={studioProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-stone-500">
                      Live Bench Preview · {studioProduct.customizable.label}
                    </div>
                    <div className="text-sm font-bold text-stone-900 font-mono-tabular mt-0.5">
                      {studioName || 'NO NAME'}{' '}
                      {studioProduct.customizable.allowNumber && studioNumber
                        ? `#${studioNumber}`
                        : ''}{' '}
                      · Size {studioProduct.sizes[studioSizeIdx]?.eu || studioProduct.sizes[0].eu}
                    </div>
                    <div className="text-xs text-stone-500 font-mono-tabular mt-0.5">
                      Total Configured Price: $
                      {studioProduct.price +
                        (studioName.trim() || studioNumber.trim()
                          ? studioProduct.customizable.fee
                          : 0)}
                      .00
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleSelect3DCategory(studioProduct.category, true)
                    }
                    className="px-4 py-3 rounded-lg border border-stone-300 hover:border-stone-900 text-xs font-semibold text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Xem Trên Sân Khấu 3D
                  </button>
                  <button
                    type="button"
                    onClick={handleAddStudioBuild}
                    className="px-5 py-3 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {studioAdded
                      ? 'Added Custom Spec to Bag'
                      : 'Add Custom Spec to Bag'}
                  </button>
                </div>
              </div>
            </div>

            <div
              id="craftsmanship"
              className="lg:col-span-5 bg-[#F2F0EC] border border-stone-200 rounded-xl p-7 lg:p-9 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>Field Validation</span>
                  <span aria-hidden="true">·</span>
                  <span>Montebelluna Lasting Standard</span>
                </div>

                <h3 className="text-2xl font-bold text-stone-900 tracking-tight">
                  72-Hour Lasting & Thermal Seam Fusion
                </h3>

                <p className="text-sm text-stone-700 leading-relaxed">
                  Conventional mass-market football boots spend less than 40 minutes on a heated factory last, causing upper relaxation and heel slippage after three wet matches. Every Stadio Atelier boot remains on its anatomical last for 72 hours under controlled humidity.
                </p>

                <div className="pt-4 border-t border-stone-300/80 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-stone-500">Stitch Tolerance</div>
                    <div className="mt-0.5 text-sm font-bold text-stone-900 font-mono-tabular">
                      ±0.12 mm
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500">Carbon Cycle Fatigue</div>
                    <div className="mt-0.5 text-sm font-bold text-stone-900 font-mono-tabular">
                      250,000 Flexions
                    </div>
                  </div>
                </div>
              </div>

              <blockquote className="mt-8 pt-6 border-t border-stone-300/80">
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  “Before switching our first-team squad to the Veloce Carbon XI and Aurora 1928 K-Leather lasts, we replaced torn synthetic uppers every six weeks and logged frequent metatarsal hot-spots on artificial turf. Across 38 competitive fixtures this season, boot replacements dropped by 64% and soft-tissue forefoot blistering fell by 42%.”
                </p>
                <footer className="mt-3 text-xs">
                  <div className="font-semibold text-stone-900">
                    Lorenzo Bellini
                  </div>
                  <div className="text-stone-500">
                    First-Team Kit & Footwear Director · A.C. Trevigiani (Serie C)
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="bg-white border-t border-stone-200 mt-12">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-base font-bold text-stone-900 font-display">
              Stadio Atelier S.r.l.
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Via Monte Grappa 42, 31044 Montebelluna (TV), Italy · Technical Football Footwear & Match Equipment
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-stone-600">
            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(true)}
              className="hover:text-stone-900 underline underline-offset-4 cursor-pointer"
            >
              Sizing Calibration Chart
            </button>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="hover:text-stone-900 underline underline-offset-4 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>
                {lastOrder
                  ? `Order #${lastOrder.orderNumber} Confirmed`
                  : 'Courier Dispatch & COD Terms'}
              </span>
            </button>
            <span className="text-stone-400">
              © {new Date().getFullYear()} Stadio Atelier
            </span>
          </div>
        </div>
      </footer>

      {/* Contiguous Purchase Module (PDP Modal) */}
      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Slide-Over Match Bag & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
        lastOrder={lastOrder}
        onSaveOrder={(order) => setLastOrder(order)}
      />

      {/* Interactive Sizing Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
