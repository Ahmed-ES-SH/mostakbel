"use client";
import { useLocale } from "@/app/_hooks/useLocale";
import { motion } from "framer-motion";

interface props {
  texts: any;
}

export default function NewsHeader({ texts }: props) {
  const locale = useLocale();
  return (
    <>
      {/* Section Header */}
      <motion.div
        className={`text-center mb-12 `}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-3 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div className="h-px w-12 bg-linear-to-r from-transparent to-orange-500"></div>
          <span className="text-orange-500 font-semibold text-lg">
            {texts.sectionSubtitle[locale]}
          </span>
          <div className="h-px w-12 bg-linear-to-l from-transparent to-orange-500"></div>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {texts.sectionTitle[locale]}
        </motion.h2>
      </motion.div>
    </>
  );
}
