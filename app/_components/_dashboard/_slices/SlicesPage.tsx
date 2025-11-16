"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slice } from "./types";
import SliceCard from "./SliceCard";
import { FaPlus } from "react-icons/fa";
import AddSliceModal from "./AddSliceModal";

interface props {
  data: Slice[];
}

// المكون الرئيسي
export default function SlicesPage({ data }: props) {
  const [slices, setSlices] = useState<Slice[]>(data ?? []);
  const [openModel, setOpenModel] = useState(false);

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-7xl mx-auto">
        {/* العنوان الرئيسي */}
        <div className="flex items-center  max-md:flex-col max-md:mb-4 max-md:items-start justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 pt-8"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              معرض الشرائح
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              استعرض وأدرج الشرائح التفاعلية مع إمكانية التعديل والحذف
            </p>
          </motion.div>
          <button
            onClick={() => setOpenModel(true)}
            className="flex items-center gap-2 p-2 bg-sky-400 text-white hover:bg-white border border-transparent rounded-lg hover:text-black duration-300 hover:border-sky-400"
          >
            <FaPlus />
            إضافة عنصر جديد
          </button>
        </div>

        {/* شبكة البطاقات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {slices.map((slice) => (
              <SliceCard
                setSlices={setSlices}
                key={`slice-${slice.id}`}
                slice={slice}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AddSliceModal
        setSlices={setSlices}
        isOpen={openModel}
        onClose={() => setOpenModel(false)}
      />
    </div>
  );
}
