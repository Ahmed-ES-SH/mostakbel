"use client";
import { useLocale } from "@/app/_hooks/useLocale";
import HeroBanner from "../../_global/_heroBanner/HeroBanner";
import { directionMap } from "@/app/constants/_website/Global";
import AboutContentSection from "./ContentSection";
import { TextType } from "../../_dashboard/_homePage/_aboutSectionDash/AboutSectionDash";

type SectionType = {
  title: TextType;
  content: TextType;
  image: string;
};

interface props {
  data: {
    sections: SectionType[];
  };
}

// ===== Main About Page =====
export default function AboutPageComponent({ data }: props) {
  const locale = useLocale();

  const { sections } = data;

  return (
    <div dir={directionMap[locale]} className={`min-h-screen bg-white`}>
      {/* Hero Section */}
      <HeroBanner imageSrc="/website/slide2.jpg" />

      {/* Content Sections */}
      <div className="space-y-24 px-6 sm:px-8 lg:px-12 py-20 bg-linear-to-b from-white to-gray-50">
        <div className="c-container">
          {sections &&
            Array.isArray(sections) &&
            sections.length > 0 &&
            sections.map((section, index) => (
              <AboutContentSection
                key={index}
                title={section.title[locale]}
                desc={section.content[locale]}
                image={section.image}
                reverse={index % 2 === 0} // Alternate layout
              />
            ))}
        </div>
      </div>
    </div>
  );
}
