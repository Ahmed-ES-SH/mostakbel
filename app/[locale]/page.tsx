import AboutSection from "../_components/_website/_home/_aboutSection/AboutSection";
import { BannerSection } from "../_components/_website/_home/_bannerSection/BannerSection";
import CharityServices from "../_components/_website/_home/_charityServices/CharityServices";
import FAQSection from "../_components/_website/_home/_FAQSection/FAQSection";
import HelpSection from "../_components/_website/_home/_helpSection/HelpSection";
import HeroSwiper from "../_components/_website/_home/_heroSection/HeroSection";
import NewsArticlesSection from "../_components/_website/_home/_newsArticlesSection/NewsArticlesSection";
import RecentProjects from "../_components/_website/_home/_projectsSwiper/ProjectsSection";

export default function Home() {
  return (
    <>
      <HeroSwiper />
      <CharityServices />
      <AboutSection />
      <BannerSection />
      <RecentProjects />
      <HelpSection />
      <FAQSection />
      <NewsArticlesSection />
    </>
  );
}
