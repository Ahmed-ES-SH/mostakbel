"use client";

import { motion } from "framer-motion";
import { CiBoxes } from "react-icons/ci";
import { FaRegSadTear, FaLightbulb } from "react-icons/fa";
import { useLocale } from "@/app/_hooks/useLocale";
import LocaleLink from "../../_global/LocaleLink";

interface ProjectNotFoundProps {
  onResetFilters?: () => void;
  onBrowseAll?: () => void;
  searchQuery?: string;
  className?: string;
}

export default function ProjectNotFound({
  onResetFilters,
  onBrowseAll,
  searchQuery,
  className = "",
}: ProjectNotFoundProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const content = {
    title: {
      en: "No Projects Found",
      ar: "لم يتم العثور على مشاريع",
    },
    description: {
      en: searchQuery
        ? `No results for "${searchQuery}". Try different keywords.`
        : "No projects available at the moment.",
      ar: searchQuery
        ? `لا توجد نتائج لـ "${searchQuery}". جرب كلمات أخرى.`
        : "لا توجد مشاريع متاحة حالياً.",
    },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
      >
        {/* أيقونة */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
            <CiBoxes className="w-12 h-12 text-blue-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center border border-yellow-200">
            <FaRegSadTear className="w-4 h-4 text-yellow-500" />
          </div>
        </motion.div>

        {/* النص */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {content.title[locale]}
        </h2>

        <p className="text-gray-600 mb-6 max-w-md">
          {content.description[locale]}
        </p>

        {/* نصائح */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 max-w-md">
          <div
            className={`flex items-center gap-2 mb-2 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <FaLightbulb className="w-4 h-4 text-blue-600" />
            <span className="text-blue-800 font-medium text-sm">
              {locale === "en" ? "Tip" : "نصيحة"}
            </span>
          </div>
          <p className="text-blue-700 text-sm text-start">
            {locale === "en"
              ? "Try clearing filters or browsing all categories"
              : "جرب مسح الفلاتر أو تصفح جميع الفئات"}
          </p>
        </div>

        {/* أزرار */}
        <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
          <LocaleLink href="/ourwork">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
              {locale === "en" ? "Browse All" : "تصفح الكل"}
            </button>
          </LocaleLink>
        </div>
      </motion.div>
    </div>
  );
}
