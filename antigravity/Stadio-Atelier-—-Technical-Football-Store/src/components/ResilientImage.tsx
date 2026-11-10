import React, { useState } from 'react';
import { Shield } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Stadio Atelier Technical Piece',
  fallbackSubtitle = 'Montebelluna Pitch Engineering',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200 text-stone-700 p-6 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <Shield className="w-8 h-8 text-stone-500 mb-2 stroke-[1.5]" />
        <span className="text-sm font-medium text-stone-800">{fallbackTitle}</span>
        <span className="text-xs text-stone-500 mt-0.5">{fallbackSubtitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
