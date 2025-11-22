"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/app/_hooks/useLocale";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function LanguageBtn() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const [open, setOpen] = useState(false);

  const languages = ["ar", "en", "nl"]; // Add Dutch

  const handleSelectLanguage = (lang: string) => {
    const pathWithoutLocale = pathname.split("/").slice(2).join("/");
    const queryString = searchParams.toString();

    router.push(
      `/${lang}/${pathWithoutLocale}${queryString ? "?" + queryString : ""}`
    );

    setOpen(false);
  };

  return (
    <div className="relative flex justify-center items-center">
      {/* Main Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-primary text-white w-12 h-12  rounded-full hover:bg-light-primary-color duration-300"
      >
        {locale.toUpperCase()}
      </button>

      {/* Circles container */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-3 flex flex-col gap-2"
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang}
                onClick={() => handleSelectLanguage(lang)}
                initial={{ scale: 0, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: -10 }}
                transition={{
                  delay: index * 0.3, // delay between circles
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className="w-12 h-12 rounded-full bg-primary text-white text-sm flex items-center justify-center shadow-md cursor-pointer hover:bg-light-primary-color"
              >
                {lang.toUpperCase()}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
