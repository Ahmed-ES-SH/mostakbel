import EditArticlePage from "@/app/_components/_dashboard/_articlePage/EditArticlePage";
import NotFoundItem from "@/app/_components/_dashboard/NotFoundItem";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function ArticleDashPage({ params }: any) {
  const { articleId } = await params;

  if (!articleId) return <NotFoundItem />;

  const article = await FetchData(`/get-article/${articleId}`, false);
  const categories = await FetchData(`/articles-categories/all-arabic`, false);

  if (!article) return <NotFoundItem />;

  return <EditArticlePage article={article} categories={categories} />;
}
