"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { categories } from "./mockArticles";

interface BlogCategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function BlogCategories({
  selectedCategory,
  onSelectCategory,
}: BlogCategoriesProps) {
  const t = useTranslation("blog");

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{t.categories}</h3>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              onSelectCategory(selectedCategory === category ? null : category)
            }
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
