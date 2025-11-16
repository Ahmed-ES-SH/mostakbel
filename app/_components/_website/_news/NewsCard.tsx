"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Img from "../../_global/Img";
import LocaleLink from "../../_global/LocaleLink";
import { formatTitle } from "@/app/_helpers/GlobalHelpers";

interface NewsCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  isRTL?: boolean;
}

export function NewsCard({
  id,
  title,
  description,
  image,
  date,
  isRTL,
}: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <Img
          src={image ?? "/noImage.png"}
          errorSrc="/noImage.png"
          alt={title}
          className="object-cover h-full w-full  group-hover:scale-105 transition-transform duration-300"
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
            <span>{date}</span>
          </div>

          <LocaleLink href={`/news/${formatTitle(title)}?newsId=${id}`}>
            <button className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              <span>{isRTL ? "إقرأ المزيد" : "Read More"}</span>
              <ArrowRight
                className={`w-4 h-4 transition-transform ${
                  isRTL ? "rotate-180" : ""
                }`}
              />
            </button>
          </LocaleLink>
        </div>
      </div>
    </motion.div>
  );
}
