interface Translations {
  ar: {
    sectionLabel: string;
    sectionTitle: string;
    viewAllButton: string;
    projects: Array<{
      title: string;
      category: string;
    }>;
  };
  en: {
    sectionLabel: string;
    sectionTitle: string;
    viewAllButton: string;
    projects: Array<{
      title: string;
      category: string;
    }>;
  };
}

// Translations
export const translations: Translations = {
  en: {
    sectionLabel: "Complete Projects",
    sectionTitle: "Our Recent Project",
    viewAllButton: "View All Projects",
    projects: [
      { title: "Child Educations", category: "Charity & Fundraising" },
      { title: "Healthcare Access", category: "Medical Support" },
      { title: "Clean Water Initiative", category: "Infrastructure" },
      { title: "Women Empowerment", category: "Skills Training" },
      { title: "Food Security Program", category: "Nutrition & Health" },
      { title: "Youth Development", category: "Education & Training" },
    ],
  },
  ar: {
    sectionLabel: "المشاريع المكتملة",
    sectionTitle: "مشروعنا الأخير",
    viewAllButton: "عرض جميع المشاريع",
    projects: [
      { title: "تعليم الأطفال", category: "الأعمال الخيرية وجمع التبرعات" },
      { title: "الوصول إلى الرعاية الصحية", category: "الدعم الطبي" },
      { title: "مبادرة المياه النظيفة", category: "البنية التحتية" },
      { title: "تمكين المرأة", category: "التدريب على المهارات" },
      { title: "برنامج الأمن الغذائي", category: "التغذية والصحة" },
      { title: "تنمية الشباب", category: "التعليم والتدريب" },
    ],
  },
};

// Mock project data
export const projectImages = [
  {
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=400&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460013477427-b0cce3e30151?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGNoYXJpdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
    hoverImage:
      "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=600&h=400&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=600&h=400&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&h=400&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=600&h=400&fit=crop",
  },
];
