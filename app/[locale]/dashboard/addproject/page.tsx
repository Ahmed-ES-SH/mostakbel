import ProjectCreatePage from "@/app/_components/_dashboard/_ProjectPage/ProjectCreatePage";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function AddProjectPage() {
  const categories = await FetchData(`/projects-categories/all-arabic`, false);

  return <ProjectCreatePage categories={categories} />;
}
