"use client";
import React from "react";
import LocaleLink from "../../_global/LocaleLink";
import { formatTitle } from "@/app/_helpers/GlobalHelpers";
import { Category } from "../../_dashboard/_ProjectPage/type";
import { motion } from "framer-motion";
import Img from "../../_global/Img";
import { localeType } from "@/app/_types/_website/Global";

interface props {
  category: Category;
  locale: localeType;
}

export default function CategoryCard({ category, locale }: props) {
  return (
    <LocaleLink
      href={`/news/categories/${formatTitle(
        locale == "ar" ? category.title_ar : category.title_en
      )}?newsCategoryId=${category.id}`}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full p-4 rounded-lg border-2 transition-colors border-gray-200 bg-gray-50 hover:border-gray-300`}
      >
        <div className="aspect-square mb-3 overflow-hidden rounded-md">
          <Img
            src={category.image}
            alt={locale === "ar" ? category.title_ar : category.title_en}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-gray-900 text-sm">
          {locale === "ar" ? category.title_ar : category.title_en}
        </h3>
      </motion.button>
    </LocaleLink>
  );
}
