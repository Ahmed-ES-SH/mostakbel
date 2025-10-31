"use client";

import { useTranslation } from "@/app/_hooks/useTranslation";
import { easeOut, motion } from "framer-motion";
import Img from "../../_global/Img";
import Link from "next/link";

export function OurWorkHero() {
  const t = useTranslation("heroProjects");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const targetId = e.currentTarget.getAttribute("href")?.replace("#", "");
    const element = document.getElementById(targetId!);
    if (element) {
      e.preventDefault(); // prevent default navigation
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${targetId}`); // optional: update URL
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-stone-50 via-stone-100 to-stone-50">
      <Img
        src="/website/slide2.jpg"
        className="w-full h-full object-cover absolute top-0 left-0 brightness-60"
      />

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-light-primary-color mb-6 text-balance"
          variants={itemVariants}
        >
          {t.title}
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-white mb-8 text-balance leading-relaxed"
          variants={itemVariants}
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link
            href="#projects-section"
            onClick={handleScroll}
            className="px-8 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium"
          >
            {t.btn}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
