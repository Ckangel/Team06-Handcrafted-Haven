"use client";

import { useState } from "react";

const FALLBACK_IMAGE = "https://placehold.co/500x500/e2e8f0/64748b?text=No+Image";

interface ProductImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fill?: boolean;
}

export default function ProductImage({ src, alt, className = "", fill = false }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  if (fill) {
    return (
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
    />
  );
}
