"use client";
import React, { useEffect, useMemo, useState } from "react";
import { TextType } from "../_aboutSectionDash/AboutSectionDash";
import { easeOut, motion } from "framer-motion";
import { getIconComponent } from "@/app/_helpers/GlobalHelpers";
import EditTextPopup from "../../EditTextPopup";
import IconPicker from "@/app/_components/_global/IconPicker";

interface cardType {
  icon: string;
  color: string;
  bg: string;
  title: TextType;
  description: TextType;
  textColor: string;
}

interface props {
  cardsData: cardType[];
  headData: { title: TextType; icon: string };
  setBannerData: any;
}

type fieldType = "title" | "description" | "";

export default function BannerSectionEditable({
  cardsData,
  headData,
  setBannerData,
}: props) {
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<any>({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fieldType, setFieldType] = useState<fieldType>("");
  const [cards, setCards] = useState<cardType[]>(cardsData ?? []);
  const [head, setHead] = useState(headData);

  // Show icon picker
  const handleShowIconPicker = (index: number | null) => {
    setActiveCardIndex(index);
    setShowIconPicker(true);
  };

  const handleIconChange = (iconName: string) => {
    // تعديل أيقونة الرأس
    if (activeCardIndex === null) {
      setHead((prev) => ({
        ...prev,
        icon: iconName,
      }));
      setShowIconPicker(false);
      return;
    }

    // تعديل أيقونة كارت
    setCards((prev) => {
      const updated = [...prev];
      updated[activeCardIndex] = {
        ...updated[activeCardIndex],
        icon: iconName,
      };
      return updated;
    });

    setShowIconPicker(false);
  };

  // Show text editor popup
  const handleSelectCardText = (index: number, field: fieldType) => {
    setActiveCardIndex(index);
    setFieldType(field);

    const card: any = cards[index];

    setSelectedCard({
      en: card[field]?.en ?? "",
      ar: card[field]?.ar ?? "",
    });

    setIsPopupOpen(true);
  };

  // Handle input change inside popup
  const handleInputChange = (name: string, value: string | number) => {
    const [field, lang] = name.split("_");
    setSelectedCard((prev: any) => ({
      ...prev,
      [lang]: value,
    }));
  };

  // Generate inputs dynamically for EditTextPopup
  const inputs = useMemo(() => {
    if (!fieldType) return [];

    return ["en", "ar"].map((lang) => ({
      name: `${fieldType}_${lang}`,
      value: (selectedCard as any)[lang],
      type: "short-text" as const,
      label: `النص (${lang.toUpperCase()})`,
    }));
  }, [fieldType, selectedCard]);

  const handleSelectHeadText = () => {
    setActiveCardIndex(null); // مهم لتوضيح أننا نعدّل الهيدر وليس كارد
    setFieldType("title");

    setSelectedCard({
      en: head.title?.en ?? "",
      ar: head.title?.ar ?? "",
    });

    setIsPopupOpen(true);
  };

  // Save changes to the selected charity
  const handleSaveChanges = () => {
    if (!fieldType) return;

    // تعديل الـ Head
    if (activeCardIndex === null) {
      setHead((prev) => ({
        ...prev,
        title: {
          en: selectedCard.en ?? "",
          ar: selectedCard.ar ?? "",
        },
      }));

      setIsPopupOpen(false);
      return;
    }

    // تعديل Card
    setCards((prev) => {
      const updated = [...prev];

      updated[activeCardIndex] = {
        ...updated[activeCardIndex],
        [fieldType]: {
          en: selectedCard.en ?? "",
          ar: selectedCard.ar ?? "",
        },
      };

      return updated;
    });

    setIsPopupOpen(false);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCard({});
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const HeadIcon = getIconComponent(head.icon);

  useEffect(() => {
    setBannerData({
      headData: head,
      cardsData: cards,
    });
  }, [head, cards, setBannerData]);

  return (
    <section className="w-full bg-primary-color mt-12 h-fit pb-4 px-4">
      <div className="max-w-6xl h-fit mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              onClick={() => handleShowIconPicker(null)}
              className="cursor-pointer hover:bg-white hover:text-black text-white select-effect"
            >
              <HeadIcon className="text-6xl " />
            </div>
          </motion.div>

          <h2
            onClick={handleSelectHeadText}
            className="text-4xl md:text-5xl font-bold hover:bg-white hover:text-black text-white mb-4 select-effect cursor-pointer"
          >
            {head.title.ar}
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cards.map((card, index) => {
            const Icon = getIconComponent(card.icon);
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`text-center p-6 bg-light-primary-color text-white hover:text-black  hover:bg-white cursor-pointer group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div
                  onClick={() => handleShowIconPicker(index)}
                  className="flex justify-center mb-4 select-effect"
                >
                  <Icon className={`size-9 `} />
                </div>
                <h3
                  onClick={() => handleSelectCardText(index, "title")}
                  className={`text-xl font-semibold text-gray-100 group-hover:text-gray-900 select-effect duration-300 mb-3`}
                >
                  {card.title.ar}
                </h3>
                <p
                  onClick={() => handleSelectCardText(index, "description")}
                  className={`leading-relaxed text-white group-hover:text-gray-800 select-effect duration-300`}
                >
                  {card.description.ar}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Icon Picker */}
      <IconPicker
        show={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        selectedIcon={cards[activeCardIndex || 0]?.icon}
        onChange={handleIconChange}
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
    </section>
  );
}
