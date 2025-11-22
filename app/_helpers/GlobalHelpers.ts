import * as FaIcons from "react-icons/fa";
import crypto from "crypto";
import { isToday, isYesterday, isThisWeek, format, parseISO } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { RiTwitterXFill } from "react-icons/ri";

const ALGORITHM = "aes-256-cbc";

export type ImageType = string | File | null;

const Icons = {
  ...FaIcons,
  RiTwitterXFill,
};

export const getIconComponent = (iconName: string) => {
  return Icons[iconName as keyof typeof FaIcons] || Icons.RiTwitterXFill;
};

export const formatTitle = (title?: string) => {
  if (!title || title.trim() === "") {
    return "no-title"; // fallback slug if no title is provided
  }

  return title.toLowerCase().replace(/\s+/g, "-");
};

export const truncateContent = (text: string, maxLength = 120) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export function encryptToken(token: string) {
  const key = crypto
    .createHash("sha256")
    .update(process.env.NEXT_PUBLIC_ENCRYPTION_KEY!)
    .digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(token, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted; // حفظ IV مع النص المشفر
}

export function decryptToken(encryptedToken: string) {
  const key = crypto
    .createHash("sha256")
    .update(process.env.NEXT_PUBLIC_ENCRYPTION_KEY!)
    .digest();
  const [ivHex, encrypted] = encryptedToken.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export function formatTime(
  dateInput: string | Date,
  locale: "en" | "ar" | "nl" = "en"
): string {
  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;

  const isArabic = locale === "ar";
  const dateLocale = isArabic ? ar : enUS;

  if (isToday(date)) {
    return format(date, "HH:mm", { locale: dateLocale });
  }

  if (isYesterday(date)) {
    return isArabic
      ? `أمس الساعة ${format(date, "HH:mm", { locale: dateLocale })}`
      : `Yesterday at ${format(date, "HH:mm", { locale: dateLocale })}`;
  }

  if (isThisWeek(date)) {
    return isArabic
      ? `${format(date, "EEEE", { locale: ar })} الساعة ${format(
          date,
          "HH:mm"
        )}`
      : `${format(date, "EEEE", { locale: enUS })} at ${format(date, "HH:mm")}`;
  }

  return format(date, "yyyy/MM/dd 'at' HH:mm", { locale: dateLocale });
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export function formatTimewithLocale(
  dateInput: string | Date,
  locale: "en" | "ar" | "nl" = "en"
): string {
  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;

  const isArabic = locale === "ar";
  const dateLocale = isArabic ? ar : enUS;

  if (isToday(date)) {
    return format(date, "HH:mm", { locale: dateLocale });
  }

  if (isYesterday(date)) {
    return isArabic
      ? `أمس الساعة ${format(date, "HH:mm", { locale: dateLocale })}`
      : `Yesterday at ${format(date, "HH:mm", { locale: dateLocale })}`;
  }

  if (isThisWeek(date)) {
    return isArabic
      ? `${format(date, "EEEE", { locale: ar })} الساعة ${format(
          date,
          "HH:mm"
        )}`
      : `${format(date, "EEEE", { locale: enUS })} at ${format(date, "HH:mm")}`;
  }

  return format(date, "yyyy/MM/dd 'at' HH:mm", { locale: dateLocale });
}

export const getImageSrc = (src: ImageType) => {
  if (typeof src == "string") {
    return src;
  }

  if (src instanceof File) {
    return URL.createObjectURL(src);
  }

  return "/upload.png";
};
