"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
  isRTL?: boolean;
}

export function NewsCard({
  title,
  description,
  image,
  date,
  isRTL,
}: NewsCardProps) {
  const formattedDate = new Date(date).toLocaleDateString(
    isRTL ? "ar-SA" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5 flex flex-col grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 grow">
          {description}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>

          <button className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
            <span>Read More</span>
            <ArrowRight
              className={`w-4 h-4 transition-transform ${
                isRTL ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
