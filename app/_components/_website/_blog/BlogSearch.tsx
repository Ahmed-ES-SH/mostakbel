"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { useRouter, useSearchParams } from "next/navigation";

export default function BlogSearch() {
  const t = useTranslation("blog");
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // احصل على قيمة البحث الحالية من معاملات البحث
    const currentQuery = searchParams.get("query") || "";
    setQuery(currentQuery);
  }, [searchParams]);

  useEffect(() => {
    // تأجيل تحديث معاملات البحث حتى يتوقف المستخدم عن الكتابة لمدة 700 مللي ثانية
    const delayDebounceFn = setTimeout(() => {
      // إنشاء كائن URLSearchParams جديد من معاملات البحث الحالية
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set("query", query);
      } else {
        params.delete("query");
      }

      // تحديث الرابط دون إعادة تحميل الصفحة
      router.push(`?${params.toString()}`, { scroll: false });
    }, 700);

    // تنظيف المؤقت عند كل تغيير في query
    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        placeholder={t.searchPlaceholder}
        value={query}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  );
}
