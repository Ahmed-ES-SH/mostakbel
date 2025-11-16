"use client";
import React from "react";
import { easeOut, motion } from "framer-motion";
import { getIconComponent } from "@/app/_helpers/GlobalHelpers";
import { bannerCardType } from "./BannerSection";
import { useLocale } from "@/app/_hooks/useLocale";

interface props {
  index: number;
  card: bannerCardType;
}

export default function BannerCard({ index, card }: props) {
  const locale = useLocale();
  const Icon = getIconComponent(card.icon);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };
  return (
    <motion.div
      key={index}
      variants={itemVariants}
      className={`text-center p-6 bg-light-primary-color text-white hover:text-black  hover:bg-white cursor-pointer group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex justify-center mb-4">
        <Icon className={`size-9 `} />
      </div>
      <h3
        className={`text-xl font-semibold text-gray-100 group-hover:text-gray-900 duration-300 mb-3`}
      >
        {card.title[locale]}
      </h3>
      <p
        className={`leading-relaxed text-white group-hover:text-gray-800 duration-300`}
      >
        {card.description[locale]}
      </p>
    </motion.div>
  );
}
