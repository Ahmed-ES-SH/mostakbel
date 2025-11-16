"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  width?: string;
};

export const Modal: React.FC<Props> = ({
  show,
  onClose,
  children,
  title,
  width = "max-w-2xl",
}) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-99999 backdrop-blur-md"
          />

          <div className="min-h-screen flex items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className={`fixed inset-0 z-99999 flex items-center justify-center pt-20`}
            >
              <div className={`w-full ${width} mx-4`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h3 className="text-lg font-medium">{title}</h3>
                    <button
                      onClick={onClose}
                      className="px-2 py-1 rounded hover:bg-gray-100"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="p-4">{children}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
