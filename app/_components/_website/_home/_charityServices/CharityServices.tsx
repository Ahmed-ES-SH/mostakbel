"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { useLocale } from "@/app/_hooks/useLocale";
import { IoMdTrendingUp } from "react-icons/io";
import { TextType } from "@/app/_components/_dashboard/_homePage/_aboutSectionDash/AboutSectionDash";
import { getIconComponent } from "@/app/_helpers/GlobalHelpers";
import LocaleLink from "@/app/_components/_global/LocaleLink";

type Service = {
  icon: string;
  icon_style: string;
  title: { en: string; ar: string; nl: string };
  description: { en: string; ar: string; nl: string };
};

interface props {
  data: {
    services: Service[];
    texts: {
      title: TextType;
      subtitle: TextType;
    };
  };
}

export default function CharityServices({ data }: props) {
  const locale = useLocale();
  const t = useTranslation("services");

  const { services, texts } = data;

  const styles: any = {
    0: "size-12",
    1: "size-12 text-green-500",
    2: "size-12 text-red-500",
  };

  console.log(locale);
  console.log(data);

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
          {texts.subtitle[locale] ?? ""}
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold text-stone-900 mb-12"
        >
          {texts.title[locale] ?? ""}
        </motion.h2>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-20 max-lg:gap-28 gap-8">
          {services &&
            Array.isArray(services) &&
            services.length > 0 &&
            services.map((service, i: number) => {
              const Icon = getIconComponent(service.icon);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl group relative shadow-md p-8 flex flex-col items-center justify-between hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-center pt-3 absolute -top-[25%] left-1/2 -translate-x-1/2 rounded-t-full w-40 h-40 mb-6 -z-2">
                    <Icon className={`order-1 relative ${styles[i]}`} />
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white outline-20 outline-primary-color rounded-t-full"></div>
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
                  <LocaleLink href="/about">
                    <Button className="bg-light-primary-color hover:bg-primary-color flex items-center gap-1 text-white font-semibold">
                      <p>{t.learnMore}</p>
                      <IoMdTrendingUp />
                    </Button>
                  </LocaleLink>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
