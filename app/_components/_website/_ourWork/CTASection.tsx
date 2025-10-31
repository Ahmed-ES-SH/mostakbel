"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/_hooks/useTranslation";

export function CTASection() {
  const t = useTranslation("cta");

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-linear-to-r from-stone-900 via-stone-800 to-stone-900"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-stone-700 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-stone-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
            {t.title}
          </h2>
          <p className="text-xl text-stone-200 mb-8 leading-relaxed">
            {t.description}
          </p>

          <Button className="px-8 py-3 bg-white text-stone-900 hover:bg-stone-100 font-semibold text-lg">
            {t.button}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
