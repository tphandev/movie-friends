"use client";
import { ReactEventHandler, useState } from "react";
import Image, { ImageProps } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import poster from "@/public/poster.svg";

export default function ImageWithFallback({
  fallback = poster,
  alt,
  src,
  onError,
  ...props
}: ImageProps & { fallback?: string | StaticImport }) {
  const [error, setError] = useState(false);

  const handleError: ReactEventHandler<HTMLImageElement> = (e) => {
    onError?.(e);
    setError(true);
  };

  return (
    <Image
      alt={alt}
      onError={handleError}
      src={error ? fallback : src}
      {...props}
    />
  );
}
