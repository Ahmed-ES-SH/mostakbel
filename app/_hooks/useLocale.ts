"use client";
import { useParams } from "next/navigation";

export function useLocale() {
  const params = useParams();
  const locale = params.locale ?? "ar";
  return locale;
}
