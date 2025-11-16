"use client";
import { TextType } from "@/app/_components/_dashboard/_homePage/_aboutSectionDash/AboutSectionDash";
import { getIconComponent } from "@/app/_helpers/GlobalHelpers";
import { useLocale } from "@/app/_hooks/useLocale";
import { motion } from "framer-motion";

interface props {
  icon: string;
  text: TextType;
  color: string;
  delay: number;
}

export default function CharityCard({ icon, text, color, delay }: props) {
  const locale = useLocale();
  const Icon = getIconComponent(icon);
  return (
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
      <span className="text-gray-700 font-medium">{text[locale]}</span>
    </motion.div>
  );
}
