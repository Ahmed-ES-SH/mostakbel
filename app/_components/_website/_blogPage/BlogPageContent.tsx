"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/app/_hooks/useLocale";
import { directionMap } from "@/app/constants/_website/Global";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleContent } from "./ArticleContent";
import { ShareButtons } from "./ShareButtons";
import { RelatedArticles } from "./RelatedArticles";
import { CommentsSection } from "./CommentsSection";
import { BlogSidebar } from "../_blog/BlogSidebar";

// Sample article data
const articleData = {
  title: "The Future of Web Development: Trends and Technologies",
  author: "Sarah Johnson",
  date: "October 30, 2025",
  category: "Technology",
  tags: ["React", "Next.js", "Web Development", "TypeScript"],
  coverImage:
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNoYXJpdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
  content: `
    <h2>Introduction</h2>
    <p>Web development is constantly evolving, with new technologies and frameworks emerging regularly. In this article, we'll explore the most significant trends shaping the future of web development.</p>
    
    <h2>1. Server-Side Rendering and Static Generation</h2>
    <p>Modern frameworks like Next.js have revolutionized how we think about rendering. Server-side rendering (SSR) and static site generation (SSG) provide better performance and SEO benefits compared to traditional client-side rendering.</p>
    
    <h2>2. TypeScript Adoption</h2>
    <p>TypeScript continues to gain popularity in the web development community. Its strong typing system helps catch errors early and improves code maintainability, making it an essential tool for large-scale applications.</p>
    
    <h2>3. Component-Based Architecture</h2>
    <p>Component-based design has become the standard in modern web development. This approach promotes code reusability, maintainability, and scalability across projects.</p>
    
    <h2>4. Performance Optimization</h2>
    <p>Performance is crucial for user experience. Techniques like code splitting, lazy loading, and image optimization are becoming standard practices in web development.</p>
    
    <h2>Conclusion</h2>
    <p>The future of web development is exciting, with continuous innovation and improvement. Staying updated with these trends will help developers build better, faster, and more maintainable applications.</p>
  `,
};

const relatedArticles = [
  {
    id: "1",
    title: "Getting Started with Next.js 15",
    excerpt: "Learn the basics of Next.js and build your first application.",
    image:
      "https://plus.unsplash.com/premium_photo-1669530958591-15cbad83785b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV4dGpzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    category: "Tutorial",
    date: "Oct 28, 2025",
  },
  {
    id: "2",
    title: "TypeScript Best Practices",
    excerpt: "Master TypeScript with these essential best practices.",
    image:
      "https://images.unsplash.com/photo-1691440599496-4ae4378799eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFR5cGVTY3JpcHR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
    category: "Guide",
    date: "Oct 25, 2025",
  },
  {
    id: "3",
    title: "React Performance Tips",
    excerpt: "Optimize your React applications for better performance.",
    image:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmVhY3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
    category: "Tips",
    date: "Oct 22, 2025",
  },
];

function BlogPageContent() {
  const locale = useLocale();
  const isRTL = locale == "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div
      className="min-h-screen lg:mt-32 mt-12 bg-background"
      dir={directionMap[locale]}
    >
      <div className="c-container  px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <ArticleHeader
              title={articleData.title}
              author={articleData.author}
              date={articleData.date}
              category={articleData.category}
              tags={articleData.tags}
              coverImage={articleData.coverImage}
            />

            <div className="my-8 border-t border-border" />

            <ArticleContent content={articleData.content} />

            <div className="my-8 border-t border-border" />

            <ShareButtons title={articleData.title} url={pageUrl} />

            <div className="my-12 border-t border-border" />

            <RelatedArticles articles={relatedArticles} />

            <div className="my-12 border-t border-border" />

            <CommentsSection />
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <BlogSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory as any}
              selectedTags={selectedTags}
              onTagChange={handleTagChange}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ArticlePageComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPageContent />
    </Suspense>
  );
}
