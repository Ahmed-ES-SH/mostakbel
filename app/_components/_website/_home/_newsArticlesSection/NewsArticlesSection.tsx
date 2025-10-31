"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ArticleCard from "./ArticleCard";
import NewsHeader from "./NewsHeader";
import { useLocale } from "@/app/_hooks/useLocale";
import { articlesData } from "./mockArticles";

export default function NewsArticlesSection() {
  const locale = useLocale();
  const [isHovered, setIsHovered] = useState(false);
  const swiperRef = useRef<any | null>(null);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <NewsHeader texts={articlesData} />

        <motion.div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            {articlesData.articles.map((article) => (
              <SwiperSlide key={article.id}>
                <ArticleCard
                  article={article}
                  readMore={articlesData.readMore[locale]}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Always render buttons (so refs / event handlers exist), but hide them when not hovered.
              This avoids AnimatePresence removing them from DOM (which caused refs to be null). */}
          <motion.button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous"
            className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-teal-700 text-teal-700 hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all
              ${locale === "ar" ? "right-4" : "left-4"}
              ${
                isHovered
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            whileHover={{ scale: 1.05 }}
          >
            {locale === "ar" ? (
              <FaChevronRight size={18} />
            ) : (
              <FaChevronLeft size={18} />
            )}
          </motion.button>

          <motion.button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next"
            className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-teal-700 text-teal-700 hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all
              ${locale === "ar" ? "left-4" : "right-4"}
              ${
                isHovered
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            whileHover={{ scale: 1.05 }}
          >
            {locale === "ar" ? (
              <FaChevronLeft size={18} />
            ) : (
              <FaChevronRight size={18} />
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
