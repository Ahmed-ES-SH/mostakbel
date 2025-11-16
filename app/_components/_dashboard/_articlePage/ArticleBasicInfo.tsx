"use client";
// components/articles/ArticleBasicInfo.tsx
import { motion } from "framer-motion";
import { ArticleFormData } from "../_articles/types";
import { Category } from "../_ProjectPage/type";
import { ImageUpload } from "../_ProjectPage/ImageUpload";
import { Dispatch, SetStateAction } from "react";

interface ArticleBasicInfoProps {
  formData: ArticleFormData;
  setFormData: Dispatch<SetStateAction<ArticleFormData>>;
  categories: Category[];
  updateFormData: (field: keyof ArticleFormData, value: any) => void;
}

export default function ArticleBasicInfo({
  formData,
  setFormData,
  categories,
  updateFormData,
}: ArticleBasicInfoProps) {
  const handleRemoveImage = () => {
    setFormData({ ...formData, image: "" });
  };

  const handleImageChange = (imageData: string) => {
    setFormData({ ...formData, image: imageData }); // تخزين الصورة للعرض أو للرفع
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        المعلومات الأساسية
      </h2>

      <div className="space-y-6">
        {/* العنوان */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            عنوان المقال *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="أدخل عنوان المقال"
          />
        </div>

        {/* صورة المقال */}
        <ImageUpload
          label="صورة المقال"
          imageUrl={formData.image}
          onImageChange={handleImageChange}
          onImageRemove={handleRemoveImage}
        />

        {/* الفئة */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الفئة *
          </label>
          <select
            value={formData.category_id}
            onChange={(e) =>
              updateFormData("category_id", parseInt(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">اختر الفئة</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title_ar}
              </option>
            ))}
          </select>
        </div>

        {/* الترتيب */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الترتيب
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => updateFormData("order", parseInt(e.target.value))}
            className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
          />
        </div>
      </div>
    </motion.div>
  );
}
