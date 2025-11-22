// تعريف واجهة بيانات الشريحة
export interface Slice {
  id: number;
  title_en: string;
  title_ar: string;
  title_nl: string;
  subTitle_ar: string;
  subTitle_en: string;
  subTitle_nl: string;
  link_video: string;
  image: string;
  video_path: string | null;
  created_at: string;
  updated_at: string;
}
