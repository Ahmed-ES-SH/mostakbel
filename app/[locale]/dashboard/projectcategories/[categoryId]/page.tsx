import DynamicElementPage from "@/app/_components/_dashboard/_dynamicComponents/DynamicElementPage";
import NotFoundItem from "@/app/_components/_dashboard/NotFoundItem";
import { addCategoryinputs } from "@/app/constants/_dashboard/Inputs";

export default async function ProjectCategoryPage({ params }: any) {
  const { categoryId } = await params;

  if (!categoryId) return <NotFoundItem />;

  return (
    <>
      <DynamicElementPage
        api={"/projects-categories"}
        updateEndPoint={"/update-project-category"}
        id={categoryId}
        inputsData={addCategoryinputs}
        direct={"/dashboard/projectcategories"}
      />
    </>
  );
}
