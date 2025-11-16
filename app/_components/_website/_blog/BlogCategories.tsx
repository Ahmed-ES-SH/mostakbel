"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { Category } from "../../_dashboard/_ProjectPage/type";
import { useLocale } from "@/app/_hooks/useLocale";
import LocaleLink from "../../_global/LocaleLink";
import { formatTitle } from "@/app/_helpers/GlobalHelpers";

interface BlogCategoriesProps {
  categories: Category[];
}

export default function BlogCategories({ categories }: BlogCategoriesProps) {
  const t = useTranslation("blog");
  const locale = useLocale();

  return (
    <div className="space-y-4 max-h-60 overflow-x-hidden overflow-y-auto">
      <h3 className="font-semibold text-lg">{t.categories}</h3>
      <div className="space-y-2">
        {categories &&
          categories.map((category, index) => (
            <LocaleLink
              href={`/blog/categories/${formatTitle(
                locale == "ar" ? category.title_ar : category.title_en
              )}?articleCategoryId=${category.id}`}
            >
              <motion.button
                key={`article-category-${category.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors bg-muted hover:bg-muted/80`}
              >
                {locale == "ar" ? category.title_ar : category.title_en}
              </motion.button>
            </LocaleLink>
          ))}
      </div>
    </div>
  );
}
