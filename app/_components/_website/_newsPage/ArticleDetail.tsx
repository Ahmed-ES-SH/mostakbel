"use client";

import { easeOut, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FaCalendarAlt,
  FaUser,
  FaFolder,
  FaShareAlt,
  FaHeart,
} from "react-icons/fa";
import { useState } from "react";
import { ArticleType } from "../../_dashboard/_articles/types";
import { Comment, CommentsSection } from "./CommentsSection";
import { ArticleSidebar } from "./ArticleSidebar";
import { Category } from "../../_dashboard/_ProjectPage/type";
import Img from "../../_global/Img";
import { useLocale } from "@/app/_hooks/useLocale";
import { formatDate } from "@/app/_helpers/GlobalHelpers";
import { useTranslation } from "@/app/_hooks/useTranslation";

interface ArticleDetailProps {
  article: ArticleType;
  categories: Category[];
  tags: Tag[];
  comments: Comment[];
}

export default function ArticleDetail({
  article,
  categories,
  tags,
  comments,
}: ArticleDetailProps) {
  const locale = useLocale();
  const t = useTranslation("soloNewsPage");

  const [isLiked, setIsLiked] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(article.like_count);

  const handleLike = () => {
    if (isLiked) {
      setCurrentLikeCount((prev) => prev - 1);
    } else {
      setCurrentLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ الرابط إلى الحافظة");
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen lg:mt-32 bg-gray-50 py-8"
    >
      <div className="c-container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.article variants={itemVariants}>
              <Card className="overflow-hidden">
                {/* Article Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="relative h-96 overflow-hidden"
                >
                  <Img
                    src={article.image ?? "/noImage.png"}
                    errorSrc="/noImage.png"
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                      <FaFolder className="ml-1 text-sm" />
                      {locale == "ar"
                        ? article.category.title_ar
                        : article.category.title_en}
                    </Badge>
                  </div>
                </motion.div>

                <CardContent className="p-8">
                  {/* Article Meta */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600"
                  >
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-blue-600" />
                      <span>{formatDate(article.published_at)}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FaUser className="text-green-600" />
                      <span>{article.author.name}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FaHeart className="text-red-600" />
                      <span>
                        {currentLikeCount} {t.likes}
                      </span>
                    </div>
                  </motion.div>

                  {/* Article Title */}
                  <motion.h1
                    variants={itemVariants}
                    className="text-4xl font-bold text-gray-900 mb-4 leading-tight"
                  >
                    {article.title}
                  </motion.h1>

                  {/* Article Excerpt */}
                  <motion.p
                    variants={itemVariants}
                    className="text-xl text-gray-600 mb-6 leading-relaxed"
                  >
                    {article.excerpt}
                  </motion.p>

                  {/* Article Tags */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap gap-2 mb-8"
                  >
                    {article.tags.map((tag) => (
                      <Badge key={tag.id} variant="outline" className="text-sm">
                        {tag.name}
                      </Badge>
                    ))}
                  </motion.div>

                  {/* Article Content */}
                  <motion.div
                    variants={itemVariants}
                    className="prose prose-lg max-w-none mb-8"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  {/* Action Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-4 pt-6 border-t border-gray-200"
                  >
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isLiked
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <FaHeart className={isLiked ? "fill-current" : ""} />
                      <span>{isLiked ? t.liked : t.like}</span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <FaShareAlt />
                      <span>{t.share}</span>
                    </button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.article>

            {/* Comments Section */}
            <motion.div variants={itemVariants} className="mt-8">
              <CommentsSection comments={comments} articleId={article.id} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ArticleSidebar
              categories={categories}
              tags={tags}
              articleStats={{
                viewCount: article.view_count ?? 1,
                shareCount: article.share_count ?? 1,
                likeCount: currentLikeCount ?? 1,
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
