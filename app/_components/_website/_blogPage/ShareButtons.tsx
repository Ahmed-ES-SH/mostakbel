"use client";

import { useLocale } from "@/app/_hooks/useLocale";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const locale = useLocale();
  const t = useTranslation("articlePage");

  const isRTL = locale == "ar";

  const shareLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      color: "hover:text-blue-700",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
      color: "hover:text-green-500",
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap gap-4 rounded-lg border border-border bg-card p-6 ${
        isRTL ? "flex-row-reverse" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold text-foreground">
          {t.article.share}:
        </span>
      </div>
      <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
        {shareLinks.map((link) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.name}
              variants={itemVariants}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl text-muted-foreground transition-colors ${link.color}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              title={link.name}
            >
              <Icon />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}
