"use client";

import { useLocale } from "@/app/_hooks/useLocale";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LanguageBtn() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const handleChangeLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";

    // Remove current locale from URL path
    const pathWithoutLocale = pathname.split("/").slice(2).join("/");
    const queryString = searchParams.toString();

    router.push(
      `/${newLocale}/${pathWithoutLocale}${
        queryString ? "?" + queryString : ""
      }`
    );
  };

  return (
    <button
      onClick={handleChangeLanguage}
      className="relative group overflow-hidden bg-primary hover:underline hover:bg-light-primary-color duration-300 text-white py-2 md:py-4 px-4 rounded-full flex items-center justify-center"
    >
      {locale === "ar" ? "English" : "العربية"}
    </button>
  );
}
