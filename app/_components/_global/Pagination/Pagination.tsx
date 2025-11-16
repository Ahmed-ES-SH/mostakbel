"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isRTL?: boolean;
  t: Record<string, string>;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isRTL = false,
  t,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center gap-2 py-8"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
      </button>

      <div className="flex gap-1">
        {pages.map((page) => (
          <motion.button
            key={page}
            whileHover={{ scale: 1.05 }}
            onClick={() => onPageChange(page)}
            className={`min-w-10 h-10 rounded-lg font-medium transition-all ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </motion.button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
      </button>

      <span className="ml-4 text-sm text-gray-600">
        {t.pagination} {currentPage} {t.of} {totalPages}
      </span>
    </motion.div>
  );
}
