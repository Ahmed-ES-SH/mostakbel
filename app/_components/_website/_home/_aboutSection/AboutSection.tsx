"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaTint,
  FaGraduationCap,
  FaHeartbeat,
  FaArrowRight,
} from "react-icons/fa";
import { useLocale } from "@/app/_hooks/useLocale";
import { directionMap } from "@/app/constants/_website/Global";
import Img from "@/app/_components/_global/Img";

// Translation files
const translations = {
  en: {
    aboutUs: "About Us",
    donat: "Donat",
    heading: "We Believe That We Can Save More Life's With You",
    description:
      "Dialogue and Civil Peace Center is the largest global crowdfunding community connecting nonprofits, donors, and companies in nearly every country. We help nonprofits from Afghanistan to Zimbabwe (and hundreds of places in between) access the tools, training, and support they need to be more effective and make our world a better place.",
    charityFoods: "Charity For Foods",
    charityWater: "Charity For Water",
    charityEducation: "Charity For Education",
    charityMedical: "Charity For Medical",
    aboutMore: "About More",
  },
  ar: {
    aboutUs: "معلومات عنا",
    donat: "التبرع",
    heading: "نؤمن بأننا نستطيع إنقاذ المزيد من الأرواح معك",
    description:
      "مركز الحوار والسلم الأهلي هو أكبر مجتمع للتمويل الجماعي العالمي يربط المنظمات غير الربحية والمانحين والشركات في كل بلد تقريبًا. نحن نساعد المنظمات غير الربحية من أفغانستان إلى زيمبابوي (ومئات الأماكن بينهما) في الوصول إلى الأدوات والتدريب والدعم التي تحتاجها لتكون أكثر فعالية وجعل عالمنا مكانًا أفضل.",
    charityFoods: "الخيرية للأغذية",
    charityWater: "الخيرية للمياه",
    charityEducation: "الخيرية للتعليم",
    charityMedical: "الخيرية للطب",
    aboutMore: "اعرف المزيد",
  },
};

// Components
const CharityCard = ({ icon: Icon, text, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="flex items-center gap-3"
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className={`${color} w-10 h-10 rounded-full flex items-center justify-center`}
    >
      <Icon className="text-white text-lg" />
    </motion.div>
    <span className="text-gray-700 font-medium">{text}</span>
  </motion.div>
);

export default function AboutSection() {
  const locale = useLocale();
  const t = translations[locale];
  const isRTL = locale === "ar";

  const charities = [
    {
      icon: FaUtensils,
      text: t.charityFoods,
      color: "bg-teal-600",
      delay: 0.2,
    },
    { icon: FaTint, text: t.charityWater, color: "bg-yellow-500", delay: 0.3 },
    {
      icon: FaGraduationCap,
      text: t.charityEducation,
      color: "bg-orange-500",
      delay: 0.4,
    },
    {
      icon: FaHeartbeat,
      text: t.charityMedical,
      color: "bg-teal-700",
      delay: 0.5,
    },
  ];

  return (
    <div
      className={`min-h-screen overflow-hidden xl:pt-32 w-full bg-liner-to-br from-gray-50 to-gray-100`}
      dir={directionMap[locale]}
    >
      <div className="w-full px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* shape elements */}
            <Img
              className="lg:w-[300px] w-[220px] absolute -top-1/3 -left-12"
              src="/website/shap-1.png"
            />
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-24 h-24 opacity-30"
              >
                <div className="w-full h-full bg-yellow-400 rounded-full blur-xl" />
              </motion.div>

              {/* Main image frame */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-3xl max-lg:overflow-hidden lg:w-[550px] w-full lg:h-[550px] h-[300px] shadow-2xl border-8 border-t-orange-400 border-teal-700"
              >
                <div className="bg-liner-to-br md:absolute z-12 md:-left-12 md:top-0 lg:w-[640px] w-full h-full  from-teal-100 to-yellow-100 flex items-center justify-center">
                  <Img
                    src="/website/about_1_1-2.png"
                    alt="Happy children"
                    className="lg:w-[640px] w-full  relative"
                  />
                </div>

                {/* Decorative brush stroke overlay */}
                <div className="absolute inset-0 z-1 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                      d="M 20 20 Q 380 20 380 380 Q 380 380 20 380 Z"
                      stroke="#f59e0b"
                      strokeWidth="8"
                      fill="none"
                      opacity="0.3"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Decorative paint splashes */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-700 rounded-full opacity-20 blur-2xl"
              />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Heading Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block"
            >
              <span className="text-yellow-500 font-handwriting text-xl">
                {t.aboutUs}
              </span>

              <div className="h-1 bg-liner-to-r from-yellow-500 via-teal-700 to-yellow-500 rounded-full mt-1" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              {t.heading}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 text-lg leading-relaxed"
            >
              {t.description}
            </motion.p>

            {/* Charity Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {charities.map((charity, index) => (
                <CharityCard key={index} {...charity} />
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group bg-light-primary-color hover:bg-primary-color text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3  transition-all shadow-lg"
            >
              {t.aboutMore}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
