"use client";

import { motion } from "framer-motion";

export function IllustrationSection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative h-96 flex items-center justify-center"
    >
      {/* Decorative paint splashes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute w-48 h-48 bg-linear-to-br from-teal-400 to-teal-600 rounded-full opacity-10 blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute w-40 h-40 bg-linear-to-br from-orange-400 to-orange-500 rounded-full opacity-10 blur-3xl"
      />

      {/* Placeholder illustration */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="relative z-10 text-center"
      >
        <div className="text-6xl mb-4">📦</div>
        <p className="text-gray-600 font-semibold">Ready to Connect?</p>
      </motion.div>
    </motion.div>
  );
}
