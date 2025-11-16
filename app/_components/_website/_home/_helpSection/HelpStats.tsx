"use client";

import { motion } from "framer-motion";
import { State } from "./HelpSection";
import { useLocale } from "@/app/_hooks/useLocale";

interface props {
  stats: State[];
}

export default function HelpStats({ stats }: props) {
  const locale = useLocale();
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
          <p className="text-sm text-gray-200">{item.title[locale]}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
