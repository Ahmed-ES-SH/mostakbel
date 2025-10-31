"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiGlobe } from "react-icons/fi";
import { RiHandHeartLine } from "react-icons/ri";
import { directionMap } from "@/app/constants/_website/Global";
import { useLocale } from "@/app/_hooks/useLocale";
import Img from "@/app/_components/_global/Img";

// Translation JSON structure
const translations = {
  en: {
    title: "Frequently Asked Questions",
    heading: "Have Any Questions For Us?",
    faqs: [
      {
        question: "What motivates you to donate to our charity?",
        answer:
          "Our donors are motivated by the desire to make a meaningful difference in the lives of children and families in need. Every contribution helps provide education, healthcare, and essential resources to those who need it most.",
      },
      {
        question: "How did you hear about our organization?",
        answer:
          "People discover us through various channels including social media, word of mouth from friends and family, community events, and online searches. Many also learn about our work through partner organizations and local outreach programs.",
      },
      {
        question: "How frequently do you prefer to volunteer?",
        answer:
          "We offer flexible volunteering opportunities ranging from one-time events to regular weekly or monthly commitments. You can choose what works best for your schedule, whether it's helping at community events, mentoring programs, or administrative support.",
      },
      {
        question: "What motivated you to participate in this event?",
        answer:
          "Participants are often inspired by the chance to directly impact their community, meet like-minded individuals, and witness firsthand the positive change their involvement creates. Our events are designed to be meaningful, engaging, and rewarding experiences.",
      },
    ],
  },
  ar: {
    title: "الأسئلة الشائعة",
    heading: "هل لديك أي أسئلة لنا؟",
    faqs: [
      {
        question: "ما الذي يحفزك على التبرع لجمعيتنا الخيرية؟",
        answer:
          "يتحفز المتبرعون لدينا برغبتهم في إحداث فرق حقيقي في حياة الأطفال والأسر المحتاجة. كل مساهمة تساعد في توفير التعليم والرعاية الصحية والموارد الأساسية لمن هم في أمس الحاجة إليها.",
      },
      {
        question: "كيف سمعت عن منظمتنا؟",
        answer:
          "يكتشفنا الناس من خلال قنوات مختلفة بما في ذلك وسائل التواصل الاجتماعي، والتوصيات من الأصدقاء والعائلة، والفعاليات المجتمعية، والبحث عبر الإنترنت. كما يتعرف الكثيرون على عملنا من خلال المنظمات الشريكة وبرامج التواصل المحلية.",
      },
      {
        question: "كم مرة تفضل التطوع؟",
        answer:
          "نقدم فرص تطوع مرنة تتراوح من الفعاليات لمرة واحدة إلى الالتزامات المنتظمة الأسبوعية أو الشهرية. يمكنك اختيار ما يناسب جدولك، سواء كان المساعدة في الفعاليات المجتمعية أو برامج التوجيه أو الدعم الإداري.",
      },
      {
        question: "ما الذي حفزك على المشاركة في هذا الحدث؟",
        answer:
          "غالباً ما يتم إلهام المشاركين من خلال فرصة التأثير المباشر على مجتمعهم، ومقابلة أفراد ذوي تفكير مماثل، ومشاهدة التغيير الإيجابي الذي تحدثه مشاركتهم بشكل مباشر. تم تصميم فعالياتنا لتكون تجارب ذات مغزى وجذابة ومجزية.",
      },
    ],
  },
};

// Types
interface FAQ {
  question: string;
  answer: string;
}

interface AccordionItemProps {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isRTL: boolean;
}

// Components
const AccordionItem: React.FC<AccordionItemProps> = ({
  faq,
  index,
  isOpen,
  onToggle,
  isRTL,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className={`w-full py-6 px-6 flex items-center justify-between ltr:text-left rtl:text-right hover:bg-gray-50 transition-colors`}
        aria-expanded={isOpen}
      >
        <span
          className={`text-lg font-medium text-gray-800 flex-1 ${
            isRTL ? "ml-4" : "mr-4"
          }`}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <FiChevronDown className="w-6 h-6 text-gray-600" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className={`px-6 pb-6 text-gray-600 leading-relaxed text-${
                isRTL ? "right" : "left"
              }`}
            >
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ImageCollage: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      {/* Main large image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl"
      >
        <Img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
          alt="Happy children"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Bottom middle image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute bottom-0 left-1/4 w-1/2 h-2/5 rounded-3xl overflow-hidden shadow-2xl"
      >
        <Img
          src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&q=80"
          alt="Child portrait"
          className="w-full h-full object-cover filter grayscale"
        />
      </motion.div>

      {/* Top right circular image */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute top-16 right-0 w-32 h-32"
      >
        <Img
          src="/website/hand-group-shape1-3-1.png"
          alt="Children together"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Decorative splash */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-4 right-1/4 w-24 h-32 bg-amber-400 rounded-full filter blur-2xl"
      />
    </div>
  );
};

export default function FAQSection() {
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const t = translations[locale];
  const isRTL = locale === "ar";

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className={`min-h-screen pt-16 bg-linear-to-br from-orange-50 via-white to-teal-50 py-12 px-4`}
      dir={directionMap[locale]}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Images */}
          <div className="relative h-[600px] hidden lg:block">
            <ImageCollage />
          </div>

          {/* Right Side - FAQ */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-8 ltr:text-left rtl:text-right`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-500 font-handwriting">
                  {t.title}
                </span>
                <div className="h-px flex-1 bg-amber-300 max-w-[100px]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.heading}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {t.faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                  isRTL={isRTL}
                />
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`mt-8 flex items-center max-md:flex-col gap-4 ${
                isRTL ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center  gap-2 px-6 py-3 bg-linear-to-r from-teal-500 to-teal-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
              >
                <RiHandHeartLine className="w-5 h-5" />
                <span>{locale === "en" ? "Donate Now" : "تبرع الآن"}</span>
              </motion.button>
              <p className="text-sm text-gray-600">
                {locale === "en"
                  ? "Join us in making a difference"
                  : "انضم إلينا في إحداث فرق"}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
