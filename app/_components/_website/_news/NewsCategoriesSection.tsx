"use client";
import React, { useState } from "react";
import Img from "../../_global/Img";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLocale } from "@/app/_hooks/useLocale";
import { Category } from "../../_dashboard/_ProjectPage/type";
import CategoryCard from "./CategoryCard";

interface props {
  categories: Category[];
}

export default function NewsCategoriesSection({ categories }: props) {
  const locale = useLocale();

  return (
    <>
      {/* Categories Swiper */}
      <section className="c-container py-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            {locale === "ar" ? "الأقسام" : "Categories"}
          </h2>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={2}
            navigation={{
              nextEl: ".categories-swiper-button-next",
              prevEl: ".categories-swiper-button-prev",
            }}
            breakpoints={{
              480: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="px-12"
          >
            {categories &&
              categories.length > 0 &&
              categories.map((category, index) => (
                <SwiperSlide key={index}>
                  <CategoryCard
                    category={category}
                    locale={locale}
                    key={`news-category-${index}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>

          {/* Categories Navigation */}
          <button className="categories-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10">
            <FiChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button className="categories-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10">
            <FiChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </motion.div>
      </section>
    </>
  );
}
