"use client";
// components/articles/ArticleContent.tsx
import { motion } from "framer-motion";
import { FiType, FiFileText } from "react-icons/fi";
import { ArticleFormData } from "../_articles/types";

interface ArticleContentProps {
  formData: ArticleFormData;
  updateFormData: (field: keyof ArticleFormData, value: any) => void;
}

export default function ArticleContent({
  formData,
  updateFormData,
}: ArticleContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">المحتوى</h2>

      <div className="space-y-6">
        {/* الملخص */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiFileText className="w-4 h-4 inline ml-1" />
            الملخص *
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => updateFormData("excerpt", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="اكتب ملخصاً مختصراً للمقال..."
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.excerpt.length}/200 حرف
          </p>
        </div>

        {/* المحتوى */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiType className="w-4 h-4 inline ml-1" />
            المحتوى الكامل *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => updateFormData("content", e.target.value)}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-serif text-lg leading-relaxed"
            placeholder="اكتب محتوى المقال الكامل هنا..."
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.content.length} حرف
          </p>
        </div>
      </div>
    </motion.div>
  );
}
