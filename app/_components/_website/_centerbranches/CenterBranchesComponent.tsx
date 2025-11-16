"use client";
import React from "react";
import HeroBanner from "../../_global/_heroBanner/HeroBanner";
import { directionMap } from "@/app/constants/_website/Global";
import { useLocale } from "@/app/_hooks/useLocale";

import { useTranslation } from "@/app/_hooks/useTranslation";
import CenterBranch from "./CenterBranch";

export default function CenterBranchesComponent() {
  const locale = useLocale();

  return (
    <div
      dir={directionMap[locale]}
      className="min-h-screen flex flex-col gap-12"
    >
      {/* Header */}
      <HeroBanner imageSrc="/website/slide2.jpg" />

      {/* Main Content */}
      <CenterBranch />
      <CenterBranch />
      <CenterBranch />
      <CenterBranch />
    </div>
  );
}
