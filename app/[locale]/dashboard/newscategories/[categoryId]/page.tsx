import React from "react";
import DynamicElementPage from "@/app/_components/_dashboard/_dynamicComponents/DynamicElementPage";
import NotFoundItem from "@/app/_components/_dashboard/NotFoundItem";
import { addCategoryinputs } from "@/app/constants/_dashboard/Inputs";

export default async function NewsCatgoryPage({ params }: any) {
  const { categoryId } = await params;

  if (!categoryId) return <NotFoundItem />;

  return (
    <>
      <DynamicElementPage
        api={"/news-categories"}
        updateEndPoint={"/update-news-category"}
        id={categoryId}
        inputsData={addCategoryinputs}
        direct={"/dashboard/newscategories"}
      />
    </>
  );
}
