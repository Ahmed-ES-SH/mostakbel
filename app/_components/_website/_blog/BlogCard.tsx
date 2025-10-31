"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/app/_hooks/useLocale";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { BlogArticle } from "./mockArticles";
import Img from "../../_global/Img";
import LocaleLink from "../../_global/LocaleLink";
import { formatTitle } from "@/app/_helpers/GlobalHelpers";

interface BlogCardProps {
  article: BlogArticle;
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
      className="bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden bg-muted">
        <Img
          src={article.image || "/placeholder.svg"}
          alt={article.title[locale as "en" | "ar"]}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-3">
        {/* Category Badge */}
        <Badge variant="secondary" className="w-fit">
          {article.category}
        </Badge>

        {/* Title */}
        <h3 className="font-semibold text-lg line-clamp-2">
          {article.title[locale as "en" | "ar"]}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {article.description[locale as "en" | "ar"]}
        </p>

        {/* Date */}
        <p className="text-xs text-muted-foreground">
          {new Date(article.date).toLocaleDateString(
            locale === "ar" ? "ar-SA" : "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        </p>

        {/* Read More Button */}
        <LocaleLink
          href={`/blog/${formatTitle(article.title[locale])}?articleId=${
            article.id
          }`}
        >
          <Button variant="outline" className="w-full mt-2 bg-transparent">
            {t.readMore}
          </Button>
        </LocaleLink>
      </div>
    </motion.div>
  );
}
