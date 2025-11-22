"use client";

import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { charitieType } from "./AboutSectionDash";
import { getIconComponent } from "@/app/_helpers/GlobalHelpers";
import { motion } from "framer-motion";
import IconPicker from "@/app/_components/_global/IconPicker";
import EditTextPopup from "../../EditTextPopup";

interface props {
  charities: charitieType[];
  setChirtys: Dispatch<SetStateAction<charitieType[]>>;
}

type fieldType = "text" | "";

export default function CharitiesSection({ charities, setChirtys }: props) {
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [activeCharityIndex, setActiveCharityIndex] = useState<number | null>(
    null
  );
  const [selectedCharityText, setSelectedCharityText] = useState<{
    en: string;
    ar: string;
    nl: string;
  }>({ en: "", ar: "", nl: "" });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fieldType, setFieldType] = useState<fieldType>("");

  // Show icon picker
  const handleShowIconPicker = (index: number) => {
    setActiveCharityIndex(index);
    setShowIconPicker(true);
  };

  const handleCharityIconChange = (iconName: string) => {
    if (activeCharityIndex !== null) {
      setChirtys((prev) => {
        const updated = [...prev];
        updated[activeCharityIndex] = {
          ...updated[activeCharityIndex],
          icon: iconName,
        };
        return updated;
      });
    }
    setShowIconPicker(false);
  };

  // Show text editor popup
  const handleSelectCharityText = (index: number) => {
    setActiveCharityIndex(index);
    const charity = charities[index];
    setSelectedCharityText({
      en: charity.text?.en || "",
      ar: charity.text?.ar || "",
      nl: charity.text?.nl || "",
    });
    setFieldType("text");
    setIsPopupOpen(true);
  };

  // Handle input change inside popup
  const handleInputChange = (name: string, value: string | number) => {
    const [field, lang] = name.split("_");
    setSelectedCharityText((prev) => ({
      ...prev,
      [lang]: value,
    }));
  };

  // Generate inputs dynamically for EditTextPopup
  const inputs = useMemo(() => {
    if (!fieldType) return [];

    return ["en", "ar", "nl"].map((lang) => ({
      name: `${fieldType}_${lang}`,
      value: (selectedCharityText as any)[lang],
      type: "short-text" as const,
      label: `النص (${lang.toUpperCase()})`,
    }));
  }, [fieldType, selectedCharityText]);

  // Save changes to the selected charity
  const handleSaveChanges = () => {
    if (activeCharityIndex === null) return;

    setChirtys((prev) => {
      const updated = [...prev];
      updated[activeCharityIndex] = {
        ...updated[activeCharityIndex],
        text: { ...selectedCharityText },
      };
      return updated;
    });

    setIsPopupOpen(false);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCharityText({ en: "", ar: "", nl: "" });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        {charities.map((c, idx) => {
          const Icon = getIconComponent(c.icon);
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              key={idx}
              className="flex items-center gap-3"
            >
              <div
                onClick={() => handleShowIconPicker(idx)}
                style={{ backgroundColor: `${c.color}` }}
                className={` select-effect w-10 h-10 rounded-full flex items-center justify-center`}
              >
                <Icon className="text-white" />
              </div>
              <span
                onClick={() => handleSelectCharityText(idx)}
                className="text-gray-700 font-medium select-effect cursor-pointer"
              >
                {c.text.ar}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Icon Picker */}
      <IconPicker
        show={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        selectedIcon={charities[activeCharityIndex || 0]?.icon}
        onChange={handleCharityIconChange}
      />

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
    </>
  );
}
