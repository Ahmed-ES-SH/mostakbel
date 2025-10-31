"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaChevronUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollY = useMotionValue(0);

  // Update scroll value on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / docHeight;
      scrollY.set(scrollProgress);
      setIsVisible(scrollTop > 200); // show button after some scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  // Map scroll progress [0 → 1] to stroke length
  const circumference = 2 * Math.PI * 28; // circle radius = 28
  const strokeDashoffset = useTransform(scrollY, [0, 1], [circumference, 0]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition"
    >
      {/* Circular progress border */}
      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 64 64">
        {/* Background circle */}
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="#ddd"
          strokeWidth="4"
          fill="none"
        />
        {/* Animated progress circle */}
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          stroke="url(#gradient)"
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
        />
        {/* Gradient for color */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1c5931" /> {/* yellow-400 */}
            <stop offset="100%" stopColor="#0ac5b2" /> {/* yellow-500 */}
          </linearGradient>
        </defs>
      </svg>

      {/* Arrow icon */}
      <FaChevronUp className="text-primary-color text-xl relative z-10" />
    </motion.button>
  );
}
