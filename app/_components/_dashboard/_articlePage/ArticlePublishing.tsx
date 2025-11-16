"use client";
// components/articles/ArticlePublishing.tsx
import { motion } from "framer-motion";
import { FiCalendar, FiGlobe, FiEye, FiEyeOff } from "react-icons/fi";
import { ArticleFormData } from "../_articles/types";

interface ArticlePublishingProps {
  formData: ArticleFormData;
  updateFormData: (field: keyof ArticleFormData, value: any) => void;
}

export default function ArticlePublishing({
  formData,
  updateFormData,
}: ArticlePublishingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        إعدادات النشر
      </h2>

      <div className="space-y-6">
        {/* حالة المقال */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            حالة المقال
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => updateFormData("status", "draft")}
              className={`flex items-center justify-center gap-2  p-4 border rounded-lg transition-colors ${
                formData.status === "draft"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <FiEyeOff className="w-4 h-4" />
              <span>مسودة</span>
            </button>

            <button
              onClick={() => updateFormData("status", "published")}
              className={`flex items-center justify-center gap-2 p-4 border rounded-lg transition-colors ${
                formData.status === "published"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <FiGlobe className="w-4 h-4" />
              <span>منشور</span>
            </button>

            <button
              onClick={() => updateFormData("status", "scheduled")}
              className={`flex items-center justify-center gap-2 p-4 border rounded-lg transition-colors ${
                formData.status === "scheduled"
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <FiCalendar className="w-4 h-4" />
              <span>مجدول</span>
            </button>
          </div>
        </div>

        {/* جدولة النشر */}
        {formData.status === "scheduled" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiCalendar className="w-4 h-4 inline ml-1" />
              جدول النشر
            </label>
            <input
              type="datetime-local"
              value={formData.scheduled_for || ""}
              onChange={(e) => updateFormData("scheduled_for", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </motion.div>
        )}

        {/* إحصائيات */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">إحصائيات المقال</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {/* view_count */}
              </div>
              <div className="text-sm text-gray-600">المشاهدات</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {/* like_count */}
              </div>
              <div className="text-sm text-gray-600">الإعجابات</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {/* share_count */}
              </div>
              <div className="text-sm text-gray-600">المشاركات</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {new Date(/* created_at */).toLocaleDateString("ar-SA")}
              </div>
              <div className="text-sm text-gray-600">تاريخ الإنشاء</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
