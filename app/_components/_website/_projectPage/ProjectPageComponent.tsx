"use client";

import { directionMap } from "@/app/constants/_website/Global";
import { useLocale } from "@/app/_hooks/useLocale";
import ProjectHero from "./ProjectHero";
import Overview from "./ProjectOverview";
import Impact from "./Impact";
import Gallery from "./Gallery";
import Donation from "./Donation";
import Team from "./Team";
import Testimonials from "./Testimonials";
import RelatedProjects from "./RelatedProjects";
import Contact from "./Conntact";
import { mockProject } from "./mockProject";

export default function ProjectPageCompoen() {
  const locale = useLocale();

  return (
    <main className="mb-10" dir={directionMap[locale]}>
      <ProjectHero project={mockProject} />
      <Overview project={mockProject} />
      <Impact project={mockProject} />
      <Gallery project={mockProject} />
      <Donation project={mockProject} />
      <Team project={mockProject} />
      <Testimonials project={mockProject} />
      <RelatedProjects project={mockProject} />
    </main>
  );
}
