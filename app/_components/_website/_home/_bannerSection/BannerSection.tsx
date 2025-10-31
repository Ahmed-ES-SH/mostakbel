// components/open-door-section.tsx
"use client";

import { useLocale } from "@/app/_hooks/useLocale";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { easeOut, motion } from "framer-motion";
import { FaDoorOpen, FaHandsHelping, FaUsers } from "react-icons/fa";

export function BannerSection() {
  const locale = useLocale();
  const isRTL = locale == "ar";
  const t = useTranslation("openDoor");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  // ✅ Array of cards (static content extracted)
  const cards = [
    {
      icon: FaDoorOpen,
      color: "text-blue-500",
      bg: "bg-light-primary-color",
      title: t.alwaysOpen,
      description: t.openDescription,
      textColor: "text-gray-100",
    },
    {
      icon: FaUsers,
      color: "text-green-500",
      bg: "bg-white",
      title: t.morePeople,
      description: t.peopleDescription,
      textColor: "text-gray-800",
    },
    {
      icon: FaHandsHelping,
      color: "text-orange-500",
      bg: "bg-white",
      title: t.supportEachOther,
      description: t.supportDescription,
      textColor: "text-gray-800",
    },
  ];

  return (
    <section className="w-full bg-primary-color pt-16 pb-4 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <FaDoorOpen className="text-6xl text-white" />
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: [0, 15, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <FaUsers className="text-2xl text-green-500" />
              </motion.div>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-light-primary-color mb-4">
            {t.title}
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`text-center p-6 bg-light-primary-color hover:bg-white cursor-pointer group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex justify-center mb-4">
                <card.icon className={`text-4xl ${card.color}`} />
              </div>
              <h3
                className={`text-xl font-semibold text-gray-100 group-hover:text-gray-900 duration-300 mb-3`}
              >
                {card.title}
              </h3>
              <p
                className={`leading-relaxed text-white group-hover:text-gray-800 duration-300`}
              >
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
