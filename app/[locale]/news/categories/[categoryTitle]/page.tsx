import HeroBanner from "@/app/_components/_global/_heroBanner/HeroBanner";
import CategoryHeader from "@/app/_components/_website/_news/CategoryHeader";
import NewsList from "@/app/_components/_website/_news/NewsList";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function NewsByCategory({ params, searchParams }: any) {
  const { categoryTitle } = await params;
  const { newsCategoryId } = await searchParams;

  const news = await FetchData(
    `/public-news?categories=${newsCategoryId}`,
    true
  );

  const { data, pagination } = await news;

  return (
    <main className="w-full min-h-screen">
      {/* Banner */}
      <HeroBanner imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop" />

      <div className="c-container mt-4">
        {/* Category Header */}
        <CategoryHeader targetPage="news" categoryTitle={categoryTitle ?? ""} />
      </div>

      <NewsList data={data} pagination={pagination} />
    </main>
  );
}
