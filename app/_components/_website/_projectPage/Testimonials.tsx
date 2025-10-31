"use client";

import { useTranslation } from "@/app/_hooks/useTranslation";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

interface TestimonialsProps {
  project: any;
}

export default function Testimonials({ project }: TestimonialsProps) {
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
    <section className="py-16 md:py-24 bg-card">
      <div className="c-container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground text-center"
          >
            {t.testimonials.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            {t.testimonials.description}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {project.testimonials.map((testimonial: any) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="bg-background rounded-lg p-8 border border-border"
              >
                <FaQuoteLeft className="w-6 h-6 text-primary mb-4" />
                <p className="text-foreground/90 mb-6 italic text-pretty">
                  "{testimonial.quote.en}"
                </p>

                <div>
                  <p className="font-bold text-foreground">
                    {testimonial.author.en}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role.en}
                  </p>
                  <p className="text-xs text-primary mt-1">
                    {testimonial.village.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
