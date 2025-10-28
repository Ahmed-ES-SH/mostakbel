"use client";
import { localeType } from "@/app/_types/_website/Global";
import { directionMap } from "@/app/constants/_website/Global";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavDiv({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = "en";
  if (pathname.includes("/dashboard")) {
    return null;
  }

  return (
    <div
      dir={directionMap[locale]}
      className="z-99 relative w-full bg-white min-h-[75px]"
    >
      {children}
    </div>
  );
}
