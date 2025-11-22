"use client";
import { useParams } from "next/navigation";

export type LocaleType = "en" | "ar" | 'nl';

export function useLocale() {
  const params = useParams();
  const locale = params.locale ?? "ar";
  return locale as LocaleType;
}
