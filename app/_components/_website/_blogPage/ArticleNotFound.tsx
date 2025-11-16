"use client";
import React, { useMemo } from "react";
import { motion, spring } from "framer-motion";
import { FaArrowLeft, FaFileExcel } from "react-icons/fa";
import { cn } from "./utils";
import { useLocale } from "@/app/_hooks/useLocale";
import LocaleLink from "../../_global/LocaleLink";

interface Props {
  className?: string;
}

export interface UseArticleNotFoundProps {
  locale: "ar" | "en";
}

const useArticleNotFound = ({ locale }: UseArticleNotFoundProps) => {
  const translations = useMemo(() => {
    const en = {
      title: "Article Not Found",
      description:
        "The article you're looking for doesn't exist or has been moved.",
      buttonText: "Back to Articles",
      searchPrompt: "Try searching for other articles",
    };

    const ar = {
      title: "المقال غير موجود",
      description: "المقال الذي تبحث عنه غير موجود أو تم نقله.",
      buttonText: "العودة إلى المقالات",
      searchPrompt: "حاول البحث عن مقالات أخرى",
    };

    return locale === "ar" ? ar : en;
  }, [locale]);

  return { translations };
};

export const ArticleNotFound: React.FC<Props> = ({ className }) => {
  const locale = useLocale();
  const { translations } = useArticleNotFound({ locale });

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: spring,
        stiffness: 200,
        duration: 0.8,
      },
    },
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div
        className={cn(
          "flex items-center justify-center min-h-[400px] p-6",
          className
        )}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "text-center max-w-md w-full",
            locale === "ar" && "text-right"
          )}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          {/* Icon */}
          <motion.div
            variants={iconVariants}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <FaFileExcel className="w-12 h-12 text-red-500" />
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.3, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute inset-0 bg-red-200 rounded-full -z-10"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold text-gray-900 mb-3"
          >
            {translations.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-gray-600 mb-8 leading-relaxed"
          >
            {translations.description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className={cn(
              "flex gap-4",
              locale === "ar" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <LocaleLink className="w-fit mx-auto" href="/blog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex-1",
                  locale === "ar" && "flex-row-reverse"
                )}
              >
                <FaArrowLeft className={locale === "ar" ? "rotate-180" : ""} />
                {translations.buttonText}
              </motion.button>
            </LocaleLink>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
