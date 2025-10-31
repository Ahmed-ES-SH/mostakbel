import { AboutProjectsSection } from "@/app/_components/_website/_ourWork/AboutProjectsSection";
import { CTASection } from "@/app/_components/_website/_ourWork/CTASection";
import { FeaturedProjectsSection } from "@/app/_components/_website/_ourWork/FeaturedProjectsSection";
import { ImpactStatisticsSection } from "@/app/_components/_website/_ourWork/ImpactStatisticsSection";
import { OurWorkHero } from "@/app/_components/_website/_ourWork/OurWorkHero";
import { ProjectCategoriesSection } from "@/app/_components/_website/_ourWork/ProjectCategoriesSection";

export default function ProjectsPage() {
  return (
    <main className="w-full">
      <OurWorkHero />
      <AboutProjectsSection />
      {/* <ProjectCategoriesSection /> */}
      <FeaturedProjectsSection />
      <ImpactStatisticsSection />
      <CTASection />
    </main>
  );
}
