"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface ContactInfoCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  description?: string;
  delay?: number;
}

export function ContactInfoCard({
  icon,
  title,
  value,
  description,
  delay = 0,
}: ContactInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex items-start gap-4"
    >
      <div className="shrink-0 w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{value}</p>
        {description && (
          <p className="text-gray-500 text-xs mt-1">{description}</p>
        )}
      </div>
    </motion.div>
  );
}
