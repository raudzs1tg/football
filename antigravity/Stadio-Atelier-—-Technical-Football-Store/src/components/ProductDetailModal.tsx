import React, { useState } from 'react';
import { X, Check, Ruler } from 'lucide-react';
import { Product, PitchSurface } from '../data/products';
import { ResilientImage } from './ResilientImage';

export interface CartItemConfig {
  product: Product;
  sizeEu: string;
  sizeDisplay: string;
  variantCode: PitchSurface;
  variantName: string;
  customName: string;
  customNumber: string;
  unitPrice: number;
  quantity: number;
}

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItemConfig) => void;
  onOpenSizeGuide: () => void;
}

type SizeSystem = 'eu' | 'uk' | 'us' | 'cm';

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [sizeSystem, setSizeSystem] = useState<SizeSystem>('eu');
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(2); // Default middle size
  const [selectedVariantCode, setSelectedVariantCode] = useState<PitchSurface>(
    product.variants[0].code
  );
  const [enableCustom, setEnableCustom] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>('');
  const [customNumber, setCustomNumber] = useState<string>('');
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  const safeSizeIndex =
    selectedSizeIndex < product.sizes.length ? selectedSizeIndex : 0;
  const activeSizeObj = product.sizes[safeSizeIndex];
  const activeVariant =
    product.variants.find((v) => v.code === selectedVariantCode) ||
    product.variants[0];

  const hasCustomText =
    enableCustom && (customName.trim().length > 0 || customNumber.trim().length > 0);
  const finalUnitPrice =
    product.price + (hasCustomText ? product.customizable.fee : 0);

  const formatSizeLabel = (s: typeof activeSizeObj) => {
    if (sizeSystem === 'eu') return `${s.eu}`;
    if (sizeSystem === 'uk') return `UK ${s.uk}`;
    if (sizeSystem === 'us') return `US ${s.us}`;
    return `${s.cm} cm`;
  };

  const handleAdd = () => {
    onAddToCart({
      product,
      sizeEu: activeSizeObj.eu,
      sizeDisplay: `${ sizeSystem.toUpperCase() } ${activeSizeObj[sizeSystem]}`,
      variantCode: activeVariant.code,
      variantName: activeVariant.name,
      customName: enableCustom ? customName.trim().toUpperCase() : '',
      customNumber: enableCustom ? customNumber.trim() : '',
      unitPrice: finalUnitPrice,
      quantity: 1,
    });
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
      onClose();
    }, 650);
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 backdrop-blur-xs p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
    >
      <div className="relative w-full max-w-5xl bg-[#F9F8F6] border border-stone-200 rounded-xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white shrink-0">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{product.sku}</span>
            <span aria-hidden="true">·</span>
            <span>{product.surfaceLabel}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-rose-700"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contiguous 2-Column Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          {/* Left Column: Sticky Gallery & Technical Breakdown */}
          <div className="lg:col-span-7 p-6 md:p-8 bg-[#F2F0EC] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200">
            <div>
              <div className="aspect-4/3 w-full rounded-lg overflow-hidden bg-stone-200">
                <ResilientImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  fallbackTitle={product.name}
                  fallbackSubtitle={product.subtitle}
                />
              </div>

              <div className="mt-6">
                <p className="text-sm text-stone-700 leading-relaxed">
                  {product.description}
                </p>
                <p className="mt-3 text-xs text-stone-500 leading-relaxed">
                  {product.craftsmanshipNote}
                </p>
              </div>
            </div>

            {/* Technical Spec Grid */}
            <div className="mt-8 pt-6 border-t border-stone-300/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {product.specs.map((spec) => (
                <div key={spec.label}>
                  <div className="text-xs text-stone-500">{spec.label}</div>
                  <div className="mt-1 text-sm font-semibold text-stone-900 font-mono-tabular">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 p-6 md:p-8 bg-white flex flex-col justify-between">
            <div className="space-y-6">
              {/* Title, Price & Availability */}
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
                  <span>{product.categoryLabel}</span>
                  <span>In Stock · Ready for Dispatch</span>
                </div>
                <h2
                  id="pdp-title"
                  className="mt-1 text-2xl font-bold text-stone-900 tracking-tight"
                >
                  {product.name}
                </h2>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-xl font-semibold text-stone-900 font-mono-tabular">
                    ${finalUnitPrice}.00
                  </span>
                  {hasCustomText && (
                    <span className="text-xs text-stone-500 font-mono-tabular">
                      (Includes +${product.customizable.fee} Atelier Customization)
                    </span>
                  )}
                </div>
              </div>

              {/* Variant / Stud Configuration Selector */}
              <div className="pt-4 border-t border-stone-200">
                <label className="block text-xs font-semibold text-stone-800">
                  Pitch & Cut Configuration
                </label>
                <div className="mt-2 space-y-2">
                  {product.variants.map((variant) => {
                    const isSelected = variant.code === activeVariant.code;
                    return (
                      <button
                        key={variant.code}
                        type="button"
                        onClick={() => setSelectedVariantCode(variant.code)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          isSelected
                            ? 'border-stone-900 bg-stone-50'
                            : 'border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-stone-900">
                            {variant.name}
                          </span>
                          <span className="text-xs font-mono-tabular text-stone-500">
                            {variant.code}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-stone-500">
                          {variant.studInfo}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector with EU/UK/US/CM Switcher */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-stone-800">
                      Select Size
                    </span>
                    <button
                      type="button"
                      onClick={onOpenSizeGuide}
                      className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4 whitespace-nowrap shrink-0"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Sizing Chart</span>
                    </button>
                  </div>

                  {/* Interactive Size Unit Control */}
                  <div className="flex items-center gap-0.5 p-0.5 bg-stone-100 rounded-md">
                    {(['eu', 'uk', 'us', 'cm'] as SizeSystem[]).map((sys) => (
                      <button
                        key={sys}
                        type="button"
                        onClick={() => setSizeSystem(sys)}
                        className={`px-2 py-1 text-[11px] font-medium rounded-xs transition-colors whitespace-nowrap shrink-0 ${
                          sizeSystem === sys
                            ? 'bg-white text-stone-900 shadow-2xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {sys.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-4 gap-2">
                  {product.sizes.map((s, idx) => {
                    const isSelected = idx === safeSizeIndex;
                    return (
                      <button
                        key={s.eu}
                        type="button"
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`py-2.5 px-2 text-xs font-mono-tabular rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                            : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {formatSizeLabel(s)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Atelier Embroidery / Laser Personalization */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableCustom}
                      onChange={(e) => setEnableCustom(e.target.checked)}
                      className="w-4 h-4 accent-rose-700 rounded-xs"
                    />
                    <span className="text-xs font-semibold text-stone-800">
                      {product.customizable.label}
                    </span>
                  </label>
                  <span className="text-xs font-mono-tabular text-stone-500">
                    +${product.customizable.fee}
                  </span>
                </div>

                {enableCustom && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {product.customizable.allowName && (
                      <div className="col-span-2">
                        <label className="block text-[11px] text-stone-500 mb-1">
                          Name / ID (Max {product.customizable.maxNameLength})
                        </label>
                        <input
                          type="text"
                          maxLength={product.customizable.maxNameLength}
                          value={customName}
                          onChange={(e) => setCustomName(e.target.value)}
                          placeholder="e.g. VALENCIA"
                          className="w-full px-3 py-2 text-xs font-mono-tabular uppercase bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
                        />
                      </div>
                    )}
                    {product.customizable.allowNumber && (
                      <div className="col-span-1">
                        <label className="block text-[11px] text-stone-500 mb-1">
                          Squad #
                        </label>
                        <input
                          type="text"
                          maxLength={2}
                          value={customNumber}
                          onChange={(e) =>
                            setCustomNumber(e.target.value.replace(/\D/g, ''))
                          }
                          placeholder="10"
                          className="w-full px-3 py-2 text-xs font-mono-tabular bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Primary Buy CTA */}
            <div className="mt-8 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-3.5 px-6 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Match Bag</span>
                  </>
                ) : (
                  <span>
                    Add to Match Bag — ${finalUnitPrice}.00
                  </span>
                )}
              </button>
              <p className="mt-2.5 text-center text-xs text-stone-500">
                Complimentary 48-hour courier delivery on orders over $250 · 30-day pitch trial
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
