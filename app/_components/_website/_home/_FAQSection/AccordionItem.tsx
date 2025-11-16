"use client";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export interface FAQ {
  question: string;
  answer: string;
}

interface AccordionItemProps {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isRTL: boolean;
}
export default function AccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
  isRTL,
}: AccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className={`w-full py-6 px-6 flex items-center justify-between ltr:text-left rtl:text-right hover:bg-gray-50 transition-colors`}
        aria-expanded={isOpen}
      >
        <span
          className={`text-lg font-medium text-gray-800 flex-1 ${
            isRTL ? "ml-4" : "mr-4"
          }`}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <FiChevronDown className="w-6 h-6 text-gray-600" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className={`px-6 pb-6 text-gray-600 leading-relaxed text-${
                isRTL ? "right" : "left"
              }`}
            >
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
