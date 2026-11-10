import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BOOT_SIZE_CHART = [
  { cm: 25.0, eu: '40', uk: '6.5', us: '7.5', forefootMm: '94 mm' },
  { cm: 26.0, eu: '41', uk: '7.5', us: '8.5', forefootMm: '97 mm' },
  { cm: 26.5, eu: '42', uk: '8.0', us: '9.0', forefootMm: '99 mm' },
  { cm: 27.0, eu: '42.5', uk: '8.5', us: '9.5', forefootMm: '101 mm' },
  { cm: 27.5, eu: '43', uk: '9.0', us: '10.0', forefootMm: '103 mm' },
  { cm: 28.0, eu: '44', uk: '9.5', us: '10.5', forefootMm: '105 mm' },
  { cm: 29.0, eu: '45', uk: '10.5', us: '11.5', forefootMm: '108 mm' },
];

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [footLengthCm, setFootLengthCm] = useState<number>(26.5);
  const [sockPreference, setSockPreference] = useState<'thin' | 'grip'>('grip');

  if (!isOpen) return null;

  const adjustedCm = sockPreference === 'grip' ? footLengthCm + 0.3 : footLengthCm;
  const recommendedRow =
    BOOT_SIZE_CHART.find((r) => r.cm >= adjustedCm) ||
    BOOT_SIZE_CHART[BOOT_SIZE_CHART.length - 1];

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
    >
      <div className="w-full max-w-2xl bg-white border border-stone-200 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div>
            <h2 id="size-guide-title" className="text-lg font-bold text-stone-900">
              Montebelluna Last & Sizing Calibration
            </h2>
            <p className="text-xs text-stone-500">
              Measured heel-to-longest-toe wearing match socks
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-lg"
            aria-label="Close sizing chart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Interactive Foot Length Calculator */}
          <div className="p-5 rounded-lg bg-[#F4F3EF] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-900">
                  Your Barefoot Length: <span className="font-mono-tabular">{footLengthCm.toFixed(1)} cm</span>
                </label>
                <input
                  type="range"
                  min={24.5}
                  max={29.0}
                  step={0.5}
                  value={footLengthCm}
                  onChange={(e) => setFootLengthCm(parseFloat(e.target.value))}
                  className="mt-2 w-full sm:w-56 accent-rose-700"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-stone-900 mb-1.5">
                  Match Sock Thickness
                </span>
                <div className="inline-flex p-0.5 bg-stone-200 rounded-md">
                  <button
                    type="button"
                    onClick={() => setSockPreference('thin')}
                    className={`px-3 py-1 text-xs font-medium rounded-xs whitespace-nowrap shrink-0 ${
                      sockPreference === 'thin'
                        ? 'bg-white text-stone-900 shadow-2xs'
                        : 'text-stone-600'
                    }`}
                  >
                    Ultra-Thin Sleeve
                  </button>
                  <button
                    type="button"
                    onClick={() => setSockPreference('grip')}
                    className={`px-3 py-1 text-xs font-medium rounded-xs whitespace-nowrap shrink-0 ${
                      sockPreference === 'grip'
                        ? 'bg-white text-stone-900 shadow-2xs'
                        : 'text-stone-600'
                    }`}
                  >
                    cushioned Grip Sock
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-300 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-stone-600">
                Recommended Match Fit:
              </span>
              <span className="font-mono-tabular font-bold text-stone-900">
                EU {recommendedRow.eu} · UK {recommendedRow.uk} · US {recommendedRow.us} ({recommendedRow.cm} cm Last)
              </span>
            </div>
          </div>

          {/* Tabular Size Conversion Table */}
          <div>
            <h3 className="text-xs font-semibold text-stone-800 mb-2.5">
              Footwear Last Specifications
            </h3>
            <div className="border border-stone-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-100 border-b border-stone-200 text-stone-600">
                    <th className="py-2.5 px-4 font-semibold">Foot Length (CM)</th>
                    <th className="py-2.5 px-4 font-semibold">EU</th>
                    <th className="py-2.5 px-4 font-semibold">UK</th>
                    <th className="py-2.5 px-4 font-semibold">US</th>
                    <th className="py-2.5 px-4 font-semibold">Forefoot Width</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-mono-tabular">
                  {BOOT_SIZE_CHART.map((row) => {
                    const isRecommended = row.eu === recommendedRow.eu;
                    return (
                      <tr
                        key={row.eu}
                        className={isRecommended ? 'bg-rose-50/70 font-semibold text-stone-900' : 'text-stone-700'}
                      >
                        <td className="py-2.5 px-4">{row.cm.toFixed(1)} cm</td>
                        <td className="py-2.5 px-4">{row.eu}</td>
                        <td className="py-2.5 px-4">{row.uk}</td>
                        <td className="py-2.5 px-4">{row.us}</td>
                        <td className="py-2.5 px-4">{row.forefootMm}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
