"use client";

import { useState } from "react";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { directionMap } from "@/app/constants/_website/Global";
import { useLocale } from "@/app/_hooks/useLocale";
import HeroBanner from "../../_global/_heroBanner/HeroBanner";
import NewsSlider from "./NewsSlider";
import NewsCategoriesSection from "./NewsCategoriesSection";
import NewsList from "./NewsList";

export default function NewsPageComponent() {
  const locale = useLocale();
  const t = useTranslation("newsPage");

  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <main className="min-h-screen mt-20 bg-gray-50" dir={directionMap[locale]}>
      {/* Banner */}
      <HeroBanner imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop" />

      <NewsSlider />

      <NewsCategoriesSection />

      <NewsList />
    </main>
  );
}
