"use client";
import React, { useState } from "react";
import { useLocale } from "@/app/_hooks/useLocale";
import { motion } from "framer-motion";
import { mockNews } from "./mockNews";
import { NewsCard } from "./NewsCard";
import PaginationCompoennt from "../../_global/Pagination";
import { FaSearch } from "react-icons/fa";

const ITEMS_PER_PAGE = 12;

export default function NewsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const totalPages = Math.ceil(mockNews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = mockNews.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const locale = useLocale();

  return (
    <>
      {/* Articles List with Pagination */}
      <section className="c-container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {locale === "ar" ? "جميع الأخبار" : "All News"}
            </h2>

            {/* Search Input */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder={locale === "ar" ? "بحث..." : "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaSearch />
              </div>
            </div>
          </div>

          {paginatedArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {paginatedArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    title={article.title}
                    description={article.description}
                    image={article.image}
                    date={article.date}
                  />
                ))}
              </div>

              <PaginationCompoennt
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-64"
            >
              <p className="text-gray-500 text-lg">
                {locale === "ar"
                  ? "لم يتم العثور على نتائج"
                  : "No articles found"}
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </>
  );
}
