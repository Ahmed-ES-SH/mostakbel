"use client";

import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { useLocale } from "@/app/_hooks/useLocale";
import { useTranslation } from "@/app/_hooks/useTranslation";
import LocaleLink from "../../_global/LocaleLink";
import { formatDate, formatTitle } from "@/app/_helpers/GlobalHelpers";
import { ArticleType } from "../../_dashboard/_articles/types";

interface RelatedArticlesProps {
  articles: ArticleType[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  const locale = useLocale();
  const t = useTranslation("articlePage");
  const isRTL = locale == "ar";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-foreground">
        {t.article.relatedArticles}
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${
          isRTL ? "direction-rtl" : ""
        }`}
      >
        {articles.map((article) => (
          <motion.div key={article.id} variants={itemVariants}>
            <Card className="overflow-hidden group transition-all hover:shadow-lg">
              <div className="overflow-hidden">
                <motion.img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="p-4">
                <div className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  {locale == "ar"
                    ? article.category.title_ar
                    : article.category.title_en}
                </div>
                <LocaleLink
                  href={`/blog/${formatTitle(article.title)}?articleId=${
                    article.id
                  }`}
                >
                  <h3
                    className="mb-2 line-clamp-2 group-hover:underline group-hover:text-sky-500 hover:cursor-pointer font-bold text-foreground"
                    style={{ direction: isRTL ? "rtl" : "ltr" }}
                  >
                    {article.title}
                  </h3>
                </LocaleLink>
                <p
                  className="mb-4 line-clamp-2 text-sm text-muted-foreground"
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(article.created_at)}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
