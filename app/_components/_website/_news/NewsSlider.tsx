"use client";
import React, { useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useLocale } from "@/app/_hooks/useLocale";
import { mockNews } from "./mockNews";
import { NewsCard } from "./NewsCard";

export default function NewsSlider() {
  const locale = useLocale();

  // Get latest articles (first 6 articles as latest)
  const latestArticles = useMemo(() => mockNews.slice(0, 6), []);

  return (
    <>
      {/* Latest Articles Swiper */}
      <section className="c-container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            {locale === "ar" ? "أحدث الأخبار" : "Latest News"}
          </h2>

          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                nextEl: ".latest-swiper-button-next",
                prevEl: ".latest-swiper-button-prev",
              }}
              pagination={{
                clickable: true,
                el: ".latest-swiper-pagination",
              }}
              autoplay={{ delay: 5000 }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {latestArticles.map((article) => (
                <SwiperSlide key={article.id}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <NewsCard
                      title={article.title}
                      description={article.description}
                      image={article.image}
                      date={article.date}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <button className="latest-swiper-button-prev absolute top-1/2 -left-4 z-10 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors">
              <FiChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="latest-swiper-button-next absolute top-1/2 -right-4 z-10 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors">
              <FiChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
