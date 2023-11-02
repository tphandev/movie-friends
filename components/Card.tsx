import Image from "next/image";
import tmdbLogo from "@/public/tmdb.svg";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";
import { Url } from "next/dist/shared/lib/router/router";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type CardProps = {
  href: Url;
  imageSrc: string | StaticImport;
  title: string;
  subTitle?: string;
  tmdbVote?: number;
};
export default function Card({
  title,
  href,
  imageSrc,
  subTitle,
  tmdbVote,
}: CardProps) {
  return (
    <Link href={href} className="group">
      <div className="relative w-full h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden">
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
      <div>
        <p className="text-gray-900  lg:text-lg font-bold mt-3 group-hover:text-red-500 transition-colors ">
          {title}
        </p>
        {!!tmdbVote && (
          <div className="flex justify-start gap-2 items-center cursor-pointer mt-2 mb-1">
            <Image
              className="relative"
              src={tmdbLogo}
              alt="TMDB Logo"
              width={100}
              height={17}
            />
            <p className="font-bold text-md ">{tmdbVote}</p>
          </div>
        )}
        {subTitle && <p className="font-bold text-gray-400 ">{subTitle}</p>}
      </div>
    </Link>
  );
}
