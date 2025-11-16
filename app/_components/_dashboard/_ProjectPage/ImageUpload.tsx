// components/ui/ImageUpload.tsx
"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FiUpload, FiImage, FiX } from "react-icons/fi";
import Img from "../../_global/Img";

interface ImageUploadProps {
  imageUrl: string | File;
  onImageChange: (url: string) => void;
  onImageRemove: () => void;
  label: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  imageUrl,
  onImageChange,
  onImageRemove,
  label,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // في التطبيق الحقيقي، هنا ستقوم برفع الصورة إلى السيرفر
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(file as any);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const currentUrl =
    imageUrl instanceof File ? URL.createObjectURL(imageUrl) : imageUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {imageUrl ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <Img
            src={currentUrl}
            alt="Project"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
          />

          <motion.button
            type="button"
            onClick={onImageRemove}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -top-2 -left-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <FiX className="text-sm" />
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          type="button"
          onClick={handleClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-3 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors duration-200"
        >
          <FiImage className="text-3xl" />
          <span className="text-sm">انقر لرفع صورة المشروع</span>
          <span className="text-xs text-gray-400">
            JPG, PNG, WebP - الحد الأقصى 5MB
          </span>
        </motion.button>
      )}
    </motion.div>
  );
};
