import DynamicForm from "@/app/_components/_dashboard/_dynamicComponents/DynamicForm";
import { addCategoryinputs } from "@/app/constants/_dashboard/Inputs";
import React from "react";

export default function AddArticlesCategory() {
  return (
    <DynamicForm
      title="إنشاء قسم جديد للمقالات"
      subtitle="املأ البيانات المطلوبة بدقة"
      submitValue="إنشاء"
      inputs={addCategoryinputs}
      api="/articles-categories"
      direct="/en/dashboard/articlescategories"
      successMessage="تم إنشاء قسم جديد بنجاح "
    />
  );
}
