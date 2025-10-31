"use client";

import { useTranslation } from "@/app/_hooks/useTranslation";
import { motion } from "framer-motion";
import { FaHandshake, FaBook, FaLeaf } from "react-icons/fa";

export function AboutProjectsSection() {
  const t = useTranslation("aboutProjects");

  const features = [
    {
      icon: FaHandshake,
      title: t.peace,
      description: t.peaceDesc,
    },
    {
      icon: FaBook,
      title: t.education,
      description: t.educationDesc,
    },
    {
      icon: FaLeaf,
      title: t.development,
      description: t.developmentDesc,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
          <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-8 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
              >
                <Icon className="w-12 h-12 text-stone-900 mb-4" />
                <h3 className="text-xl font-semibold text-stone-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-stone-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
