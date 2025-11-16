import CategoryHeader from "@/app/_components/_website/_news/CategoryHeader";
import { CTASection } from "@/app/_components/_website/_ourWork/CTASection";
import FeaturedProjectsSection from "@/app/_components/_website/_ourWork/FeaturedProjectsSection";
import { ImpactStatisticsSection } from "@/app/_components/_website/_ourWork/ImpactStatisticsSection";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function ProjectsByCategory({
  params,
  searchParams,
}: any) {
  const { categoryTitle } = await params;
  const { projectCategoryId } = await searchParams;

  const projects = await FetchData(
    `/public-projects?categories=${projectCategoryId}`,
    true
  );

  const { data, pagination } = projects;

  return (
    <main className="min-h-screen w-full lg:mt-40">
      <CategoryHeader targetPage="projects" categoryTitle={categoryTitle} />
      <FeaturedProjectsSection projectsData={data} pagination={pagination} />
      <ImpactStatisticsSection />
      <CTASection />
    </main>
  );
}
