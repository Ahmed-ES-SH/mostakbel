"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";
import { FaTimes, FaTrash } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

interface props {
  title: string | undefined;
  id: number;
  showConfirm: boolean;
  onDelete: (id: number) => void;
  loading?: boolean;
  onClose: () => void;
}

export default function ConfirmDeletePopup({
  title,
  id,
  showConfirm,
  onDelete,
  loading,
  onClose,
}: props) {
  // ✅ استخدم Portal فقط إذا كان الـ DOM جاهز (لمنع مشاكل SSR)
  if (typeof window === "undefined") return null;
  const portalTarget = document.body;

  const content = (
    <AnimatePresence>
      {showConfirm && (
        <div className="fixed top-0 left-0 bg-black/50 backdrop-blur-md z-99999 w-full h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="popup-main-bg"
          >
            <motion.div
              initial={{ y: -500 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ y: -500 }}
              className="max-w-5xl p-3  h-fit bg-white relative pt-4  rounded-md shadow-lg flex items-center flex-col gap-6 "
            >
              <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
                  <MdErrorOutline className="text-red-400 size-10" />
                </div>
              </div>
              <div
                style={{ direction: "rtl" }}
                className="content flex flex-col gap-3 mt-3 items-center"
              >
                <h1 className="text-center">
                  {"أنت على وشك حذف هذا العنصر بشكل نهائى "}
                </h1>
                <p className="text-center">
                  هل أنت متأكد من رغبتك في حذف
                  <span className="text-red-400 px-2">{title}</span> سيتم الحذف
                  بشكل نهائي.
                </p>
              </div>
              <div className="btns w-full py-4 bg-gray-100 rounded-b-md flex items-center justify-center gap-6">
                <button onClick={onClose} className="cancle-btn py-2">
                  <FaTimes />
                  <p>إلغاء</p>
                </button>
                <button
                  onClick={() => onDelete(id)}
                  className="danger-btn py-2"
                >
                  {loading ? (
                    <VscLoading className="text-white animate-spin" />
                  ) : (
                    <>
                      <FaTrash />
                      <p>حذف</p>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, portalTarget);
}
