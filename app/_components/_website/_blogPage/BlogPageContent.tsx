"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/app/_hooks/useLocale";
import { directionMap } from "@/app/constants/_website/Global";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleContent } from "./ArticleContent";
import { ShareButtons } from "./ShareButtons";
import { RelatedArticles } from "./RelatedArticles";
import { CommentsSection } from "./CommentsSection";
import { BlogSidebar } from "../_blog/BlogSidebar";
import { ArticleType } from "../../_dashboard/_articles/types";
import { formatDate } from "@/app/_helpers/GlobalHelpers";
import { Category } from "../../_dashboard/_ProjectPage/type";

interface props {
  article: ArticleType;
  relatedArticles: ArticleType[];
  categories: Category[];
  tags: Tag[];
}

export default function ArticlePageComponent({
  article,
  relatedArticles,
  categories,
  tags,
}: props) {
  const locale = useLocale();
  const isRTL = locale == "ar";

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div
      className="min-h-screen lg:mt-32 mt-12 bg-background"
      dir={directionMap[locale]}
    >
      <div className="c-container  px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <ArticleHeader
              title={article.title}
              author={article.author.name}
              date={formatDate(article.created_at)}
              category={
                locale == "ar"
                  ? article.category.title_ar
                  : article.category.title_en
              }
              tags={article.tags}
              coverImage={article.image}
            />

            <div className="my-8 border-t border-border" />

            <ArticleContent content={article.content} />

            <div className="my-8 border-t border-border" />

            <ShareButtons title={article.title} url={pageUrl} />

            <div className="my-12 border-t border-border" />

            <RelatedArticles articles={relatedArticles} />

            <div className="my-12 border-t border-border" />

            <CommentsSection />
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <BlogSidebar
              categories={categories}
              tags={tags}
              recentArticles={relatedArticles}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
