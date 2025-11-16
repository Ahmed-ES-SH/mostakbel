import { Category } from "../_ProjectPage/type";

// types/article.ts
export interface ArticleType {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  category_id: number;
  author_id: number;
  status: "published" | "draft" | "scheduled";
  published_at: string;
  scheduled_for: string | null;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  view_count: number;
  share_count: number;
  like_count: number;
  order: number;
  project_id: number | null;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    title_en: string;
    title_ar: string;
    icon_name: string;
  };
  tags: any[];
  author: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export interface ArticleFormData {
  title: string;
  content: string;
  excerpt: string;
  image: string;
  category_id: number | string;
  status: "published" | "draft" | "scheduled";
  scheduled_for: string | null;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  order: number;
}
