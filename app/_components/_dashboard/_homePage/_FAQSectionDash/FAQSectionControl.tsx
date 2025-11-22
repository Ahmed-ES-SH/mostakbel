"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ImageCollageControl from "./ImageCollageControll";
import { TextType } from "../_aboutSectionDash/AboutSectionDash";
import AccordionItem, {
  FAQ,
} from "@/app/_components/_website/_home/_FAQSection/AccordionItem";
import { VscLoading } from "react-icons/vsc";
import { FaSave } from "react-icons/fa";
import { toast } from "sonner";
import EditTextPopup from "../../EditTextPopup";
import { instance } from "@/app/_helpers/axios";

type imageType = string | File | null;

type filedType = "title" | "heading" | "footer" | "";

interface props {
  texts: { title: TextType; heading: TextType; footer: TextType };
  faqs: FAQ[];
  imagesData: imageType[];
}

export default function FAQSection({
  imagesData,
  texts: textsData,
  faqs,
}: props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [images, setImages] = useState(imagesData ?? []);
  const [updateloading, setUpdateLoading] = useState(false);

  // --- STATES
  const [filedType, setFiledType] = useState<filedType>("");
  const [selectedText, setSelectedText] = useState(textsData);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [texts, setTexts] = useState(textsData);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Handle text input change inside popup
  const handleInputChange = (name: string, value: string | number) => {
    const [field, lang] = name.split("_");

    setSelectedText((prev: any) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value,
      },
    }));
  };

  // Generate dynamic inputs for popup
  const inputs = useMemo(() => {
    if (!filedType) return [];

    const labels: any = {
      title: "العنوان",
      heading: "العنوان الرئيسي",
      footer: "التذييل",
    };

    return ["en", "ar", "nl"].map((lang) => ({
      name: `${filedType}_${lang}`,
      value: (selectedText as any)[filedType]?.[lang] ?? "",
      type: "short-text",
      label: `${labels[filedType]} (${lang.toUpperCase()})`,
    }));
  }, [filedType, selectedText]);

  // ✅ تم تصحيح هذه الدالة
  const handleSaveChanges = () => {
    if (!filedType) return;

    // تحديث النصوص الرئيسية بالنصوص المعدلة
    setTexts((prev) => ({
      ...prev,
      [filedType]: selectedText[filedType],
    }));

    setIsPopupOpen(false);
  };

  const openPopup = (field: filedType) => {
    setFiledType(field);
    setSelectedText(texts); // إعادة تعيين النص المحدد إلى القيم الحالية
    setIsPopupOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setUpdateLoading(true);

      const formData = new FormData();
      formData.append("column_1", JSON.stringify(texts));
      if (images[0] instanceof File) formData.append("column_2", images[0]);
      if (images[1] instanceof File) formData.append("column_3", images[1]);
      if (images[2] instanceof File) formData.append("column_4", images[2]);

      const response = await instance.post(
        `/update-variables-data?id=4&limit=5`,
        formData
      );

      if (response.status === 200) {
        toast.success("تم حفظ التعديلات بنجاح");
      }
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ??
        "حدث خطأ أثناء محاولة تحديث بيانات القسم الرجاء المحاولة لاحقا .";
      toast.error(message);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <>
      <div className="border shadow-lg  rounded-lg h-fit pt-16 pb-12 bg-linear-to-br from-orange-50 via-white to-teal-50  px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Images */}
            <div className="relative h-[600px]">
              <ImageCollageControl
                image_1={images[0]}
                image_2={images[1]}
                icon_image={images[2]}
                setImages={setImages}
              />
            </div>

            {/* Right Side */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 ltr:text-left rtl:text-right"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => openPopup("title")}
                >
                  <span className="text-amber-500 select-effect font-handwriting">
                    {texts.title.ar} {/* استخدام texts بدلاً من selectedText */}
                  </span>
                </div>

                <h1
                  className="text-3xl select-effect md:text-4xl font-bold text-gray-900 mb-4 cursor-pointer"
                  onClick={() => openPopup("heading")}
                >
                  {texts.heading.ar} {/* استخدام texts بدلاً من selectedText */}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    faq={faq}
                    index={index}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                    isRTL={true}
                  />
                ))}
              </motion.div>

              {/* Footer */}
              <div
                className="mt-8 flex items-center gap-4 flex-row-reverse max-md:flex-col cursor-pointer"
                onClick={() => openPopup("footer")}
              >
                <p className="text-sm select-effect text-gray-600">
                  {texts.footer.ar} {/* استخدام texts بدلاً من selectedText */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        disabled={updateloading}
        onClick={handleSubmit}
        className="disabled:bg-green-100 mb-12 flex items-center justify-center rounded-lg shadow-lg bg-green-400 p-2 text-white mt-8 w-fit mx-auto"
      >
        {updateloading ? (
          <VscLoading className="animate-spin text-green-500 size-6" />
        ) : (
          <div className="flex items-center gap-2">
            حفظ التعديلات
            <FaSave />
          </div>
        )}
      </button>

      {/* Popup */}
      <EditTextPopup
        loadingState={updateloading}
        operationType="edit"
        onSave={handleSaveChanges}
        showPopup={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        inputs={inputs}
        onChange={handleInputChange}
      />
    </>
  );
}
