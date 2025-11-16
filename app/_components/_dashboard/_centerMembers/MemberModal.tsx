"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Member, MemberFormData } from "./types";
import { useEffect, useRef, useState } from "react";
import {
  FaTimes,
  FaUpload,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";
import { getImageSrc } from "@/app/_helpers/GlobalHelpers";
import { VscLoading } from "react-icons/vsc";

interface props {
  isOpen: boolean;
  onClose: () => void;
  member?: Member;
  onSave: (data: Partial<MemberFormData>) => void;
  mode: "add" | "edit";
  loading: boolean;
}

export default function MemberModal({
  isOpen,
  onClose,
  member,
  onSave,
  mode,
  loading,
}: props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<MemberFormData>>({});

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleClose = () => {
    setFormData({});
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (
    field: keyof MemberFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (member) {
      setFormData(member);
    }
  }, [member]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-999999"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {mode === "add" ? "إضافة عضو جديد" : "تعديل بيانات العضو"}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* قسم اختيار الصورة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  صورة العضو
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={handleImageClick}
                >
                  {formData.image ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={getImageSrc(formData.image)}
                        alt="معاينة الصورة"
                        className="h-32 w-32 object-cover rounded-lg mb-2"
                      />
                      <span className="text-blue-600 text-sm">
                        انقر لتغيير الصورة
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FaUpload className="text-gray-400 text-3xl mb-2" />
                      <span className="text-gray-600">انقر لرفع صورة</span>
                      <span className="text-gray-500 text-sm">
                        JPEG, PNG, JPG (الحد الأقصى 5MB)
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* المعلومات الأساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="أدخل الاسم الكامل"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المسمى الوظيفي *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.job_title}
                    onChange={(e) => handleChange("job_title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="أدخل المسمى الوظيفي"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوصف *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل وصفاً مختصراً عن العضو"
                />
              </div>

              {/* روابط التواصل الاجتماعي */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  روابط التواصل الاجتماعي
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FaFacebook className="text-blue-600" />
                    <input
                      type="url"
                      value={formData.facebook || ""}
                      onChange={(e) => handleChange("facebook", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="رابط الفيسبوك"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <FaInstagram className="text-pink-600" />
                    <input
                      type="url"
                      value={formData.instagram || ""}
                      onChange={(e) =>
                        handleChange("instagram", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="رابط الإنستغرام"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <FaTwitter className="text-gray-600" />
                    <input
                      type="url"
                      value={formData.x || ""}
                      onChange={(e) => handleChange("x", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="رابط تويتر (X)"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <FaLinkedin className="text-blue-500" />
                    <input
                      type="url"
                      value={formData.linkedin || ""}
                      onChange={(e) => handleChange("linkedin", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="رابط لينكدإن"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <FaYoutube className="text-red-600" />
                    <input
                      type="url"
                      value={formData.youtube || ""}
                      onChange={(e) => handleChange("youtube", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="رابط اليوتيوب"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <FaWhatsapp className="text-green-600" />
                    <input
                      type="url"
                      value={formData.whatsapp || ""}
                      onChange={(e) => handleChange("whatsapp", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="رابط واتساب"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <FaTiktok className="text-gray-800" />
                    <input
                      type="url"
                      value={formData.tiktok || ""}
                      onChange={(e) => handleChange("tiktok", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="رابط تيك توك"
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="pt-2 border-t border-gray-300 p-2">
              {/* أزرار الحفظ والإلغاء */}
              <div className="flex justify-end gap-3 pt-4 ">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className=" disabled:bg-blue-100 px-6 py-2 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {loading ? (
                    <VscLoading className="animate-spin text-blue-500" />
                  ) : mode === "add" ? (
                    "إضافة العضو"
                  ) : (
                    "حفظ التغييرات"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
