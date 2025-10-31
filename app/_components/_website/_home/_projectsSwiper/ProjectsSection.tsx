"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProjectCard, { Project } from "./ProjectCard";
import { projectImages, translations } from "./mockData";
import LocaleLink from "@/app/_components/_global/LocaleLink";

const NavigationButton: React.FC<{
  direction: "prev" | "next";
  className: string;
}> = ({ direction, className }) => (
  <motion.button
    className={`${className} w-14 h-14 rounded-full bg-teal-700 text-white flex items-center justify-center hover:bg-teal-600 transition-all duration-300 shadow-lg z-10`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {direction === "prev" ? (
      <FiChevronLeft size={28} />
    ) : (
      <FiChevronRight size={28} />
    )}
  </motion.button>
);

export default function RecentProjects() {
  const [lang] = useState<"en" | "ar">("en");
  const [isHovered, setIsHovered] = useState(false);
  const t = translations[lang];

  const projects: Project[] = t.projects.map((proj, index) => ({
    id: index + 1,
    title: proj.title,
    category: proj.category,
    ...projectImages[index],
  }));

  return (
    <section className="bg-[#faf8f5] py-20 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <pattern
              id="hands"
              x="0"
              y="0"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M25 10 L25 25 L30 30 L28 35 L26 35 L24 30 L22 35 L20 35 L18 30 L15 25 L15 10"
                stroke="#f59e0b"
                fill="none"
                strokeWidth="1"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#hands)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.p
              className="text-amber-500 font-medium mb-2 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t.sectionLabel}
              <span className="inline-block w-16 h-0.5 bg-amber-500" />
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t.sectionTitle}
            </motion.h2>
          </div>

          <LocaleLink href="/ourwork">
            <motion.button
              className="hidden md:flex items-center gap-2 bg-teal-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-600 transition-all duration-300 shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t.viewAllButton}
            </motion.button>
          </LocaleLink>
        </motion.div>

        {/* Swiper Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Swiper
            dir="ltr"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-16!"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none"
          >
            <NavigationButton
              direction="prev"
              className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 pointer-events-auto"
            />
            <NavigationButton
              direction="next"
              className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 pointer-events-auto"
            />
          </motion.div>
        </motion.div>

        {/* Mobile View All Button */}
        <LocaleLink href="/ourwork">
          <motion.button
            className="md:hidden w-full mt-8 bg-teal-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-600 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.viewAllButton}
          </motion.button>
        </LocaleLink>
      </div>
    </section>
  );
}
