"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { useTranslation } from "@/app/_hooks/useTranslation";

interface GalleryProps {
  project: any;
}

export default function Gallery({ project }: GalleryProps) {
  const t = useTranslation("projectPage");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="bg-background">
      <div className="c-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-12 text-foreground"
          >
            {t.projectGallery}
          </motion.h2>

          {/* Main Slider */}
          <motion.div
            variants={itemVariants}
            className="mb-8 rounded-lg overflow-hidden border border-border"
          >
            <Swiper
              modules={[Navigation, Pagination, EffectFade]}
              effect="fade"
              navigation
              pagination={{ clickable: true }}
              className="w-full aspect-video"
            >
              {project.gallery.map((image: string, index: number) => (
                <SwiperSlide key={index}>
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Thumbnail Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {project.gallery.map((image: string, index: number) => (
              <motion.img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity border border-border"
                onClick={() => setSelectedImage(image)}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </motion.div>

          {/* Lightbox */}
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={selectedImage}
                alt="Full size"
                className="max-w-4xl max-h-screen object-contain"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
