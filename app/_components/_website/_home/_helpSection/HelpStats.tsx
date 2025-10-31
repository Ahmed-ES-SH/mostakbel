"use client";

import { useTranslation } from "@/app/_hooks/useTranslation";
import { motion } from "framer-motion";

const stats = [
  { value: "15K+", key: "volunteers" },
  { value: "1K+", key: "campaigns" },
  { value: "400+", key: "donors" },
  { value: "35K+", key: "support" },
];

export default function HelpStats() {
  const t = useTranslation("helpSection");
  const statsTexts: any = t.stats;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
      }}
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-6 mt-8 max-w-md"
    >
      {stats.map((item, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <p className="text-2xl font-bold text-[#FBBF24]">{item.value}</p>
          <p className="text-sm text-gray-200">{statsTexts[item.key]}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
