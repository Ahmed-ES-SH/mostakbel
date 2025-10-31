"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { useLocale } from "@/app/_hooks/useLocale";
import { mockArticles } from "./mockArticles";
import { BlogCard } from "./BlogCard";
import { BlogSidebar } from "./BlogSidebar";
import HeroBanner from "../../_global/_heroBanner/HeroBanner";

export default function BlogPageComponent() {
  const t = useTranslation("blog");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter articles based on search, category, and tags
  const filteredArticles = useMemo(() => {
    return mockArticles.filter((article) => {
      const title = article.title[locale as "en" | "ar"].toLowerCase();
      const description =
        article.description[locale as "en" | "ar"].toLowerCase();
      const searchLower = searchQuery.toLowerCase();

      // Search filter
      const matchesSearch =
        searchLower === "" ||
        title.includes(searchLower) ||
        description.includes(searchLower);

      // Category filter
      const matchesCategory =
        selectedCategory === null || article.category === selectedCategory;

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => article.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchQuery, selectedCategory, selectedTags, locale]);

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <HeroBanner imageSrc="/website/slide1.jpg" />
      <div className="c-container mx-auto px-4 py-12">
        {/* Header */}

        {/* Main Layout */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-4 relative h-full gap-8 ${
            locale === "ar" ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* Sidebar - Right for Arabic, Left for English */}
          <div className={`lg:col-span-1 lg:sticky lg:top-24 lg:left-0`}>
            <BlogSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedTags={selectedTags}
              onTagChange={handleTagChange}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <BlogCard key={article.id} article={article} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-96 text-center"
              >
                <div>
                  <p className="text-lg text-muted-foreground mb-2">
                    {locale === "en"
                      ? "No articles found"
                      : "لم يتم العثور على مقالات"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {locale === "en"
                      ? "Try adjusting your filters"
                      : "حاول تعديل المرشحات الخاصة بك"}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
