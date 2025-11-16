export type localeType = "en" | "ar";

interface item {
  name: string;
  type: string;
  label: { ar: string; en: string };
}

export interface InputField {
  readOnly?: boolean;
  name: string;
  type: string;
  fildType: string;
  displayKey?: string;
  label: { ar: string; en: string };
  placeholder?: string;
  items?: item[];
  selectItems?: { [key: string]: string }[];
}

export interface errorType {
  [key: string]: { ar: string; en: string };
}
