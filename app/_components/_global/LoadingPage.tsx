"use client";
import React from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { FiLoader, FiCoffee, FiCloud, FiStar } from "react-icons/fi";

interface LoadingPageProps {
  logo?: string | null;
  message?: string;
  showSpinner?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  logo = null,
  message = "جاري التحميل...",
  showSpinner = true,
  backgroundColor = "bg-white",
  textColor = "text-gray-800",
}) => {
  // تأثيرات متحركة للعناصر
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        rotate: {
          duration: 1,
          repeat: Infinity,
          ease: "linear" as any,
        },
      },
    },
  };

  const floatingIconsVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          ease: easeInOut,
        },
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${backgroundColor} ${textColor}`}
        style={{ zIndex: 9999 }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
      >
        {/* أيقونات عائمة في الخلفية */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <motion.div
            className="absolute top-1/4 left-1/4"
            variants={floatingIconsVariants}
            animate="float"
          >
            <FiCloud size={40} />
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-1/4"
            variants={floatingIconsVariants}
            animate="float"
            style={{ animationDelay: "0.5s" }}
          >
            <FiStar size={30} />
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 left-1/3"
            variants={floatingIconsVariants}
            animate="float"
            style={{ animationDelay: "1s" }}
          >
            <FiCoffee size={35} />
          </motion.div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
          {/* منطقة اللوجو */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            {logo ? (
              <motion.img
                src={logo}
                alt="شعار التطبيق"
                className="w-24 h-24 object-contain mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              />
            ) : (
              <motion.div
                className="w-24 h-24 bg-linear-to-br from-primary-color to-light-primary-color rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <FiStar className="text-white text-3xl" />
              </motion.div>
            )}
          </motion.div>

          {/* الرسالة ونسبة التحميل */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <motion.h1
              className="text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {message}
            </motion.h1>

            {/* شريط التقدم المتحرك */}
            <motion.div
              className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                className="h-full bg-linear-to-r from-primary-color to-light-primary-color"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </motion.div>
          </motion.div>

          {/* أيقونة التحميل المتحركة */}
          {showSpinner && (
            <motion.div variants={itemVariants} className="mt-4">
              <motion.div variants={spinnerVariants} animate="animate">
                <FiLoader className="text-3xl text-blue-600" />
              </motion.div>
            </motion.div>
          )}

          {/* نقاط متحركة إضافية */}
          <motion.div variants={itemVariants} className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* تذييل الصفحة */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 text-center"
        >
          <p className="text-sm text-gray-500">الرجاء الانتظار...</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingPage;
