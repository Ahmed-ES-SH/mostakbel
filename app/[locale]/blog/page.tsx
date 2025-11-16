import BlogPageComponent from "@/app/_components/_website/_blog/BlogPageComponent";
import FetchData from "@/app/_helpers/FetchData";
import { getServerTranslation } from "@/app/_helpers/serverTranslation";
import { getSharedMetadata } from "@/app/_helpers/SharedMetadata";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = await getServerTranslation(locale, "blogMeta");
  const sharedMetadata = await getSharedMetadata(t.title, t.description);
  return {
    title: `${t.title}`,
    description: `${t.description}`,
    ...sharedMetadata,
  };
}

export default async function BlogPage() {
  const articles = await FetchData(`/public-articles`, true);
  const categories = await FetchData(`/articles-categories/all`, false);
  const tags = await FetchData(`/article-tags`, false);

  if (articles?.error) return null;

  const { data, pagination } = articles;

  return (
    <BlogPageComponent
      categories={categories}
      articles={data}
      pagination={pagination}
      tags={tags}
    />
  );
}
