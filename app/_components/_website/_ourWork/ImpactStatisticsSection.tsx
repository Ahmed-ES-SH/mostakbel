"use client";

import { motion } from "framer-motion";
import { FaUsers, FaHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaGlobeAmericas } from "react-icons/fa";
import { useTranslation } from "@/app/_hooks/useTranslation";

export function ImpactStatisticsSection() {
  const t = useTranslation("impact");
  const [counts, setCounts] = useState({
    projects: 0,
    beneficiaries: 0,
    volunteers: 0,
    communities: 0,
  });

  const stats = [
    {
      icon: FaCheckCircle,
      label: t.projects,
      value: 50,
      suffix: "+",
    },
    {
      icon: FaUsers,
      label: t.beneficiaries,
      value: 10000,
      suffix: "+",
    },
    {
      icon: FaHeart,
      label: t.volunteers,
      value: 500,
      suffix: "+",
    },
    {
      icon: FaGlobeAmericas,
      label: t.communities,
      value: 25,
      suffix: "+",
    },
  ];

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      return setTimeout(() => {
        const counter = setInterval(() => {
          setCounts((prev) => ({
            ...prev,
            [Object.keys(prev)[index]]: Math.min(
              Object.values(prev)[index] + Math.ceil(stat.value / 50),
              stat.value
            ),
          }));
        }, 30);
        return () => clearInterval(counter);
      }, index * 100);
    });

    return () => intervals.forEach((interval) => clearTimeout(interval));
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
            {t.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const countKey = Object.keys(counts)[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Icon className="w-12 h-12 mx-auto mb-4 text-stone-300" />
                <div className="text-5xl font-bold mb-2">
                  {counts[countKey as keyof typeof counts]}
                  {stat.suffix}
                </div>
                <p className="text-stone-300">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
