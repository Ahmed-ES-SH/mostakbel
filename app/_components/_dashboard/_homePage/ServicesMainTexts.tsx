"use client";

import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import EditTextPopup from "../EditTextPopup";
import { motion } from "framer-motion";

interface TextType {
  en: string;
  ar: string;
  nl: string;
}

interface titlesType {
  title: TextType;
  subtitle: TextType;
}

interface Props {
  titles: titlesType;
  setTitles: Dispatch<SetStateAction<titlesType>>;
}

type FiledType = "title" | "subtitle" | "";

export default function ServicesMainTexts({ titles, setTitles }: Props) {
  /** Holds editable text only (same structure for any field) */
  const [selectedText, setSelectedText] = useState<TextType>({
    en: "",
    ar: "",
    nl: "",
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filedType, setFiledType] = useState<FiledType>("");

  /** Open popup with selected text */
  const handleSelectMainText = (type: FiledType, text: TextType) => {
    const safeText = text ?? { en: "", ar: "", nl: "" };

    setSelectedText({
      en: safeText.en || "",
      ar: safeText.ar || "",
      nl: safeText.nl || "",
    });

    setFiledType(type);
    setIsPopupOpen(true);
  };

  /** Handle input change inside popup */
  const handleInputChange = (name: string, value: string | number) => {
    const [, lang] = name.split("_");

    setSelectedText((prev) => ({
      ...prev,
      [lang]: value,
    }));
  };

  /** Build popup inputs */
  const inputs = useMemo(() => {
    if (!filedType) return [];

    return ["en", "ar", "nl"].map((lang) => ({
      name: `${filedType}_${lang}`,
      value: selectedText[lang as "en" | "ar" | "nl"],
      type: "short-text",
      label:
        filedType === "title"
          ? `العنوان (${lang.toUpperCase()})`
          : `النص الفرعي (${lang.toUpperCase()})`,
    }));
  }, [filedType, selectedText]);

  /** Save and update titles */
  const handleSaveChanges = () => {
    if (!filedType) return;

    setTitles((prev) => ({
      ...prev,
      [filedType]: {
        en: selectedText.en,
        ar: selectedText.ar,
      },
    }));

    setIsPopupOpen(false);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
    setSelectedText({ en: "", ar: "", nl: "" });
  };

  return (
    <>
      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => handleSelectMainText("subtitle", titles.subtitle)}
        className="text-primary font-semibold text-lg mb-2 select-effect cursor-pointer"
      >
        {titles.subtitle.ar ?? ""}
      </motion.p>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onClick={() => handleSelectMainText("title", titles.title)}
        className="text-3xl md:text-5xl font-extrabold text-stone-900 mb-12 select-effect cursor-pointer"
      >
        {titles.title.ar ?? ""}
      </motion.h2>

      <EditTextPopup
        loadingState={false}
        operationType="edit"
        onSave={handleSaveChanges}
        showPopup={isPopupOpen}
        onClose={handleClose}
        inputs={inputs}
        onChange={handleInputChange}
      />
    </>
  );
}
