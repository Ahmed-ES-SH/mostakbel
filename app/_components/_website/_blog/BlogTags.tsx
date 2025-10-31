"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { allTags } from "./mockArticles";

interface BlogTagsProps {
  selectedTags: string[];
  onSelectTag: (tag: string) => void;
}

export default function BlogTags({ selectedTags, onSelectTag }: BlogTagsProps) {
  const t = useTranslation("blog");
  // Get random 8 tags for display
  const displayTags = allTags.sort(() => Math.random() - 0.5).slice(0, 8);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{t.tags}</h3>
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag, index) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1 }}
          >
            <Badge
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onSelectTag(tag)}
            >
              {tag}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
