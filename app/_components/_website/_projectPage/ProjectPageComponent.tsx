"use client";

import { directionMap } from "@/app/constants/_website/Global";
import { useLocale } from "@/app/_hooks/useLocale";
import ProjectHero from "./ProjectHero";
import Overview from "./ProjectOverview";
import Impact from "./Impact";
import Gallery from "./Gallery";
import Donation from "./Donation";
import { ProjectType } from "../../_dashboard/_projects/_projectCard/ProjectCard";
import { TeamMember, TeamSwiper } from "../_about/TeamSwiper";

interface props {
  project: ProjectType;
  teamData: TeamMember[];
}

export default function ProjectPageCompoen({ project, teamData }: props) {
  const locale = useLocale();

  return (
    <main className="mb-10" dir={directionMap[locale]}>
      <ProjectHero project={project} />
      <Overview project={project} />
      <Impact project={project} />
      <Gallery project={project} />
      <Donation project={project} />
      <TeamSwiper teamMembers={teamData} />
      {/* <RelatedProjects project={mockProject} /> */}
    </main>
  );
}
