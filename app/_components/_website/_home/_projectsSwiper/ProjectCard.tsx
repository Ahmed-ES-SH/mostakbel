"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LocaleLink from "@/app/_components/_global/LocaleLink";
import { formatTitle } from "@/app/_helpers/GlobalHelpers";

// Types
export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  hoverImage: string;
}

interface props {
  project: Project;
}

export default function ProjectCard({ project }: props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group min-h-[400px] rounded-3xl overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={isHovered ? "hover" : "default"}
          src={isHovered ? project.hoverImage : project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      <motion.div
        className="absolute bottom-0 left-0 right-0 p-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="inline-block text-white bg-light-primary-color  px-6 py-2 rounded-full text-sm font-semibold mb-3"
          whileHover={{ scale: 1.05 }}
        >
          {project.category}
        </motion.div>
        <LocaleLink
          href={`/ourwork/${formatTitle(project.title)}?projectId=${
            project.id
          }`}
        >
          <h3 className="text-white group-hover:underline group-hover:text-light-primary-color cursor-pointer text-2xl font-bold">
            {project.title}
          </h3>
        </LocaleLink>
      </motion.div>

      <motion.div
        className="absolute inset-0 border-4 border-amber-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={{ scale: 0.95 }}
        whileHover={{ scale: 1 }}
      />
    </motion.div>
  );
}
