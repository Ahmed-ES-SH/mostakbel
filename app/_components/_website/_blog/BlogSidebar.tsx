"use client";

import { ArticleType } from "../../_dashboard/_articles/types";
import { Category } from "../../_dashboard/_ProjectPage/type";
import BlogCategories from "./BlogCategories";
import BlogRecentPosts from "./BlogRecentPosts";
import BlogSearch from "./BlogSearch";
import BlogTags from "./BlogTags";

interface BlogSidebarProps {
  categories: Category[];
  tags: Tag[];
  recentArticles: ArticleType[];
}

export function BlogSidebar({
  categories,
  tags,
  recentArticles,
}: BlogSidebarProps) {
  return (
    <aside className="space-y-8 p-6 bg-card sticky top-24 left-0  rounded-lg border border-border">
      <BlogSearch />
      <BlogCategories categories={categories} />
      <BlogTags tags={tags} />
      <BlogRecentPosts articles={recentArticles} />
    </aside>
  );
}
