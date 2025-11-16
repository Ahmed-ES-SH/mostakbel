"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiHandHeartLine } from "react-icons/ri";
import { directionMap } from "@/app/constants/_website/Global";
import { useLocale } from "@/app/_hooks/useLocale";
import ImageCollage from "./ImageCollage";
import AccordionItem from "./AccordionItem";
import { TextType } from "@/app/_components/_dashboard/_homePage/_aboutSectionDash/AboutSectionDash";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  user_id: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

interface props {
  data: {
    texts: {
      title: TextType;
      footer: TextType;
      heading: TextType;
    };

    image_1: string;
    image_2: string;
    image_3: string;
  };

  faqs: FAQ[];
}

export default function FAQSection({ data, faqs }: props) {
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const isRTL = locale === "ar";

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { texts, image_1, image_2, image_3 } = data;

  console.log(texts);

  return (
    <div
      className={`min-h-screen pt-16 bg-linear-to-br from-orange-50 via-white to-teal-50 py-12 px-4`}
      dir={directionMap[locale]}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Images */}
          <div className="relative h-[600px] hidden lg:block">
            <ImageCollage
              image_1={image_1}
              image_2={image_2}
              icon_image={image_3}
            />
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
                  {texts.title[locale]}
                </span>
                <div className="h-px flex-1 bg-amber-300 max-w-[100px]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {texts.heading[locale]}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {faqs &&
                faqs.length > 0 &&
                faqs.map((faq, index) => (
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
              <p className="text-sm text-gray-600">{texts.footer[locale]}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
