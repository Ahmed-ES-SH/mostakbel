"use client";
import { motion } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaShare,
  FaHeart,
  FaCalendarAlt,
  FaUser,
  FaFolder,
} from "react-icons/fa";
import { ArticleType } from "./types";
import LocaleLink from "../../_global/LocaleLink";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { instance } from "@/app/_helpers/axios";
import ConfirmDeletePopup from "../_dynamicComponents/ConfirmDeletePopup";

interface ArticleCardProps {
  article: ArticleType;
  setArticles: Dispatch<SetStateAction<ArticleType[]>>;
}

export default function ArticleDashCard({
  article,
  setArticles,
}: ArticleCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      const response = await instance.delete(`/delete-article/${article.id}`);
      if (response.status == 200) {
        toast.success("تم حذف المقال بنجاح .");
        setArticles((prev: ArticleType[]) =>
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: "bg-gray-100 text-gray-800", text: "مسودة" },
      under_review: {
        color: "bg-yellow-100 text-yellow-800",
        text: "قيد المراجعة",
      },
      published: { color: "bg-green-100 text-green-800", text: "منشور" },
      scheduled: { color: "bg-blue-100 text-blue-800", text: "مجدول" },
      rejected: { color: "bg-red-100 text-red-800", text: "مرفوض" },
      archived: { color: "bg-purple-100 text-purple-800", text: "مؤرشف" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
    >
      {/* Article Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          {getStatusBadge(article.status)}
        </div>
      </div>

      {/* Article Content */}
      <div className="p-6">
        {/* Category and Date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <FaFolder className="text-blue-500" />
            <span>{article.category.title_ar}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <FaCalendarAlt />
            <span>{formatDate(article.published_at)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <FaEye />
              <span>{article.view_count}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaHeart className="text-red-500" />
              <span>{article.like_count}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaShare className="text-green-500" />
              <span>{article.share_count}</span>
            </div>
          </div>
        </div>

        {/* Author and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FaUser className="text-blue-600 text-sm" />
            </div>
            <span className="text-sm text-gray-600">{article.author.name}</span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Edit Button */}
            <LocaleLink href={`/dashboard/articles/${article.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                <FaEdit className="text-xs" />
                <span>تعديل</span>
              </motion.button>
            </LocaleLink>

            {/* Delete Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setConfirmDelete(true)}
              className="flex items-center space-x-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200"
            >
              <FaTrash className="text-xs" />
              <span>حذف</span>
            </motion.button>
          </div>
        </div>
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
