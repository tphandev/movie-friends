import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";
import clsx from "clsx";
import { CardProps } from "./Card";

export default function SearchCard({
  title,
  imageSrc,
  subTitle,
  className,
}: Omit<CardProps, "href">) {
  return (
    <div className={clsx("group flex gap-4", className)}>
      <div className="relative w-16 h-20 overflow-hidden">
        <ImageWithFallback
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center "
          sizes="(max-width: 768px) 20vw, 10vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
        />
        <div className="opacity-0 group-hover:opacity-30 absolute w-full h-full bg-black transition-opacity" />
      </div>
      <div className="flex-1">
        <p className="text-gray-900 lg:text-md font-bold mt-3 group-hover:text-red-500 transition-colors ">
          {title}
        </p>
        {subTitle && (
          <p className="font-bold lg:text-sm text-gray-400 ">{subTitle}</p>
        )}
      </div>
    </div>
  );
}
