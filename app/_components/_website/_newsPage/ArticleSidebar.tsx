// components/article/ArticleSidebar.tsx
"use client";

import { easeOut, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FaFolder,
  FaTags,
  FaHandsHelping,
  FaHeart,
  FaShare,
  FaEye,
} from "react-icons/fa";
import { Category } from "../../_dashboard/_ProjectPage/type";
import { useLocale } from "@/app/_hooks/useLocale";
import { useTranslation } from "@/app/_hooks/useTranslation";
import LocaleLink from "../../_global/LocaleLink";
import { formatTitle, getIconComponent } from "@/app/_helpers/GlobalHelpers";

interface ArticleSidebarProps {
  categories: Category[];
  tags: Tag[];
  articleStats: {
    viewCount: number;
    shareCount: number;
    likeCount: number;
  };
}

export function ArticleSidebar({
  categories,
  tags,
  articleStats,
}: ArticleSidebarProps) {
  const locale = useLocale();
  const t = useTranslation("soloNewsPage");

  const sidebarVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Article Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FaEye className="text-blue-600" />
            {t.sidebar.article_stats}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <FaEye className="text-gray-500" />
              {t.share}
            </span>
            <Badge variant="outline">{articleStats.viewCount}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <FaShare className="text-green-500" />
              {t.share}
            </span>
            <Badge variant="outline">{articleStats.shareCount}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <FaHeart className="text-red-500" />
              {t.likes}
            </span>
            <Badge variant="outline">{articleStats.likeCount}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Categories Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FaFolder className="text-blue-600" />
            {t.sidebar.categories}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-48 overflow-y-auto overflow-x-hidden">
            {categories.map((category) => {
              const Icon = getIconComponent(category.icon_name);
              return (
                <LocaleLink
                  href={`/news/categories/${formatTitle(
                    locale == "ar" ? category.title_ar : category.title_en
                  )}?newsCategoryId=${category.id}`}
                >
                  <motion.div
                    key={category.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <Icon className="size-6" />
                    <span className="text-sm text-gray-700">
                      {locale == "ar" ? category.title_ar : category.title_en}
                    </span>
                  </motion.div>
                </LocaleLink>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tags Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FaTags className="text-purple-600" />
            {t.sidebar.tags}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <motion.div
                key={tag.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  {tag.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
