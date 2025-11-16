import ArticlesBody from "@/app/_components/_dashboard/_articles/ArticlesBody";
import FetchData from "@/app/_helpers/FetchData";

export default async function ArticlesDashPage() {
  const response = await FetchData(`/articles`, true);
  const categories = await FetchData(`/articles-categories/all-arabic`, false);

  if (!response) return null;

  const { data, pagination } = response;

  return (
    <div className="w-full pb-20 ">
      <ArticlesBody
        categories={categories}
        data={data}
        pagination={pagination}
        api="/articles"
      />
    </div>
  );
}
