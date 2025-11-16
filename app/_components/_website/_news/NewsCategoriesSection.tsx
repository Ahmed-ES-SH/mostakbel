"use client";
import React, { useState } from "react";
import Img from "../../_global/Img";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLocale } from "@/app/_hooks/useLocale";

// Mock data for categories
const mockCategories = [
  {
    title_en: "Technology",
    title_ar: "تكنولوجيا",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
  },
  {
    title_en: "Science",
    title_ar: "علوم",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop",
  },
  {
    title_en: "Health",
    title_ar: "صحة",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
  },
  {
    title_en: "Business",
    title_ar: "أعمال",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
  },
  {
    title_en: "Entertainment",
    title_ar: "ترفيه",
    image:
      "https://images.unsplash.com/photo-1489599809505-f2b4efca97e4?w=300&h=200&fit=crop",
  },
  {
    title_en: "Sports",
    title_ar: "رياضة",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop",
  },
];

export default function NewsCategoriesSection() {
  const locale = useLocale();

  const [selectedCategory, setSelectedCategory] = useState("all");

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
            modules={[Navigation]}
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
            className="px-12"
          >
            {mockCategories.map((category, index) => (
              <SwiperSlide key={index}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full p-4 rounded-lg border-2 transition-colors ${
                    selectedCategory === category.title_en
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.title_en
                        ? "all"
                        : category.title_en
                    )
                  }
                >
                  <div className="aspect-square mb-3 overflow-hidden rounded-md">
                    <Img
                      src={category.image}
                      alt={
                        locale === "ar" ? category.title_ar : category.title_en
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {locale === "ar" ? category.title_ar : category.title_en}
                  </h3>
                </motion.button>
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
