import { ArticleNotFound } from "@/app/_components/_website/_blogPage/ArticleNotFound";
import ArticlePageComponent from "@/app/_components/_website/_blogPage/BlogPageContent";
import FetchData from "@/app/_helpers/FetchData";
import { getServerTranslation } from "@/app/_helpers/serverTranslation";
import { getSharedMetadata } from "@/app/_helpers/SharedMetadata";

export async function generateMetadata({ params, searchParams }: any) {
  const { locale } = await params;
  const { articleId } = await searchParams;
  const article = await FetchData(`/get-article/${articleId}`, false);
  const t = await getServerTranslation(locale, "articleMeta");
  const sharedMetadata = await getSharedMetadata(
    `${t.title} - ${article.title ?? "Article Title"}`,
    `${t.description} - ${article.excerpt ?? "Article content"}`
  );
  return {
    title: `${t.title} - ${article.title ?? "Article Title"}`,
    description: `${t.description} - ${article.excerpt ?? "Article content"}`,
    ...sharedMetadata,
  };
}

export default async function ArticlePage({ searchParams }: any) {
  const { articleId } = await searchParams;

  const article = await FetchData(`/get-article/${articleId}`, false);
  const categories = await FetchData(`/articles-categories/all`, false);
  const tags = await FetchData(`/article-tags`, false);
  const relatedArticles = await FetchData(`/public-articles?limit=3`, false);

  if (article.error || !article) return <ArticleNotFound />;

  return (
    <ArticlePageComponent
      article={article}
      categories={categories}
      tags={tags}
      relatedArticles={relatedArticles}
    />
  );
}
