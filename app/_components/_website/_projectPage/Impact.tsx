"use client";

import { useTranslation } from "@/app/_hooks/useTranslation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import * as Icons from "react-icons/fa";

interface ImpactProps {
  project: any;
}

function AnimatedCounter({ end }: { end: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count.toLocaleString()}</span>;
}

export default function Impact({ project }: ImpactProps) {
  const t = useTranslation("projectPage");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section className="pb-20 bg-card">
      <div className="c-container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground"
          >
            {t.impact.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground mb-12 max-w-2xl"
          >
            {t.impact.description}
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.impact.map((stat: any, index: number) => {
              const IconComponent = (Icons as any)[stat.icon];

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-background rounded-lg p-6 border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    {IconComponent && (
                      <IconComponent className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    <AnimatedCounter end={stat.value} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {stat.label.en}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
