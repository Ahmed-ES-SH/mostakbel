import BlogPageComponent from "@/app/_components/_website/_blog/BlogPageComponent";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function ArticlesByCatgoryPage({
  params,
  searchParams,
}: any) {
  const { categoryTitle } = await params;
  const { articleCategoryId } = await searchParams;

  const articles = await FetchData(
    `/public-articles?categories=${articleCategoryId}`,
    true
  );
  const categories = await FetchData(`/articles-categories/all`, false);
  const tags = await FetchData(`/article-tags`, false);

  const { data, pagination } = articles;
  return (
    <BlogPageComponent
      categories={categories}
      articles={data}
      pagination={pagination}
      tags={tags}
      categoryTitle={categoryTitle ?? ""}
    />
  );
}
