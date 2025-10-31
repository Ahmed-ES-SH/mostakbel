"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "@/app/_hooks/useTranslation";

interface BlogSearchProps {
  onSearch: (query: string) => void;
}

export default function BlogSearch({ onSearch }: BlogSearchProps) {
  const t = useTranslation("blog");
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
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
