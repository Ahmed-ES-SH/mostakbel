"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/app/_hooks/useLocale";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { BlogArticle } from "./mockArticles";
import Img from "../../_global/Img";
import LocaleLink from "../../_global/LocaleLink";
import {
  formatDate,
  formatTitle,
  truncateContent,
} from "@/app/_helpers/GlobalHelpers";
import { ArticleType } from "../../_dashboard/_articles/types";

interface BlogCardProps {
  article: ArticleType;
  index: number;
}

export function BlogCard({ article, index }: BlogCardProps) {
  const locale = useLocale();
  const t = useTranslation("blog");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-card h-full rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden bg-muted">
        <Img
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-3">
        {/* Category Badge */}
        {article.category && (
          <Badge variant="secondary" className="w-fit">
            {locale == "ar"
              ? article.category.title_ar
              : article.category.title_en}
          </Badge>
        )}

        {/* Title */}
        <h3 className="font-semibold text-lg line-clamp-2">{article.title}</h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {truncateContent(article.excerpt, 40)}
        </p>

        {/* Date */}
        <p className="text-xs text-muted-foreground">
          {formatDate(article.created_at)}
        </p>

        {/* Read More Button */}
        <LocaleLink
          className="mt-auto"
          href={`/blog/${formatTitle(article.title)}?articleId=${article.id}`}
        >
          <Button variant="outline" className="w-full mt-2 bg-transparent">
            {t.readMore}
          </Button>
        </LocaleLink>
      </div>
    </motion.div>
  );
}
