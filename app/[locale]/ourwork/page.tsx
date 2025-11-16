import { CTASection } from "@/app/_components/_website/_ourWork/CTASection";
import FeaturedProjectsSection from "@/app/_components/_website/_ourWork/FeaturedProjectsSection";
import { ImpactStatisticsSection } from "@/app/_components/_website/_ourWork/ImpactStatisticsSection";
import { OurWorkHero } from "@/app/_components/_website/_ourWork/OurWorkHero";
import { ProjectCategoriesSection } from "@/app/_components/_website/_ourWork/ProjectCategoriesSection";
import FetchData from "@/app/_helpers/FetchData";
import { getServerTranslation } from "@/app/_helpers/serverTranslation";
import { getSharedMetadata } from "@/app/_helpers/SharedMetadata";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = await getServerTranslation(locale, "ourwrokMeta");
  const sharedMetadata = await getSharedMetadata(t.title, t.description);
  return {
    title: `${t.title}`,
    description: `${t.description}`,
    ...sharedMetadata,
  };
}

export default async function ProjectsPage() {
  const categories = await FetchData(`/projects-categories/all?limit=8`, false);
  const projects = await FetchData(`/public-projects`, true);

  const { data, pagination } = projects;

  return (
    <main className="w-full">
      <OurWorkHero />
      {/* <AboutProjectsSection /> */}
      <ProjectCategoriesSection categories={categories} />
      <FeaturedProjectsSection projectsData={data} pagination={pagination} />
      <ImpactStatisticsSection />
      <CTASection />
    </main>
  );
}
