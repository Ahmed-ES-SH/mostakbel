"use client";
// components/ui/Toggle.tsx
import React from "react";
import { motion } from "framer-motion";

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
    >
      <span className="text-sm font-medium text-gray-700">{label}</span>

      <button
        type="button"
        onClick={() => !disabled && onChange(!enabled)}
        disabled={disabled}
        className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${enabled ? "bg-blue-600" : "bg-gray-200"}
          ${disabled ? "cursor-not-allowed opacity-50" : ""}
        `}
      >
        <span className="sr-only">{label}</span>
        <motion.span
          animate={{ x: enabled ? -20 : 0 }}
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
          `}
        />
      </button>
    </motion.div>
  );
};
