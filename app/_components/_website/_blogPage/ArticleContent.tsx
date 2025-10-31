"use client";

import { motion } from "framer-motion";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="prose prose-lg max-w-none"
    >
      <motion.div
        variants={itemVariants}
        className="space-y-6 text-foreground"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </motion.div>
  );
}
