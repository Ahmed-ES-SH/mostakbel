"use client";

import { useLocale } from "@/app/_hooks/useLocale";
import { motion } from "framer-motion";
import { FaCalendar, FaTag } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

interface ArticleHeaderProps {
  title: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  coverImage: string;
}

export function ArticleHeader({
  title,
  author,
  date,
  category,
  tags,
  coverImage,
}: ArticleHeaderProps) {
  const locale = useLocale();
  const isRTL = locale == "ar";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="mb-6 overflow-hidden rounded-lg">
        <motion.img
          src={coverImage}
          alt={title}
          className="h-96 w-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold text-foreground"
          style={{ direction: isRTL ? "rtl" : "ltr" }}
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`flex flex-wrap gap-4 text-sm text-muted-foreground ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <FaUser size={16} />
            <span>by {author}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendar size={16} />
            <span>{date}</span>
          </div>
          <div className="rounded-full bg-primary/10 px-3 py-1 text-primary">
            {category}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={`flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="inline-flex items-center gap-1 rounded-full bg-secondary/50 px-3 py-1 text-xs text-secondary-foreground"
            >
              <FaTag size={12} />
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
