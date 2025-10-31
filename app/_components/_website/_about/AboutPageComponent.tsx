"use client";
import { useLocale } from "@/app/_hooks/useLocale";
import HeroBanner from "../../_global/_heroBanner/HeroBanner";
import { directionMap } from "@/app/constants/_website/Global";
import AboutContentSection from "./ContentSection";

// ===== Translations =====
const translations = {
  heroTitle: {
    en: "Dialogue and Civil Peace Center",
    ar: "مركز الحوار والسلم الأهلي",
  },
  heroDesc: {
    en: "A national independent center working to promote a culture of dialogue and build civil peace in Syria by launching community initiatives, creating spaces for communication among all components of society, and supporting national reconciliation efforts.",
    ar: "مركزٌ وطنيٌّ مستقلٌّ يعمل على تعزيز ثقافة الحوار وبناء السلم الأهلي في سوريا، من خلال إطلاق المبادرات المجتمعية، وخلق مساحات للتواصل بين جميع مكونات المجتمع، ودعم جهود المصالحة الوطنية.",
  },
  playVideo: {
    en: "Watch Intro Video",
    ar: "مشاهدة الفيديو التعريفي",
  },
  sections: [
    {
      title: {
        en: "Message from the Board of Directors",
        ar: "رسالة مجلس الإدارة",
      },
      desc: {
        en: `Amid the challenges facing Syria, "dialogue" stands as a bridge leading us from the fires of conflict to the gardens of peace, from the pain of the past to the hope of the future.
At the Dialogue and Civil Peace Center, we believe that the only language that must prevail is the language of wisdom, justice, and coexistence.
We work for a Syria that embraces everyone — where peace is built not only by ending war but by restoring the fabric of our society and transforming pages of conflict into chapters of forgiveness and reconstruction.
We invite you to join us in this mission, because peace is a collective responsibility and our goal is to leave future generations a homeland that stands as a model of belonging, diversity, and justice.
Together… we build peace.`,
        ar: `في ظلّ التحديات التي تمرُّ بها سوريا، يبرز "الحوار" كجسرٍ يعبرُ بنا من نار الصراع إلى جنة السلام، ومن ألم الماضي إلي أمل المستقبل.
في مركز الحوار والسلم الأهلي، نؤمن بأنَّ اللّغة الوحيدة التي يجب أن تنتصر هي لغة الحكمة، والعدل، والتَّعايش.
نعملُ من أجل سوريا تتسعُ للجميع، حيثُ يُبنى السلامُ ليس فقط بإنهاء الحرب، بل بإعادة اللحمة إلى نسيجنا المجتمعي، وبتحويل صفحات النزاع إلى فصولٍ للتسامح والبناء.
ندعوكم أن تكونوا شركاءنا في هذه الرِّسالة، لأنَّ السلامَ مسؤوليةٌ جماعية، وغايتنا أن نتركَ للأجيال القادمة وطناً يُحتذى به في قوَّةِ انتمائه، وغنى تنوُّعِه، وعدالةِ مستقبله.
معاً .. نصنعُ السلام.

السَّلام عليكم ورحمة الله وبركاته،
مجلس إدارة مركز الحوار والسلم الأهلي.`,
      },
      image: "/website/about/about-1.svg",
    },
    {
      title: {
        en: "Our Mission",
        ar: "رسالتنا",
      },
      desc: {
        en: "To contribute to achieving national reconciliation and promoting dialogue among all components of Syrian society, while protecting civil peace through transitional justice mechanisms, awareness, and community empowerment.",
        ar: "المساهمة في تحقيق المصالحة الوطنية وتعزيز الحوار بين مكونات المجتمع السوري وحماية السلم الأهلي عبر آليات العدالة الانتقالية، التوعية، وتمكين المجتمع المدني.",
      },
      image: "/website/about/about-3.svg",
    },
    {
      title: {
        en: "Our Goals",
        ar: "الأهداف",
      },
      desc: {
        en: `• Protect the rights and promote the interests of vulnerable groups  
• Provide charitable work to support those in need  
• Offer counseling and advice to victims of crime  
• Establish training and employment programs to promote self-reliance through income generation  
• Provide legal advice and assist in conflict resolution  
• Promote principles of good citizenship through awareness programs  
• Support national reconciliation through dialogue, development programs, and national initiatives  
• Launch small and medium-sized projects to reduce the impact of the economic situation.`,
        ar: `• حماية الحقوق وتعزيز مصالح المجموعات الهشة  
• تقديم عمل خيري لدعم الفئات المحتاجة  
• المساهمة في تقديم المشورة والنصح لضحايا الجريمة  
• إقامة برامج تدريب وتوظيف للاعتماد على الذات بتوليد الدخل  
• تقديم المشورة القانونية والمساعدة في حل النزاعات  
• نشر مبادئ المواطنة السليمة من خلال الندوات والبرامج التوعوية  
• المساهمة في دعم المصالحة الوطنية من خلال الحوار الوطني والبرامج التنموية والمبادرات الوطنية  
• إقامة المشاريع الصغيرة والمتوسطة للمساعدة على الحد من تأثير الحالة الاقتصادية.`,
      },
      image: "/website/about/about-2.svg",
    },
  ],
};

// ===== Main About Page =====
export default function AboutPageComponent() {
  const locale = useLocale();

  return (
    <div dir={directionMap[locale]} className={`min-h-screen bg-white`}>
      {/* Hero Section */}
      <HeroBanner imageSrc="/website/slide2.jpg" />

      {/* Content Sections */}
      <div className="space-y-24 px-6 sm:px-8 lg:px-12 py-20 bg-linear-to-b from-white to-gray-50">
        <div className="c-container">
          {translations.sections.map((section, index) => (
            <AboutContentSection
              key={index}
              title={section.title[locale]}
              desc={section.desc[locale]}
              image={section.image}
              reverse={index % 2 === 0} // Alternate layout
            />
          ))}
        </div>
      </div>
    </div>
  );
}
