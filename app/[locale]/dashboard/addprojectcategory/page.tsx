import DynamicForm from "@/app/_components/_dashboard/_dynamicComponents/DynamicForm";
import { addCategoryinputs } from "@/app/constants/_dashboard/Inputs";
import React from "react";

export default function AddProjectCategory() {
  return (
    <DynamicForm
      title="إنشاء قسم جديد للمشاريع"
      subtitle="املأ البيانات المطلوبة بدقة"
      submitValue="إنشاء"
      inputs={addCategoryinputs}
      api="/projects-categories"
      direct="/en/dashboard/projectcategories"
      successMessage="تم إنشاء قسم جديد بنجاح "
    />
  );
}
