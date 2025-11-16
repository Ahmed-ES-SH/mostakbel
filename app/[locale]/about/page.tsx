import AboutPageComponent from "@/app/_components/_website/_about/AboutPageComponent";
import { TeamSwiper } from "@/app/_components/_website/_about/TeamSwiper";
import FetchData from "@/app/_helpers/FetchData";
import { getServerTranslation } from "@/app/_helpers/serverTranslation";
import { getSharedMetadata } from "@/app/_helpers/SharedMetadata";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = await getServerTranslation(locale, "aboutMeta");
  const sharedMetadata = await getSharedMetadata(t.title, t.description);
  return {
    title: `${t.title}`,
    description: `${t.description}`,
    ...sharedMetadata,
  };
}

export default async function AboutPage() {
  const teamData = await FetchData(`/center-members/active?limit=8`, false);
  const aboutData = await FetchData(`/custom-details`, false);

  return (
    <>
      <AboutPageComponent data={aboutData} />
      <TeamSwiper teamMembers={teamData} />
    </>
  );
}
