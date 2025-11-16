import ArticleDetail from "@/app/_components/_website/_newsPage/ArticleDetail";
import { mockComments } from "@/app/_components/_website/_newsPage/mockData";
import FetchData from "@/app/_helpers/FetchData";
import { getServerTranslation } from "@/app/_helpers/serverTranslation";
import { getSharedMetadata } from "@/app/_helpers/SharedMetadata";

export async function generateMetadata({ params, searchParams }: any) {
  const { locale } = await params;
  const { newsId } = await searchParams;
  const news = await FetchData(`/get-news/${newsId}`, false);
  const t = await getServerTranslation(locale, "newMeta");
  const sharedMetadata = await getSharedMetadata(
    `${t.title} - ${news.title ?? "Article Title"}`,
    `${t.description} - ${news.excerpt ?? "Article content"}`
  );
  return {
    title: `${t.title} - ${news.title ?? "Article Title"}`,
    description: `${t.description} - ${news.excerpt ?? "Article content"}`,
    ...sharedMetadata,
  };
}

export default async function ArticlePage({ searchParams }: any) {
  const { newsId } = await searchParams;
  const newsArticle = await FetchData(`/get-news/${newsId}`, false);
  const categories = await FetchData(`/news-categories/all`, false);
  const tags = await FetchData(`/article-tags`, false);

  return (
    <ArticleDetail
      article={newsArticle}
      categories={categories}
      tags={tags}
      comments={mockComments}
    />
  );
}
