import NewsBody from "@/app/_components/_dashboard/_news/NewsBody";
import FetchData from "@/app/_helpers/FetchData";

export default async function ArticlesDashPage() {
  const response = await FetchData(`/news`, true);
  const categories = await FetchData(`/news-categories/all-arabic`, false);

  if (!response) return null;

  const { data, pagination } = response;

  return (
    <div className="w-full pb-20 ">
      <NewsBody
        categories={categories}
        data={data}
        pagination={pagination}
        api="/news"
      />
    </div>
  );
}
