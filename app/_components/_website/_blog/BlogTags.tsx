"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { useState } from "react";

interface BlogTagsProps {
  tags: Tag[];
}

export default function BlogTags({ tags }: BlogTagsProps) {
  const t = useTranslation("blog");

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  return (
    <div className="space-y-4 max-h-32 overflow-x-hidden overflow-y-auto">
      <h3 className="font-semibold text-lg">{t.tags}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <motion.div
            key={`tag-${tag.id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1 }}
          >
            <Badge
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
            >
              {tag.slug}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
