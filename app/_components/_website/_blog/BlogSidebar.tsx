"use client";

import BlogCategories from "./BlogCategories";
import BlogRecentPosts from "./BlogRecentPosts";
import BlogSearch from "./BlogSearch";
import BlogTags from "./BlogTags";

interface BlogSidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedTags: string[];
  onTagChange: (tag: string) => void;
}

export function BlogSidebar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagChange,
}: BlogSidebarProps) {
  return (
    <aside className="space-y-8 p-6 bg-card sticky top-24 left-0  rounded-lg border border-border">
      <BlogSearch onSearch={onSearchChange} />
      <BlogCategories
        selectedCategory={selectedCategory}
        onSelectCategory={onCategoryChange}
      />
      <BlogTags selectedTags={selectedTags} onSelectTag={onTagChange} />
      <BlogRecentPosts />
    </aside>
  );
}
