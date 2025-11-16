"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaLock, FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      {/* أيقونة القفل */}
      <motion.div
        initial={{ scale: 0, rotate: -45, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-red-100 text-red-600 p-6 rounded-full shadow-md mb-6"
      >
        <FaLock className="text-5xl" />
      </motion.div>

      {/* العنوان */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-gray-800 mb-3 text-center"
      >
        الوصول ممنوع
      </motion.h1>

      {/* النص التوضيحي */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600 text-center max-w-md leading-relaxed mb-8"
      >
        ليس لديك الصلاحيات الكافية للوصول إلى هذه الصفحة. يرجى مراجعة المسؤول أو
        العودة إلى الصفحة الرئيسية.
      </motion.p>

      {/* الأزرار */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex gap-4"
      >
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2">
            <FaHome className="text-lg" />
            العودة للرئيسية
          </Button>
        </Link>

        <Button
          onClick={() => window.history.back()}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-6 py-2 rounded-lg"
        >
          الرجوع للخلف
        </Button>
      </motion.div>
    </div>
  );
}
