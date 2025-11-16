"use client";
import { motion } from "framer-motion";
import { Slice } from "./types";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditSliceModal from "./EditSliceModal";
import { Dispatch, SetStateAction, useState } from "react";
import ConfirmDeletePopup from "../_dynamicComponents/ConfirmDeletePopup";
import { toast } from "sonner";
import { instance } from "@/app/_helpers/axios";
import Img from "../../_global/Img";
import { truncateContent } from "@/app/_helpers/GlobalHelpers";

interface CardProps {
  slice: Slice;
  setSlices: Dispatch<SetStateAction<Slice[]>>;
}

// مكون البطاقة
export default function SliceCard({ slice, setSlices }: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      const response = await instance.delete(`/slices/${slice.id}`);
      if (response.status == 200) {
        toast.success("تم حذف الشريحة بنجاح .");
        setSlices((prev) => prev.filter((s) => s.id != slice.id));
        setConfirmDelete(true);
      }
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ?? "حدث خطأ اثناء محاولة حذف الشريحة.";
      toast.error(message);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative hover:-translate-y-4 cursor-pointer duration-300 rounded-xl overflow-hidden shadow-lg group"
    >
      {/* الصورة كخلفية */}
      <div className="h-64 bg-cover bg-center relative">
        <Img
          src={slice.image}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        {/* طبقة تدرج لوني لتحسين قراءة النص */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>

        {/* العنوان العربي يظهر بشكل طائر */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white text-xl font-bold text-center mb-1"
          >
            {truncateContent(slice.title_ar, 30)}
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 text-sm text-center"
          >
            {truncateContent(slice.subTitle_ar, 30)}
          </motion.p>
        </div>
      </div>

      {/* أزرار التحكم */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-full shadow-md"
          aria-label="تعديل"
        >
          <FiEdit size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setConfirmDelete(true)}
          className="bg-red-500 text-white p-2 rounded-full shadow-md"
          aria-label="حذف"
        >
          <FiTrash2 size={16} />
        </motion.button>
      </div>

      {/* النافذة المنبثقة للتعديل */}
      <EditSliceModal
        slice={slice}
        setSlices={setSlices}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmDeletePopup
        id={slice.id}
        onClose={() => setConfirmDelete(false)}
        onDelete={handleDelete}
        showConfirm={confirmDelete}
        title={`الشريحة - ${slice.title_ar}`}
        loading={loadingDelete}
      />
    </motion.div>
  );
}
