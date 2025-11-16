"use client";

import { TextType } from "@/app/_components/_dashboard/_homePage/_aboutSectionDash/AboutSectionDash";
import { useLocale } from "@/app/_hooks/useLocale";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import BannerCard from "./BannerCard";
import { getIconComponent } from "@/app/_helpers/GlobalHelpers";

export interface bannerCardType {
  icon: string;
  color: string;
  bg: string;
  title: TextType;
  description: TextType;
  textColor: string;
}

interface props {
  bannerCards: bannerCardType[];
  bannerTexts: {
    title: TextType;
    icon: string;
  };
}

export function BannerSection({ bannerCards, bannerTexts }: props) {
  const locale = useLocale();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const MainIcon = getIconComponent(bannerTexts.icon);

  return (
    <section className="w-full bg-primary-color pt-16 pb-4 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <MainIcon className="text-6xl text-white" />
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: [0, 15, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <FaUsers className="text-2xl text-green-500" />
              </motion.div>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {bannerTexts.title[locale]}
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {bannerCards &&
            bannerCards.map((card, index) => (
              <BannerCard
                index={index}
                card={card}
                key={`banner-card-${index}`}
              />
            ))}
        </motion.div>
      </div>
    </section>
  );
}
