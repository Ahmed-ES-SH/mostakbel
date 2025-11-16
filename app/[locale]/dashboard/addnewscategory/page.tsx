import DynamicForm from "@/app/_components/_dashboard/_dynamicComponents/DynamicForm";
import { addCategoryinputs } from "@/app/constants/_dashboard/Inputs";
import React from "react";

export default function AddNewsCategory() {
  return (
    <DynamicForm
      title="إنشاء قسم جديد للأخبار"
      subtitle="املأ البيانات المطلوبة بدقة"
      submitValue="إنشاء"
      inputs={addCategoryinputs}
      api="/news-categories"
      direct="/en/dashboard/newscategories"
      successMessage="تم إنشاء قسم جديد بنجاح "
    />
  );
}
