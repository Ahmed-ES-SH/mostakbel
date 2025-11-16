// data/mockComments.ts

import { Comment } from "./CommentsSection";

export const mockComments: Comment[] = [
  {
    id: 1,
    user_name: "أحمد محمد",
    user_avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content:
      "مقال رائع جداً! تمكين المرأة الاقتصادي هو أساس تقدم المجتمعات. شكراً على هذه المعلومات القيمة.",
    created_at: "2024-01-15T10:30:00.000Z",
    likes: 12,
    replies: [
      {
        id: 2,
        user_name: "فاطمة علي",
        user_avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        content:
          "أوافقك الرأي أحمد، خاصة فيما يخص دعم المشاريع الصغيرة للنساء.",
        created_at: "2024-01-15T14:20:00.000Z",
        likes: 3,
      },
    ],
  },
  {
    id: 3,
    user_name: "سارة عبدالله",
    user_avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content:
      "أتمنى أن تتبنى الحكومة المزيد من البرامج لدعم المرأة في سوق العمل. المقال قدم رؤية واضحة للتحديات والحلول.",
    created_at: "2024-01-14T16:45:00.000Z",
    likes: 8,
  },
  {
    id: 4,
    user_name: "خالد إبراهيم",
    user_avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content:
      "كمشروع صغير مملوك لسيدة، أستطيع تأكيد أهمية التدريب المهني في نجاح المشروع. شكراً لتسليط الضوء على هذا الموضوع.",
    created_at: "2024-01-13T09:15:00.000Z",
    likes: 15,
  },
];
