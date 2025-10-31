export const mockProject = {
  id: 1,
  title: {
    en: "Clean Water for Rural Syria",
    ar: "مياه نظيفة للريف السوري",
  },
  category: {
    en: "Water & Sanitation",
    ar: "المياه والصرف الصحي",
  },
  location: {
    en: "Idlib, Syria",
    ar: "إدلب، سوريا",
  },
  description: {
    en: "This project aims to provide clean drinking water to 5 rural villages by installing solar-powered water systems and rehabilitation of old wells. Over 500 families will directly benefit from improved access to safe water.",
    ar: "يهدف هذا المشروع إلى توفير مياه شرب نظيفة لخمسة قرى ريفية من خلال تركيب أنظمة مياه تعمل بالطاقة الشمسية وإعادة تأهيل الآبار القديمة. سيستفيد أكثر من 500 عائلة بشكل مباشر من تحسين الوصول إلى المياه النظيفة.",
  },
  longDescription: {
    en: "Access to clean water is a fundamental human right, yet millions in rural Syria lack access to safe drinking water. This comprehensive project combines modern solar technology with traditional well rehabilitation to create sustainable water solutions. Our team will work directly with local communities to ensure the systems meet their needs and are properly maintained. By 2025, we aim to transform the lives of over 5,000 people by providing reliable, clean water access.",
    ar: "الحصول على المياه النظيفة هو حق أساسي من حقوق الإنسان، ومع ذلك يفتقر الملايين في المناطق الريفية بسوريا إلى الحصول على مياه شرب نظيفة. يجمع هذا المشروع الشامل بين تكنولوجيا الطاقة الشمسية الحديثة وإعادة تأهيل الآبار التقليدية لإنشاء حلول مائية مستدامة. سيعمل فريقنا بشكل مباشر مع المجتمعات المحلية لضمان أن تفي الأنظمة باحتياجاتهم والحفاظ عليها بشكل صحيح. بحلول عام 2025، نهدف إلى تحسين حياة أكثر من 5000 شخص بتوفير وصول موثوق إلى المياه النظيفة.",
  },
  mainImage:
    "https://plus.unsplash.com/premium_photo-1661769800950-a36da6a69d44?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhcml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Solar-powered water system
  gallery: [
    "https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hhcml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Water well construction
    "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hhcml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Solar-powered water pump
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNoYXJpdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", // Family collecting clean water
    "https://images.unsplash.com/photo-1504159506876-f8338247a14a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNoYXJpdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", // Water distribution setup
  ],
  goal: 50000,
  raised: 34500,
  startDate: "2025-01-10",
  endDate: "2025-06-30",
  status: {
    en: "Ongoing",
    ar: "جارٍ",
  },
  impact: [
    {
      icon: "FaTint",
      label: { en: "Wells Repaired", ar: "الآبار المُصلحة" },
      value: 5,
    },
    {
      icon: "FaUsers",
      label: { en: "Families Supported", ar: "العائلات المستفيدة" },
      value: 500,
    },
    {
      icon: "FaLeaf",
      label: { en: "Green Systems", ar: "الأنظمة الصديقة للبيئة" },
      value: 3,
    },
    {
      icon: "FaChild",
      label: { en: "Children Benefiting", ar: "الأطفال المستفيدون" },
      value: 1200,
    },
  ],
  team: [
    {
      id: 1,
      name: { en: "Saad Alrashed", ar: "سعد الراشد" },
      role: { en: "Project Director", ar: "مديرة المشروع" },
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Professional woman
    },
    {
      id: 2,
      name: { en: "Ahmad Hassan", ar: "أحمد حسن" },
      role: { en: "Water Engineer", ar: "مهندس المياه" },
      image:
        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=500&q=80", // Professional man
    },
    {
      id: 3,
      name: { en: "Ahmed Moeshen", ar: "احمد محسن" },
      role: { en: "Community Liaison", ar: "وسيط المجتمع" },
      image:
        "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Woman portrait
    },
  ],
  testimonials: [
    {
      id: 1,
      quote: {
        en: "This project has transformed our village. Our children no longer get sick from drinking contaminated water. The solar system is reliable and sustainable.",
        ar: "غيّر هذا المشروع قريتنا تماماً. أطفالنا لم يعودوا يمرضون من شرب المياه الملوثة. النظام الشمسي موثوق وقابل للاستدامة.",
      },
      author: { en: "Umm Ahmed", ar: "أم أحمد" },
      role: { en: "Village Elder", ar: "شيخ القرية" },
      village: { en: "Al-Qusair", ar: "القصير" },
    },
    {
      id: 2,
      quote: {
        en: "The team trained us to maintain the systems ourselves. We feel empowered and proud of our new water infrastructure.",
        ar: "درّب الفريق أنفسنا على الحفاظ على الأنظمة بأنفسنا. نشعر بالتمكين والفخر بالبنية التحتية المائية الجديدة لدينا.",
      },
      author: { en: "Hassan Abu Saleem", ar: "حسن أبو سليم" },
      role: { en: "Community Member", ar: "عضو المجتمع" },
      village: { en: "Ariha", ar: "أريحا" },
    },
  ],
  relatedProjects: [
    {
      id: 2,
      title: {
        en: "Healthcare Access Program",
        ar: "برنامج الوصول إلى الرعاية الصحية",
      },
      category: { en: "Healthcare", ar: "الرعاية الصحية" },
      thumbnail:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80", // Medical clinic
      raised: 45000,
      goal: 60000,
    },
    {
      id: 3,
      title: {
        en: "Education for Displaced Children",
        ar: "التعليم للأطفال النازحين",
      },
      category: { en: "Education", ar: "التعليم" },
      thumbnail:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80", // Classroom with children
      raised: 28000,
      goal: 40000,
    },
  ],
};
