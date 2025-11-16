import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiPlus, FiX, FiTag, FiEdit3 } from "react-icons/fi";

interface props {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  label?: string;
  placeholder?: string;
}

export default function KeywordsInput({
  keywords,
  setKeywords,
  label = "الكلمات المفتاحية",
  placeholder = "أضف كلمة مفتاحية جديدة...",
}: props) {
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addKeyword = (keyword: string) => {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword && !keywords.includes(trimmedKeyword)) {
      setKeywords([...keywords, trimmedKeyword]);
    }
    setInputValue("");
  };

  const removeKeyword = (keyWord: string) => {
    setKeywords(keywords.filter((word) => word != keyWord));
    console.log("ed");
  };

  console.log(keywords);

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addKeyword(inputValue);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const pastedKeywords = pastedText
      .split(/[،,]/)
      .map((k) => k.trim())
      .filter((k) => k);

    if (pastedKeywords.length > 1) {
      const newKeywords = [
        ...keywords,
        ...pastedKeywords.filter((k) => !keywords.includes(k)),
      ];
      setKeywords(newKeywords);
    } else {
      setInputValue(pastedText);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="mb-6">
      {/* الهيدر مع التعديل السريع */}
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-semibold text-gray-700 flex items-center">
          <FiTag className="ml-2 text-blue-500" />
          {label}
        </label>
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          <FiEdit3 className="ml-1" />
          {isEditing ? "إنهاء التعديل" : "تعديل سريع"}
        </button>
      </div>

      {/* عرض الكلمات المفتاحية */}
      <div
        className={`min-h-[60px] border-2 border-dashed border-gray-200 rounded-xl p-3 transition-all duration-300 hover:border-blue-300 ${
          isEditing ? "border-blue-300 bg-blue-50" : "bg-gray-50"
        }`}
        onClick={() => !isEditing && setIsEditing(true)}
      >
        {/* حالة عدم وجود كلمات مفتاحية */}
        {keywords.length === 0 && !isEditing && (
          <div className="text-center text-gray-400 py-4">
            <FiTag className="mx-auto text-2xl mb-2" />
            <p>لا توجد كلمات مفتاحية</p>
            <p className="text-sm mt-1">انقر لإضافة كلمات مفتاحية</p>
          </div>
        )}

        {/* شبكة عرض الكلمات */}
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {keywords.map((keyword, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group"
                >
                  <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm">
                    {keyword}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="mr-1 ml-2 cursor-pointer z-99 p-0.5 rounded-full hover:bg-blue-200 transition-colors group-hover:scale-110"
                      >
                        <FiX className="h-3 w-3" />
                      </button>
                    )}
                  </span>

                  {/* تأثير hover */}
                  <div className="absolute inset-0 rounded-full bg-blue-200 opacity-0 group-hover:opacity-20 transition-opacity" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* حقل الإدخال في وضع التعديل */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3"
            >
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleInputKeyPress}
                    onPaste={handlePaste}
                    className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder={placeholder}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    ↵
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => inputValue.trim() && addKeyword(inputValue)}
                  disabled={!inputValue.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  <FiPlus className="ml-1" />
                  إضافة
                </button>
              </div>

              {/* التلميحات والإرشادات */}
              <div className="mt-2 text-xs text-gray-500 space-y-1">
                <p>• اضغط Enter لإضافة الكلمة</p>
                <p>• Backspace لحذف آخر كلمة</p>
                <p>• الصق قائمة كلمات مفصولة بفواصل لإضافة متعددة</p>
                <p>• {keywords.length}/15 كلمة مفتاحية</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* مؤشر التقدم */}
      {keywords.length > 0 && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>عدد الكلمات</span>
            <span>{keywords.length}/15</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((keywords.length / 15) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
