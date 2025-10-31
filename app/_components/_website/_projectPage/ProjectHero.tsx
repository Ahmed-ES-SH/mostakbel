"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/_hooks/useTranslation";

interface HeroProps {
  project: any;
}

export default function ProjectHero({ project }: HeroProps) {
  const t = useTranslation("projectPage");
  const tProject = (key: string) => project[key]?.en || project[key]?.ar || "";

  return (
    <section className="relative h-screen md:h-screen flex flex-col justify-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={project.mainImage || "/placeholder.svg"}
          alt={tProject("title")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 c-container mx-auto px-4 py-12 md:py-20"
      >
        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6 md:mb-8"
        >
          <div className="flex items-center gap-2 text-white">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span className="text-sm md:text-base">{tProject("location")}</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <FaTag className="w-4 h-4" />
            <span className="text-sm md:text-base">{tProject("category")}</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8 max-w-3xl text-balance"
        >
          {tProject("title")}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-xl text-gray-100 mb-8 md:mb-12 max-w-2xl text-pretty"
        >
          {tProject("description")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <Button size="lg" className="bg-primary-color hover:bg-green-500">
            {t.hero.donateNow}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-light-primary-color hover:text-white duration-300 bg-transparent"
          >
            {t.hero.learnMore}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
