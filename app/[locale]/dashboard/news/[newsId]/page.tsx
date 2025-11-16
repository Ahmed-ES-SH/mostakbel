import EditArticlePage from "@/app/_components/_dashboard/_articlePage/EditArticlePage";
import NewsEditForm from "@/app/_components/_dashboard/_newsPage/NewsEditForm";
import NotFoundItem from "@/app/_components/_dashboard/NotFoundItem";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function ArticleDashPage({ params }: any) {
  const { newsId } = await params;

  if (!newsId) return <NotFoundItem />;

  const article = await FetchData(`/get-news/${newsId}`, false);
  const categories = await FetchData(`/news-categories/all-arabic`, false);

  if (!article) return <NotFoundItem />;

  return <NewsEditForm newsData={article} categories={categories} />;
}
