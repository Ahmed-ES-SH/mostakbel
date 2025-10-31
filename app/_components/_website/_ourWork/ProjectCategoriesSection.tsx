"use client";

import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaUsers,
  FaHandHolding,
  FaHeartPulse,
  FaEarthAfrica,
} from "react-icons/fa6";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/app/_hooks/useTranslation";

export function ProjectCategoriesSection() {
  const t = useTranslation("categories");

  const categories = [
    {
      icon: FaGraduationCap,
      title: t.education,
      description: t.educationDesc,
    },
    {
      icon: FaUsers,
      title: t.community,
      description: t.communityDesc,
    },
    {
      icon: FaHandHolding,
      title: t.peacebuilding,
      description: t.peacebuildingDesc,
    },
    {
      icon: FaHeartPulse,
      title: t.health,
      description: t.healthDesc,
    },
    {
      icon: FaEarthAfrica,
      title: t.environment,
      description: t.environmentDesc,
    },
  ];

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6 text-balance">
            {t.title}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-8 h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <Icon className="w-10 h-10 text-stone-900 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-stone-600">{category.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
