import CreateArticlePage from "@/app/_components/_dashboard/_articlePage/CreateArticlePage";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function AddArticlePage() {
  const categories = await FetchData(`/articles-categories/all-arabic`, false);
  return <CreateArticlePage categories={categories} />;
}
