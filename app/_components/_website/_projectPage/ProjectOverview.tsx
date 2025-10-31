"use client";

import { useTranslation } from "@/app/_hooks/useTranslation";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

interface OverviewProps {
  project: any;
}

export default function Overview({ project }: OverviewProps) {
  const t = useTranslation("projectPage");
  const tProject = (key: string) => project[key]?.en || project[key]?.ar || "";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
    <section className="py-16 md:py-24 bg-background">
      <div className="c-container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-12 text-foreground"
          >
            {t.overview.title}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Description */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <p className="text-base md:text-lg text-foreground/80 mb-6 leading-relaxed text-pretty">
                {tProject("longDescription")}
              </p>
            </motion.div>

            {/* Meta Info */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <FaCalendarAlt className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {t.overview.startDate}
                  </span>
                </div>
                <p className="font-medium text-foreground">
                  {new Date(project.startDate).toLocaleDateString("en-US")}
                </p>
              </div>

              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <FaCalendarAlt className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {t.overview.endDate}
                  </span>
                </div>
                <p className="font-medium text-foreground">
                  {new Date(project.endDate).toLocaleDateString("en-US")}
                </p>
              </div>

              <div className="bg-light-primary-color rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <FaClock className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-white">
                    {t.overview.status}
                  </span>
                </div>
                <p className="font-medium text-secondary">
                  {tProject("status")}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
