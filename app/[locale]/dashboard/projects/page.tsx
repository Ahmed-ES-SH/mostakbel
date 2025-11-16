import ProjectsBody from "@/app/_components/_dashboard/_projects/ProjectsBody";
import ProjectsSidebar from "@/app/_components/_dashboard/_projects/ProjectsSidebar";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function ProjectsDashPage() {
  const response = await FetchData(`/projects`, true);
  const categories = await FetchData(`/projects-categories/all-arabic`, false);

  if (!response) return null;

  const { data, pagination } = response;

  return (
    <div className="w-full pb-20 ">
      <ProjectsBody
        categories={categories}
        data={data}
        pagination={pagination}
      />
    </div>
  );
}
