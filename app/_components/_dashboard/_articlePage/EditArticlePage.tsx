"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiSave, FiImage, FiTag, FiEye } from "react-icons/fi";
import ArticlePublishing from "./ArticlePublishing";
import { ArticleFormData, ArticleType } from "../_articles/types";
import { Category } from "../_ProjectPage/type";
import LoadingSpinner from "./LoadingSpinner";
import ArticleBasicInfo from "./ArticleBasicInfo";
import ArticleContent from "./ArticleContent";
import ArticleSEO from "./ArticleSEO";
import { toast } from "sonner";
import { instance } from "@/app/_helpers/axios";
import { useRouter } from "next/navigation";

interface EditArticlePageProps {
  article: ArticleType;
  categories: Category[];
}

export default function EditArticlePage({
  article,
  categories,
}: EditArticlePageProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<ArticleFormData>({
    title: article.title,
    content: article.content,
    excerpt: article.excerpt,
    image: article.image,
    category_id: article.category_id,
    status: article.status,
    scheduled_for: article.scheduled_for,
    meta_title: article.meta_title,
    meta_description: article.meta_description,
    meta_keywords: article.meta_keywords,
    order: article.order,
  });
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "basic" | "content" | "seo" | "publishing"
  >("basic");

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key == "image" || key == "scheduled_for") {
          return;
        }

        if (typeof value === "boolean") {
          updatedData.append(key, value ? "1" : "0");
          return;
        }

        updatedData.append(key, value as any);
      });

      if ((formData.image as any) instanceof File)
        updatedData.append("image", formData.image);

      if (formData.scheduled_for)
        updatedData.append("scheduled_for", formData.scheduled_for);

      const response = await instance.post(
        `/update-article/${article.id}`,
        updatedData
      );
      if (response.status == 200) {
        toast.success("تم تحديث بيانات المقال بنجاح .");
        router.push(`/en/dashboard/articles`);
      }
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ??
        "حدث خطا اثناء محاولة تحديث بيانات المقال الرجاء المحاولة لاحقا .";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof ArticleFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const tabs = [
    { id: "basic", label: "المعلومات الأساسية", icon: FiTag },
    { id: "content", label: "المحتوى", icon: FiEye },
    { id: "seo", label: "تحسين محركات البحث", icon: FiImage },
    { id: "publishing", label: "إعدادات النشر", icon: FiSave },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 ">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  تعديل المقال
                </h1>
                <p className="text-gray-600">تعديل: {article.title}</p>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2  bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <FiSave className="w-4 h-4" />
              <span>{loading ? "جاري الحفظ..." : "حفظ التغييرات"}</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6">
              <nav className="gap-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-3  p-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-lg shadow-sm">
              {activeTab === "basic" && (
                <ArticleBasicInfo
                  formData={formData}
                  setFormData={setFormData}
                  categories={categories}
                  updateFormData={updateFormData}
                />
              )}

              {activeTab === "content" && (
                <ArticleContent
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}

              {activeTab === "seo" && (
                <ArticleSEO
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}

              {activeTab === "publishing" && (
                <ArticlePublishing
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
