// تعريف نوع بيانات العضو
export interface Member {
  id: number;
  name: string;
  job_title: string;
  description: string;
  image: string | null;
  facebook: string | null;
  instagram: string | null;
  x: string | null;
  linkedin: string | null;
  youtube: string | null;
  whatsapp: string | null;
  tiktok: string | null;
  sort: number;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

// تعريف نوع بيانات النموذج
export interface MemberFormData {
  name: string;
  job_title: string;
  description: string;
  image: string | File | null;
  facebook: string | null;
  instagram: string | null;
  x: string | null;
  linkedin: string | null;
  youtube: string | null;
  whatsapp: string | null;
  tiktok: string | null;
  is_active: boolean;
}

// تعريف خصائص المكون
export interface MembersManagementProps {
  members: Member[];
  pagination: {
    current_page: number;
    last_page: number;
  };
}
