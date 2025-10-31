// Mock blog articles data
export interface BlogArticle {
  id: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  category: string;
  image: string;
  date: string;
  tags: string[];
}

export const mockArticles: BlogArticle[] = [
  {
    id: 1,
    title: {
      en: "Getting Started with Next.js",
      ar: "البدء مع Next.js",
    },
    description: {
      en: "Learn the fundamentals of Next.js and build your first application with the App Router.",
      ar: "تعلم أساسيات Next.js وبناء تطبيقك الأول باستخدام App Router.",
    },
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    date: "2024-01-15",
    tags: ["nextjs", "web-development", "javascript"],
  },
  {
    id: 2,
    title: {
      en: "The Power of Community",
      ar: "قوة المجتمع",
    },
    description: {
      en: "Discover how communities drive innovation and create meaningful change in the world.",
      ar: "اكتشف كيف تدفع المجتمعات الابتكار وتخلق تغييراً ذا مغزى في العالم.",
    },
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    date: "2024-01-12",
    tags: ["community", "collaboration", "growth"],
  },
  {
    id: 3,
    title: {
      en: "Education in the Digital Age",
      ar: "التعليم في العصر الرقمي",
    },
    description: {
      en: "Explore how digital tools are transforming education and making learning accessible to everyone.",
      ar: "استكشف كيف تحول الأدوات الرقمية التعليم وتجعل التعلم متاحاً للجميع.",
    },
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1437914983566-976d85602771?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGNoYXJpdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
    date: "2024-01-10",
    tags: ["education", "digital", "learning"],
  },
  {
    id: 4,
    title: {
      en: "Sustainable Development Goals",
      ar: "أهداف التنمية المستدامة",
    },
    description: {
      en: "Understanding the UN's sustainable development goals and how we can contribute to a better future.",
      ar: "فهم أهداف التنمية المستدامة للأمم المتحدة وكيف يمكننا المساهمة في مستقبل أفضل.",
    },
    category: "Sustainability",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
    date: "2024-01-08",
    tags: ["sustainability", "environment", "goals"],
  },
  {
    id: 5,
    title: {
      en: "Mastering TypeScript",
      ar: "إتقان TypeScript",
    },
    description: {
      en: "A comprehensive guide to TypeScript for building robust and scalable applications.",
      ar: "دليل شامل لـ TypeScript لبناء تطبيقات قوية وقابلة للتوسع.",
    },
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    date: "2024-01-05",
    tags: ["typescript", "programming", "development"],
  },
  {
    id: 6,
    title: {
      en: "The Art of Giving",
      ar: "فن العطاء",
    },
    description: {
      en: "Explore the profound impact of charitable giving and how it transforms lives and communities.",
      ar: "استكشف التأثير العميق للعطاء الخيري وكيف يحول الحياة والمجتمعات.",
    },
    category: "Charity",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop",
    date: "2024-01-03",
    tags: ["donation", "charity", "community"],
  },
  {
    id: 7,
    title: {
      en: "Web Design Trends 2024",
      ar: "اتجاهات تصميم الويب 2024",
    },
    description: {
      en: "Discover the latest web design trends that are shaping the digital landscape this year.",
      ar: "اكتشف أحدث اتجاهات تصميم الويب التي تشكل المشهد الرقمي هذا العام.",
    },
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    date: "2023-12-28",
    tags: ["design", "web", "trends"],
  },
  {
    id: 8,
    title: {
      en: "Building Accessible Applications",
      ar: "بناء تطبيقات يمكن الوصول إليها",
    },
    description: {
      en: "Learn best practices for creating web applications that are accessible to everyone.",
      ar: "تعلم أفضل الممارسات لإنشاء تطبيقات ويب يمكن الوصول إليها من قبل الجميع.",
    },
    category: "Accessibility",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    date: "2023-12-25",
    tags: ["accessibility", "web", "inclusive"],
  },
  {
    id: 9,
    title: {
      en: "The Future of AI",
      ar: "مستقبل الذكاء الاصطناعي",
    },
    description: {
      en: "Exploring the potential and challenges of artificial intelligence in shaping our future.",
      ar: "استكشاف إمكانيات وتحديات الذكاء الاصطناعي في تشكيل مستقبلنا.",
    },
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1521493959102-bdd6677fdd81?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGNoYXJpdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
    date: "2023-12-20",
    tags: ["ai", "technology", "future"],
  },
  {
    id: 10,
    title: {
      en: "Mental Health Awareness",
      ar: "الوعي بالصحة النفسية",
    },
    description: {
      en: "Understanding the importance of mental health and resources available for support.",
      ar: "فهم أهمية الصحة النفسية والموارد المتاحة للدعم.",
    },
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1615897570286-da936a5dfb81?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGNoYXJpdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
    date: "2023-12-15",
    tags: ["health", "wellness", "awareness"],
  },
];

export const categories = [
  "Technology",
  "Community",
  "Education",
  "Sustainability",
];

export const allTags = [
  "donation",
  "community",
  "education",
  "web-development",
  "javascript",
  "collaboration",
  "growth",
  "digital",
  "learning",
  "environment",
  "goals",
  "programming",
  "development",
  "charity",
  "design",
  "web",
  "trends",
  "accessibility",
  "inclusive",
  "ai",
  "technology",
  "future",
  "health",
  "wellness",
  "awareness",
];
