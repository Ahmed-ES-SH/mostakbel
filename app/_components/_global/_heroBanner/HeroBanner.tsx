"use client";
import Img from "../Img";
import { usePathname } from "next/navigation";
import LocaleLink from "../LocaleLink";

interface Props {
  imageSrc: string;
}

export default function HeroBanner({ imageSrc }: Props) {
  const pathname = usePathname();

  // Split pathname into segments and remove empty ones
  const segments = pathname.split("/").filter((segment) => segment !== "");

  // Remove language prefix (en/ar) if exists
  const cleanSegments =
    segments[0] === "en" || segments[0] === "ar" ? segments.slice(1) : segments;

  return (
    <div className="w-full lg:mt-20 min-h-[75vh] flex flex-col items-center justify-center relative text-white">
      {/* main image */}
      <Img
        src={imageSrc}
        className="w-full h-full absolute top-0 left-0 object-cover z-0"
      />

      {/* overlay */}
      <div className="w-full h-full bg-primary-color/40 top-0 left-0 absolute z-10" />

      {/* breadcrumb */}
      <div className="relative z-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 capitalize">
          {cleanSegments[cleanSegments.length - 1]?.replace(/-/g, " ") ||
            "Home"}
        </h1>

        <nav className="flex items-center justify-center gap-2 text-sm md:text-base">
          <LocaleLink
            href="/"
            className="hover:underline hover:text-gray-200 transition"
          >
            Home
          </LocaleLink>

          {cleanSegments.map((segment, index) => {
            // Build the path dynamically without language prefix
            const path = "/" + cleanSegments.slice(0, index + 1).join("/");

            return (
              <div key={index} className="flex items-center gap-2">
                <span>/</span>
                {index === cleanSegments.length - 1 ? (
                  <span className="text-gray-200 capitalize">
                    {segment.replace(/-/g, " ")}
                  </span>
                ) : (
                  <LocaleLink
                    href={path}
                    className="hover:underline hover:text-gray-200 capitalize transition"
                  >
                    {segment.replace(/-/g, " ")}
                  </LocaleLink>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
