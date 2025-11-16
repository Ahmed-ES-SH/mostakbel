// أنواع الفئة (Category)
type Category = {
  id: number;
  title_en: string;
  title_ar: string;
  icon_name: string;
  // ... قد تكون هناك خصائص أخرى
};

// نوع الكاتب (Author)
type Author = {
  id: number;
  name: string;
  email: string;
  role: string;
  // ... قد تكون هناك خصائص أخرى
};

// نوع الوسم (Tag)
type Tag = {
  id: number;
  name: string;
  slug: string;
  type: string;
  created_at: string;
  updated_at: string;
  pivot: {
    new_id: number;
    tag_id: number;
    created_at: string;
    updated_at: string;
  };
};

// نوع المقال (News)
type News = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  category_id: number;
  author_id: number;
  status: "published" | "draft" | "scheduled"; // يمكن إضافة المزيد إذا كان هناك حالات أخرى
  published_at: string;
  scheduled_for: string | null;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  order: number;
  view_count: number;
  share_count: number;
  like_count: number;
  project_id: number | null;
  created_at: string;
  updated_at: string;
  category: Category;
  tags: Tag[];
  author: Author;
};

// الخصائص التي سيتلقاها المكون
type NewsEditFormProps = {
  newsData: News;
  categories: Category[];
  onSave?: (updatedNews: News) => void;
  onCancel?: () => void;
};
