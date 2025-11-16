"use client";

import { useLocale } from "@/app/_hooks/useLocale";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { motion } from "framer-motion";
import Image from "next/image";
import { mockArticles } from "./mockArticles";
import LocaleLink from "../../_global/LocaleLink";
import { formatDate, formatTitle } from "@/app/_helpers/GlobalHelpers";
import { ArticleType } from "../../_dashboard/_articles/types";
import Img from "../../_global/Img";

interface props {
  articles: ArticleType[];
}

export default function BlogRecentPosts({ articles }: props) {
  const t = useTranslation("blog");
  const locale = useLocale();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{t.recentPosts}</h3>
      <div className="space-y-3">
        {articles.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex group gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
          >
            <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden">
              <Img
                src={post.image || "/noImage.png"}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <LocaleLink
                href={`/blog/${formatTitle(post.title)}?articleId=${post.id}`}
              >
                <p className="text-sm font-medium group-hover:underline group-hover:text-sky-500 line-clamp-2">
                  {post.title}
                </p>
              </LocaleLink>

              <p className="text-xs text-muted-foreground">
                {formatDate(post.created_at)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
