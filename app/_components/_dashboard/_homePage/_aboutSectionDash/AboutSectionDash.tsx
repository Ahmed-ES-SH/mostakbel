"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Img from "@/app/_components/_global/Img";
import EditTextPopup from "../../EditTextPopup";
import CharitiesSection from "./CharitiesSection";
import { toast } from "sonner";
import { instance } from "@/app/_helpers/axios";
import BannerSectionEditable from "../_BannerSection/BannerSectionEditable";
import { VscLoading } from "react-icons/vsc";

export type TextType = { en: string; ar: string };

export type AboutTexts = {
  badge: TextType;
  title: TextType;
  heading: TextType;
  description: TextType;
};

export interface charitieType {
  icon: string;
  text: TextType;
  color: string;
  delay: number;
}

interface Props {
  texts: AboutTexts;
  charities: charitieType[];
  banner: any;
  mainImage: string;
}

type FiledType = keyof AboutTexts | "";

export default function AboutSectionDash({
  texts,
  charities: charitiesData,
  banner,
  mainImage = "/website/about_1_1-2.png",
}: Props) {
  // Safe defaults
  const defaultTexts: AboutTexts = {
    badge: { en: "About Us", ar: "معلومات عنا" },
    title: { en: "Donat", ar: "التبرع" },
    heading: {
      en: "We Believe That We Can Save More Life's With You",
      ar: "نؤمن بأننا نستطيع إنقاذ المزيد من الأرواح معك",
    },
    description: {
      en: "Dialogue and Civil Peace Center is the largest global crowdfunding community connecting nonprofits, donors, and companies...",
      ar: "مركز الحوار والسلم الأهلي هو أكبر مجتمع للتمويل الجماعي العالمي يربط المنظمات غير الربحية والمانحين والشركات...",
    },
  };

  const [textsState, setTextsState] = useState<AboutTexts>(
    texts ?? defaultTexts
  );

  // selectedText holds en/ar being edited in popup
  const [selectedText, setSelectedText] = useState<TextType>({
    en: "",
    ar: "",
  });
  const [charities, setChirtys] = useState(charitiesData ?? []);
  const [bannerData, setBannerData] = useState(banner ?? []);
  const [filedType, setFiledType] = useState<FiledType>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Image state: store preview URL and optionally the selected File
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    mainImage
  );
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  // Open popup for a specific field
  const handleSelectMainText = (type: FiledType, text?: TextType) => {
    const safeText = text ?? { en: "", ar: "" };
    setSelectedText({ en: safeText.en || "", ar: safeText.ar || "" });
    setFiledType(type);
    setIsPopupOpen(true);
  };

  // Popup input handler (name format: `${filedType}_${lang}`, but we only need the lang here)
  const handleInputChange = (name: string, value: string | number) => {
    const parts = name.split("_");
    const lang = parts[1] as "en" | "ar";
    setSelectedText((prev) => ({ ...prev, [lang]: String(value) }));
  };

  // Build inputs for popup based on filedType
  const inputs = useMemo(() => {
    if (!filedType) return [];

    const labelMap: Record<string, string> = {
      badge: "Badge",
      title: "العنوان",
      heading: "العنوان الرئيسي",
      description: "الوصف",
      aboutMore: "زر المزيد",
    };

    return ["en", "ar"].map((lang) => ({
      name: `${filedType}_${lang}`,
      value: selectedText[lang as "en" | "ar"] ?? "",
      type: filedType === "description" ? "long-text" : "short-text",
      label: `${labelMap[filedType] ?? filedType} (${lang.toUpperCase()})`,
    }));
  }, [filedType, selectedText]);

  // Save changes from popup into textsState
  const handleSaveChanges = () => {
    if (!filedType) return;

    setTextsState((prev) => ({
      ...prev,
      [filedType]: {
        en: selectedText.en,
        ar: selectedText.ar,
      },
    }));

    setIsPopupOpen(false);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedText({ en: "", ar: "" });
  };

  // Image file select
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // basic client-side validation (type + size)
    if (!f.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    const url = URL.createObjectURL(f);
    setImagePreview(url);
    setImageFile(f);
  };

  // Save all: call onSave if provided
  const handleSaveAll = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("column_1", JSON.stringify(charities));
      formData.append("column_2", JSON.stringify(textsState));
      formData.append("column_4", JSON.stringify(bannerData.cardsData));
      formData.append("column_5", JSON.stringify(bannerData.headData));
      if (imageFile) formData.append("column_3", imageFile);

      const response = await instance.post(
        `/update-variables-data?id=2&limit=6`,
        formData
      );

      if (response.status == 200) {
        toast.success("تم تحديث بيانات القسم بنجاح .");
      }
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ??
        "حدث خطا اثناء محاولة تحديث بيانات القسم الرجاء المحاولة لاحقا .";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  console.log(bannerData);

  return (
    <div className="min-h-[90vh] overflow-hidden xl:pt-20 mb-10 w-full bg-liner-to-br from-gray-50 to-gray-100">
      <div className="w-full border shadow-lg rounded-lg px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden lg:w-[550px] w-full lg:h-[550px] h-[300px] shadow-2xl border-8 border-t-second border-teal-700">
              <div className="w-full h-full flex items-center justify-center bg-white">
                {imagePreview ? (
                  <Img
                    src={imagePreview}
                    alt={"Main image"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
            </div>

            {/* Image upload control */}
            <div className="mt-4 flex items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 bg-white border px-3 py-2 rounded shadow-sm">
                <input
                  onChange={handleImageChange}
                  accept="image/*"
                  type="file"
                  className="hidden"
                />
                اختر صورة رئيسية
              </label>
              <button
                onClick={() => {
                  setImagePreview(mainImage);
                  setImageFile(undefined);
                }}
                className="px-3 py-2 rounded bg-gray-100"
              >
                استعادة الأصل
              </button>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Badge (clickable) */}
            <div>
              <motion.p
                onClick={() => handleSelectMainText("badge", textsState.badge)}
                className="text-yellow-500 font-handwriting text-xl cursor-pointer select-effect"
              >
                {textsState.badge.ar}
              </motion.p>
            </div>

            {/* Title (clickable) */}
            <motion.h1
              onClick={() => handleSelectMainText("title", textsState.title)}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight cursor-pointer select-effect"
            >
              {textsState.title.ar}
            </motion.h1>

            {/* Heading (clickable) */}
            <motion.h2
              onClick={() =>
                handleSelectMainText("heading", textsState.heading)
              }
              className="text-2xl font-semibold text-gray-800 cursor-pointer select-effect"
            >
              {textsState.heading.ar}
            </motion.h2>

            {/* Description (clickable) */}
            <motion.p
              onClick={() =>
                handleSelectMainText("description", textsState.description)
              }
              className="text-gray-600 text-lg leading-relaxed cursor-pointer select-effect"
            >
              {textsState.description.ar}
            </motion.p>

            {/* Charity list (display-only) */}
            <CharitiesSection charities={charities} setChirtys={setChirtys} />
          </motion.div>
        </div>

        <BannerSectionEditable
          headData={bannerData.headData}
          cardsData={banner.cards}
          setBannerData={setBannerData}
        />
      </div>

      {/* Save All */}
      <div className="pt-4">
        <button
          disabled={loading}
          onClick={handleSaveAll}
          className="lg:px-12 px-6 py-3 mt-12 flex items-center justify-center rounded bg-green-500 hover:bg-green-700 duration-200 text-white shadow w-fit  mx-auto"
        >
          {loading ? <VscLoading className=" animate-spin" /> : "حفظ التعديلات"}
        </button>
      </div>

      {/* EditText Popup */}
      <EditTextPopup
        loadingState={false}
        operationType="edit"
        onSave={handleSaveChanges}
        showPopup={isPopupOpen}
        onClose={handleClosePopup}
        inputs={inputs}
        onChange={handleInputChange}
      />
    </div>
  );
}
