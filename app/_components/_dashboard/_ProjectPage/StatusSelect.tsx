// components/ui/StatusSelect.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiCheck, FiAlertCircle } from "react-icons/fi";
import { ProjectStatus } from "./type";

interface StatusOption {
  value: ProjectStatus;
  label: string;
  color: string;
  bgColor: string;
}

interface StatusSelectProps {
  value: ProjectStatus;
  onChange: (value: ProjectStatus) => void;
  error?: string;
}

export const StatusSelect: React.FC<StatusSelectProps> = ({
  value,
  onChange,
  error,
}) => {
  const statusOptions: StatusOption[] = [
    {
      value: "pending",
      label: "قيد الانتظار",
      color: "text-yellow-800",
      bgColor: "bg-yellow-100",
    },
    {
      value: "in_progress",
      label: "قيد التنفيذ",
      color: "text-blue-800",
      bgColor: "bg-blue-100",
    },
    {
      value: "completed",
      label: "مكتمل",
      color: "text-green-800",
      bgColor: "bg-green-100",
    },
    {
      value: "canceled",
      label: "ملغي",
      color: "text-red-800",
      bgColor: "bg-red-100",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <label className="block text-sm font-medium text-gray-700">
        حالة المشروع <span className="text-red-500">*</span>
      </label>

      <div className="grid grid-cols-2 gap-3">
        {statusOptions.map((option) => (
          <motion.button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative p-3 border-2 rounded-lg text-right transition-all duration-200
              ${
                value === option.value
                  ? `border-blue-500 ring-2 ring-blue-200 ${option.bgColor}`
                  : "border-gray-200 bg-white hover:border-gray-300"
              }
            `}
          >
            <span className={`block text-sm font-medium ${option.color}`}>
              {option.label}
            </span>

            {value === option.value && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute left-2 top-2"
              >
                <FiCheck className="text-blue-500 text-lg" />
              </motion.div>
            )}
          </motion.button>
        ))}
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
