import NewsPageComponent from "@/app/_components/_website/_news/NewsPageComponent";
import FetchData from "@/app/_helpers/FetchData";
import { getServerTranslation } from "@/app/_helpers/serverTranslation";
import { getSharedMetadata } from "@/app/_helpers/SharedMetadata";
import React from "react";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = await getServerTranslation(locale, "newsMeta");
  const sharedMetadata = await getSharedMetadata(t.title, t.description);
  return {
    title: `${t.title}`,
    description: `${t.description}`,
    ...sharedMetadata,
  };
}

export default async function NewsPage() {
  const categories = await FetchData(`/news-categories/all`, false);
  const news = await FetchData(`/public-news`, true);
  const latestNews = await FetchData(`/last-news`, false);

  if (news?.error) return null;

  const { data, pagination } = await news;

  return (
    <NewsPageComponent
      latestNews={latestNews}
      categories={categories}
      newsData={data}
      pagination={pagination}
    />
  );
}
