import DynamicForm from "@/app/_components/_dashboard/_dynamicComponents/DynamicForm";
import { addUserinputs } from "@/app/constants/_dashboard/Inputs";
import React from "react";

export default function AddUserPage() {
  return (
    <>
      <DynamicForm
        title="إنشاء مستخدم جديد"
        submitValue="إنشاء"
        inputs={addUserinputs}
        api="/register"
        direct="/dashboard/users"
        successMessage="تم إنشاء مستخدم جديد بنجاح "
      />
    </>
  );
}
