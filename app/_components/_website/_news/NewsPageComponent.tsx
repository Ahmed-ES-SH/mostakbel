"use client";

import { directionMap } from "@/app/constants/_website/Global";
import { useLocale } from "@/app/_hooks/useLocale";
import HeroBanner from "../../_global/_heroBanner/HeroBanner";
import NewsSlider from "./NewsSlider";
import NewsCategoriesSection from "./NewsCategoriesSection";
import NewsList from "./NewsList";
import { Category } from "../../_dashboard/_ProjectPage/type";

interface props {
  categories: Category[];
  newsData: News[];
  latestNews: News[];
  pagination: {
    current_page: number;
    last_page: number;
  };
}

export default function NewsPageComponent({
  categories,
  newsData,
  latestNews,
  pagination,
}: props) {
  const locale = useLocale();

  return (
    <main className="min-h-screen mt-20 bg-gray-50" dir={directionMap[locale]}>
      {/* Banner */}
      <HeroBanner imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop" />

      <NewsSlider data={latestNews} />

      <NewsCategoriesSection categories={categories} />

      <NewsList data={newsData} pagination={pagination} />
    </main>
  );
}
