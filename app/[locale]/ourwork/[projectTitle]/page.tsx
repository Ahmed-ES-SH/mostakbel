import ProjectNotFound from "@/app/_components/_website/_projectPage/ProjectNotFound";
import ProjectPageCompoennt from "@/app/_components/_website/_projectPage/ProjectPageComponent";
import FetchData from "@/app/_helpers/FetchData";
import { getServerTranslation } from "@/app/_helpers/serverTranslation";
import { getSharedMetadata } from "@/app/_helpers/SharedMetadata";

export async function generateMetadata({ params, searchParams }: any) {
  const { locale } = await params;
  const { projectId } = await searchParams;
  const project = await FetchData(`/projects/${projectId}`, false);
  const t = await getServerTranslation(locale, "projectMeta");
  const sharedMetadata = await getSharedMetadata(
    `${t.title} - ${project.title ?? "project Title"}`,
    `${t.description} - ${project.overview ?? "project content"}`
  );
  return {
    title: `${t.title} - ${project.title ?? "project Title"}`,
    description: `${t.description} - ${project.overview ?? "project content"}`,
    ...sharedMetadata,
  };
}

export default async function ProjectPage({ searchParams }: any) {
  const { projectId } = await searchParams;

  const project = await FetchData(`/projects/${projectId}`, false);
  const teamData = await FetchData(`/center-members/active?limit=8`, false);

  if (project.error || !project) return <ProjectNotFound />;

  return <ProjectPageCompoennt teamData={teamData} project={project} />;
}
