// Article Card Component
"use client";

import { ArticleType } from "@/app/_components/_dashboard/_articles/types";
import LocaleLink from "@/app/_components/_global/LocaleLink";
import {
  formatDate,
  formatTitle,
  truncateContent,
} from "@/app/_helpers/GlobalHelpers";
import { useLocale } from "@/app/_hooks/useLocale";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaArrowRight, FaCalendarAlt, FaTag } from "react-icons/fa";

interface props {
  article: ArticleType;
  readMore: string;
}

export default function ArticleCard({ article, readMore }: props) {
  const locale = useLocale();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-lg h-[500px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay ثابت يظهر عند التمرير */}
        <motion.div
          className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div
          className={`flex items-center gap-4 mb-4 text-sm ${
            locale === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`flex items-center gap-2 text-gray-600 ${
              locale === "ar" ? "flex-row-reverse" : ""
            }`}
          >
            <FaCalendarAlt className="text-orange-500" />
            <span>{formatDate(article.created_at)}</span>
          </div>
          <div
            className={`flex items-center gap-2 text-gray-600 ${
              locale === "ar" ? "flex-row-reverse" : ""
            }`}
          >
            <FaTag className="text-orange-500" />
            <span>
              {locale == "ar"
                ? article.category.title_ar
                : article.category.title_en}
            </span>
          </div>
        </div>

        {/* content */}
        <div className="flex-1 space-y-4">
          <h3
            className={`text-xl font-bold text-gray-900  ${
              locale === "ar" ? "text-right" : "text-left"
            }`}
          >
            {article.title}
          </h3>

          <p>{truncateContent(article.excerpt, 40)}</p>
        </div>

        <LocaleLink
          href={`/blog/${formatTitle(article.title)}?articleId=${article.id}`}
        >
          <motion.button
            className={`flex items-center w-fit gap-2 bg-teal-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-800 transition-colors ${
              locale === "ar" ? "flex-row-reverse" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{readMore}</span>
            <FaArrowRight className={locale === "ar" ? "rotate-180" : ""} />
          </motion.button>
        </LocaleLink>
      </div>
    </motion.div>
  );
}
