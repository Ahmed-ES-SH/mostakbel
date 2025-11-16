"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { Category } from "../../_dashboard/_ProjectPage/type";
import { useLocale } from "@/app/_hooks/useLocale";
import { formatTitle, getIconComponent } from "@/app/_helpers/GlobalHelpers";
import LocaleLink from "../../_global/LocaleLink";

interface props {
  categories: Category[];
}

export function ProjectCategoriesSection({ categories }: props) {
  const t = useTranslation("categories");
  const locale = useLocale();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6 text-balance">
            {t.title}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => {
            const Icon = getIconComponent(category.icon_name);
            return (
              <LocaleLink
                href={`/ourwork/categories/${formatTitle(
                  locale == "ar" ? category.title_ar : category.title_en
                )}?projectCategoryId=${category.id}`}
              >
                <motion.div key={index} variants={itemVariants}>
                  <Card
                    className="p-8 h-full shadow-sm hover:text-white text-stone-900 transition-shadow cursor-pointer group duration-300"
                    style={{
                      backgroundColor: "#fff", // لون افتراضي
                      transition: ".3",
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLDivElement
                      ).style.backgroundColor = category.bg_color;
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLDivElement
                      ).style.backgroundColor = "#fff";
                    }}
                  >
                    <Icon className="w-10 h-10  mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold  mb-3">
                      {locale == "ar" ? category.title_ar : category.title_en}
                    </h3>
                  </Card>
                </motion.div>
              </LocaleLink>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
