"use client";
// components/ui/TextAreaField.tsx
import React from "react";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  dir?: "ltr" | "rtl";
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  rows = 4,
  dir = "rtl",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          dir={dir}
          className={`
            w-full px-3 py-2 border rounded-lg transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            resize-vertical
            ${error ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"}
            ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          `}
        />

        {error && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-3 top-3"
          >
            <FiAlertCircle className="text-red-500 text-lg" />
          </motion.div>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 text-sm flex items-center gap-1"
        >
          <FiAlertCircle className="text-sm" />
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};
