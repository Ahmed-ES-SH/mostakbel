"use client";
import { motion } from "framer-motion";
import {
  FaEye,
  FaShare,
  FaHeart,
  FaCalendar,
  FaUser,
  FaHandsHelping,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { FiTag } from "react-icons/fi";
import LocaleLink from "../../_global/LocaleLink";
import { Dispatch, SetStateAction, useState } from "react";
import { instance } from "@/app/_helpers/axios";
import { toast } from "sonner";
import ConfirmDeletePopup from "../_dynamicComponents/ConfirmDeletePopup";
import { ArticleType } from "../_articles/types";

interface NewsDashCardProps {
  article: ArticleType;
  setNews: Dispatch<SetStateAction<ArticleType[]>>;
}

export default function NewsDashCard({ article, setNews }: NewsDashCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // معالجة النقر على البطاقة
  const handleClick = () => {};

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      const response = await instance.delete(`/delete-news/${article.id}`);
      if (response.status == 200) {
        toast.success("تم حذف المقال بنجاح .");
        setNews((prev: ArticleType[]) =>
          prev.filter((artic) => artic.id !== article.id)
        );
        setConfirmDelete(false);
      }
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "حدث خطأ أثناء حذف المقال.";

      toast.error(message);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <motion.div
      className={`bg-white relative rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300`}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      {/* صورة المقال */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* شارة التصنيف */}
        <div className="absolute top-4 right-4">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 shadow-md">
            <FaHandsHelping className="text-xs" />
            {article.category.title_ar}
          </div>
        </div>
      </div>

      {/* محتوى البطاقة */}
      <div className="p-6">
        {/* العنوان */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 leading-tight">
          {article.title}
        </h3>

        {/* الملخص */}
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>

        {/* الإحصائيات */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            {/* المشاهدات */}
            <div className="flex items-center gap-1">
              <FaEye className="text-blue-500" />
              <span>{article.view_count}</span>
            </div>

            {/* المشاركات */}
            <div className="flex items-center gap-1">
              <FaShare className="text-green-500" />
              <span>{article.share_count}</span>
            </div>

            {/* الإعجابات */}
            <div className="flex items-center gap-1">
              <FaHeart className="text-red-500" />
              <span>{article.like_count}</span>
            </div>
          </div>
        </div>

        {/* المعلومات الإضافية */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {/* المؤلف */}
          <div className="flex items-center gap-2">
            <FaUser className="text-purple-500" />
            <span>{article.author.name}</span>
          </div>

          {/* تاريخ النشر */}
          <div className="flex items-center gap-2">
            <FaCalendar className="text-orange-500" />
            <span>{formatDate(article.published_at)}</span>
          </div>
        </div>

        {/* الوسوم */}
        {article.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-gray-100">
            <FiTag className="text-gray-400" />
            {article.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* أزرار الإجراءات */}
      <div className="flex items-center gap-2 w-fit absolute top-2 left-2">
        <LocaleLink
          href={`/dashboard/news/${article.id}`}
          className="flex items-center size-6 gap-2 bg-blue-600 hover:text-blue-600 p-1 rounded-lg text-white hover:bg-white duration-200 font-medium transition"
        >
          <FaEdit />
        </LocaleLink>

        <button
          onClick={() => setConfirmDelete(true)}
          className="flex items-center size-6 gap-2 bg-red-600 hover:text-red-300 text-white p-1 rounded-lg hover:bg-red-500/50 font-medium transition"
        >
          <FaTrashAlt />
        </button>
      </div>

      <ConfirmDeletePopup
        id={article.id}
        onClose={() => setConfirmDelete(false)}
        onDelete={handleDelete}
        showConfirm={confirmDelete}
        title={`المقال - ${article.title}`}
        loading={loadingDelete}
      />
    </motion.div>
  );
}
