import ProjectEditPage from "@/app/_components/_dashboard/_ProjectPage/ProjectEditPage";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{
    projectId: string;
  }>;
}) {
  const { projectId } = await params;

  const project = await FetchData(`/projects/${projectId}`, false);
  const categories = await FetchData(`/projects-categories/all-arabic`, false);

  if (!projectId)
    return (
      <div className="w-full min-h-screen text-xl text-red-500 flex items-center justify-center">
        لم يتم العثور على المشروع المحدد
      </div>
    );

  return <ProjectEditPage categories={categories} data={project} />;
}
