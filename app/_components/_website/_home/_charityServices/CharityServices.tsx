"use client";

import { JSX } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGraduationCap, FaHeartbeat, FaBolt } from "react-icons/fa";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { useLocale } from "@/app/_hooks/useLocale";
import { IoMdTrendingUp } from "react-icons/io";
import { FcElectricalSensor } from "react-icons/fc";

type Service = {
  icon: JSX.Element;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
};

export default function CharityServices() {
  const locale = useLocale();
  const t = useTranslation("services");

  const services: Service[] = [
    {
      icon: <FcElectricalSensor className="size-12" />,
      title: {
        en: "Electrical Inspections",
        ar: "فحوصات كهربائية",
      },
      description: {
        en: "Share stories and experiences from volunteers to inspire others to join.",
        ar: "شارك القصص والتجارب من المتطوعين لإلهام الآخرين للانضمام.",
      },
    },
    {
      icon: <FaGraduationCap className="text-green-600 size-12" />,
      title: {
        en: "Educations",
        ar: "التعليم",
      },
      description: {
        en: "Discover impactful projects and ways to help others thrive.",
        ar: "استكشف المشاريع التعليمية والطرق لمساعدة الآخرين على التقدم.",
      },
    },
    {
      icon: <FaHeartbeat className="text-red-500 size-12" />,
      title: {
        en: "Medical Help",
        ar: "المساعدة الطبية",
      },
      description: {
        en: "Connect with donation options and inspiring health stories.",
        ar: "تواصل مع خيارات التبرع وقصص ملهمة في مجال الصحة.",
      },
    },
  ];

  return (
    <section className="relative py-20 bg-[url('/website/paper-bg.png')] bg-cover bg-center">
      {/* overlay */}
      <div className="w-full h-full absolute top-0 left-0 bg-yellow-50/40 z-1"></div>
      <div className="container mx-auto px-6 text-center z-2 relative">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary font-semibold text-lg mb-2"
        >
          {t.subtitle}
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold text-stone-900 mb-12"
        >
          {t.title}
        </motion.h2>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-20 max-lg:gap-28 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl group relative shadow-md p-8 flex flex-col items-center justify-between hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-center pt-3 absolute -top-[25%] left-1/2 -translate-x-1/2 rounded-t-full w-40 h-40 mb-6 -z-2">
                <span className="order-1 relative">{service.icon}</span>
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white outline-20 outline-green-200 rounded-t-full"></div>
              </div>
              <div className="flex flex-col items-center z-3 relative">
                <div className="flex items-center justify-center bg-transparent rounded-full w-20 h-12 mb-2"></div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">
                  {service.title[locale]}
                </h3>
                <p className="text-stone-600 mb-6">
                  {service.description[locale]}
                </p>
              </div>
              <Button className="bg-light-primary-color hover:bg-primary-color flex items-center gap-1 text-white font-semibold">
                <p>{t.learnMore}</p>
                <IoMdTrendingUp />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
