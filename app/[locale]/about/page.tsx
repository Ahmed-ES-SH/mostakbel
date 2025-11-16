import AboutPageComponent from "@/app/_components/_website/_about/AboutPageComponent";
import { TeamSwiper } from "@/app/_components/_website/_about/TeamSwiper";
import FetchData from "@/app/_helpers/FetchData";

export default async function AboutPage() {
  const teamData = await FetchData(`/center-members/active?limit=8`, false);

  return (
    <>
      <AboutPageComponent />
      <TeamSwiper
        teamMembers={teamData}
        title="فريقنا المتخصص"
        subtitle="تعرف على الخبراء والمتخصصين في مجال التغذية"
      />
    </>
  );
}
