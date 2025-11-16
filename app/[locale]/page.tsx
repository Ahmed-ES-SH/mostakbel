// ==========================
// Imports
// ==========================
import AboutSection from "../_components/_website/_home/_aboutSection/AboutSection";
import { BannerSection } from "../_components/_website/_home/_bannerSection/BannerSection";
import CharityServices from "../_components/_website/_home/_charityServices/CharityServices";
import ContactSection from "../_components/_website/_home/_contactusSection/ContactSection";
import FAQSection from "../_components/_website/_home/_FAQSection/FAQSection";
import HelpSection from "../_components/_website/_home/_helpSection/HelpSection";
import HeroSwiper from "../_components/_website/_home/_heroSection/HeroSection";
import NewsArticlesSection from "../_components/_website/_home/_newsArticlesSection/NewsArticlesSection";
import RecentProjects from "../_components/_website/_home/_projectsSwiper/ProjectsSection";
import FetchData from "../_helpers/FetchData";

// ==========================
// Home Page
// ==========================
export default async function Home() {
  // Fetch all needed data for the homepage
  const slices = await FetchData(`/slices`, false);
  const homeData = await FetchData(`/home-data`, false);
  const faqs = await FetchData(`/faqs?limit=5`, false);
  const projects = await FetchData(`/public-projects?limit=8`, false);
  const articles = await FetchData(`/public-articles?limit=8`, false);

  // Extract homepage sections data
  const { charity_services, about_section, help_section, faq_section } =
    await homeData;

  // Extract About section related items
  const { charities, texts, about_image, banner_cards, banner_texts } =
    await about_section;

  return (
    <>
      {/* Hero Section / Main Slider */}
      <HeroSwiper slides={slices} />

      {/* Charity Services Section */}
      <CharityServices data={charity_services} />

      {/* About Section */}
      <AboutSection
        charities={charities}
        texts={texts}
        about_image={about_image}
      />

      {/* Banner Cards Section */}
      <BannerSection bannerCards={banner_cards} bannerTexts={banner_texts} />

      {/* Recent Projects Slider */}
      <RecentProjects projects={projects} />

      {/* Help Section */}
      <HelpSection data={help_section} />

      {/* FAQ Section */}
      <FAQSection faqs={faqs} data={faq_section} />

      {/* Latest News */}
      <NewsArticlesSection articles={articles} />

      {/* Contact Section */}
      <ContactSection image={faq_section?.contact_image} />
    </>
  );
}
