// lib/getServerTranslation.ts
import { headers } from "next/headers";
import ar from "@/messages/ar.json";
import en from "@/messages/en.json";

// Supported locales
type Locale = "ar" | "en";

// Infer translation types from JSON
type Messages = typeof ar;

// Get top-level namespaces (e.g. "mainMeta", "home", ...)
type Namespace = keyof Messages;

const messages: Record<Locale, Messages> = { ar, en };

// 🧠 Main server translation function
export async function getServerTranslation<N extends Namespace>(
  namespace: N,
  locale?: Locale
): Promise<Messages[N]> {
  // Try to detect locale from headers if not provided
  if (!locale) {
    const localeHeader = (await headers()).get("x-locale");
    locale = (localeHeader as Locale) || "en";
  }

  // Select message object
  const langMessages = messages[locale] || messages.en;

  // Return the namespace object itself
  return langMessages[namespace];
}
