"use client";
// components/articles/ArticleSEO.tsx
import { motion } from "framer-motion";
import { FiFileText, FiSearch, FiTag } from "react-icons/fi";
import { useState } from "react";
import { ArticleFormData } from "../_articles/types";

interface ArticleSEOProps {
  formData: ArticleFormData;
  updateFormData: (field: keyof ArticleFormData, value: any) => void;
}

export default function ArticleSEO({
  formData,
  updateFormData,
}: ArticleSEOProps) {
  const [newKeyword, setNewKeyword] = useState("");

  const addKeyword = () => {
    if (
      newKeyword.trim() &&
      !formData.meta_keywords.includes(newKeyword.trim())
    ) {
      updateFormData("meta_keywords", [
        ...formData.meta_keywords,
        newKeyword.trim(),
      ]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    updateFormData(
      "meta_keywords",
      formData.meta_keywords.filter((k) => k !== keyword)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        تحسين محركات البحث (SEO)
      </h2>

      <div className="space-y-6">
        {/* Meta Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiSearch className="w-4 h-4 inline ml-1" />
            عنوان SEO *
          </label>
          <input
            type="text"
            value={formData.meta_title}
            onChange={(e) => updateFormData("meta_title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="عنوان الصفحة في نتائج البحث..."
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.meta_title.length}/60 حرف - الأمثل بين 50-60 حرف
          </p>
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiFileText className="w-4 h-4 inline ml-1" />
            وصف SEO *
          </label>
          <textarea
            value={formData.meta_description}
            onChange={(e) => updateFormData("meta_description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="وصف الصفحة في نتائج البحث..."
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.meta_description.length}/160 حرف - الأمثل بين 150-160 حرف
          </p>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiTag className="w-4 h-4 inline ml-1" />
            الكلمات المفتاحية
          </label>
          <div className="flex gap-2 space-x-reverse mb-3">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أضف كلمة مفتاحية..."
            />
            <button
              onClick={addKeyword}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              إضافة
            </button>
          </div>

          {formData.meta_keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.meta_keywords.map((keyword, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center space-x-1 space-x-reverse bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  <span>{keyword}</span>
                  <button
                    onClick={() => removeKeyword(keyword)}
                    className="hover:text-blue-900 transition-colors"
                  >
                    ×
                  </button>
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
