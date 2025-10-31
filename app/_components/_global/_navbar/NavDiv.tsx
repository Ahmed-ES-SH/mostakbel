"use client";
import { useLocale } from "@/app/_hooks/useLocale";
import { localeType } from "@/app/_types/_website/Global";
import { directionMap } from "@/app/constants/_website/Global";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavDiv({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  if (pathname.includes("/dashboard")) {
    return null;
  }

  return (
    <div
      dir={directionMap[locale]}
      className="z-9999 h-16 lg:h-[120px] max-md:shadow max-md:border-b max-md:border-gray-300 w-full fixed  top-0 left-0"
    >
      {children}
    </div>
  );
}
