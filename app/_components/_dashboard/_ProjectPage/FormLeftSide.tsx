"use client";
import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Category, Project } from "./type";
import { FiSave, FiArrowRight, FiCalendar, FiDollarSign } from "react-icons/fi";
import { InputField } from "./InputField";
import { Toggle } from "./Toggle";
import { StatusSelect } from "./StatusSelect";
import { ImageUpload } from "./ImageUpload";
import LocaleLink from "../../_global/LocaleLink";
import { formatTitle } from "@/app/_helpers/GlobalHelpers";

interface props {
  setProject: Dispatch<SetStateAction<Project>>;
  project: Project;
  errors: Record<string, string>;
  setErrors: Dispatch<SetStateAction<Record<string, string>>>;
  isSubmitting: boolean;
  categories: Category[];
  type?: "edit" | "create";
}

export default function FormLeftSide({
  project,
  setProject,
  errors,
  setErrors,
  isSubmitting,
  categories,
  type = "edit",
}: props) {
  const handleInputChange = (field: keyof Project, value: any) => {
    setProject((prev) => ({
      ...prev,
      [field]: value,
    }));

    // إزالة الخطأ عند التعديل
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <>
      <motion.div variants={itemVariants} className="space-y-6">
        {/* بطاقة الحالة والإعدادات */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 lg:p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FiCalendar className="text-orange-500" />
            الحالة والإعدادات
          </h2>

          <div className="space-y-6">
            <StatusSelect
              value={project.status}
              onChange={(value) => handleInputChange("status", value)}
              error={errors.status}
            />

            <Toggle
              label="مشروع عاجل"
              enabled={project.is_urgent}
              onChange={(value) => handleInputChange("is_urgent", value)}
            />

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                <FiDollarSign className="text-green-500" />
                المعلومات المالية
              </h3>

              <div className="space-y-4">
                <InputField
                  label="المبلغ المستهدف ($)"
                  value={project.target_amount}
                  onChange={(value) =>
                    handleInputChange("target_amount", value)
                  }
                  error={errors.target_amount}
                  type="number"
                  required
                  dir="ltr"
                />

                <InputField
                  label="المبلغ المجموع ($)"
                  value={project.collected_amount}
                  onChange={(value) =>
                    handleInputChange("collected_amount", value)
                  }
                  type="number"
                  dir="ltr"
                  disabled
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* بطاقة صورة المشروع */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 lg:p-6"
        >
          <ImageUpload
            imageUrl={project.image}
            onImageChange={(url) => handleInputChange("image", url)}
            onImageRemove={() => handleInputChange("image", "")}
            label="صورة المشروع الرئيسية"
          />
        </motion.div>

        {/* اختيار القسم */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 lg:p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            القسم
          </label>
          <select
            className={`w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.category_id ? "border-red-500" : "border-gray-300"
            }`}
            value={project.category_id || ""}
            onChange={(e) => handleInputChange("category_id", e.target.value)}
          >
            <option value="">اختر القسم</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title_ar}
              </option>
            ))}
          </select>

          {errors.category_id && (
            <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 lg:p-6">
          <InputField
            label="ترتيب المشروع"
            value={project.order}
            onChange={(value) => handleInputChange("order", value)}
            type="number"
            dir="ltr"
          />
        </div>

        {/* بطاقة الإجراءات */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 lg:p-6"
        >
          <div className="space-y-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`
                      w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center gap-2
                      transition-colors duration-200
                      ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }
                    `}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <FiSave className="text-lg" />
                  {type == "edit" ? "حفظ التغييرات" : "انشاء المشروع"}
                </>
              )}
            </motion.button>

            {type == "edit" && (
              <LocaleLink
                href={`/projects/${formatTitle(project.title)}?projectId=${
                  project.id
                }`}
                target="_blank"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <FiArrowRight className="text-lg" />
                  معاينة المشروع
                </motion.button>
              </LocaleLink>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
