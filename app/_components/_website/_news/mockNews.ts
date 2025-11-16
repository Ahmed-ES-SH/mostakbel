export interface Article {
  id: number;
  title: string;
  description: string;
  category: "general" | "events" | "announcements";
  image: string;
  date: string;
}

export const mockNews: Article[] = [
  {
    id: 1,
    title: "New Training Program Launched",
    description:
      "We are excited to announce our latest training program designed for professionals in technology and innovation.",
    category: "general",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "برنامج تدريب جديد",
    description:
      "نحن متحمسون لإعلان برنامجنا التدريبي الأحدث المصمم للمحترفين في مجال التكنولوجيا والابتكار.",
    category: "events",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    date: "2024-01-15",
  },
  {
    id: 3,
    title: "Conference on Digital Transformation",
    description:
      "Join us for an exclusive conference featuring industry leaders discussing the future of digital transformation.",
    category: "events",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    date: "2024-01-12",
  },
  {
    id: 4,
    title: "System Maintenance Notice",
    description:
      "Please be informed that our online portal will undergo maintenance on January 20th from 10 PM to 2 AM.",
    category: "announcements",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    date: "2024-01-10",
  },
  {
    id: 5,
    title: "Success Stories from Our Alumni",
    description:
      "Read inspiring success stories from our graduates who have made significant impact in their fields.",
    category: "general",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    date: "2024-01-08",
  },
  {
    id: 6,
    title: "Workshop on AI and Machine Learning",
    description:
      "Participate in our hands-on workshop exploring the latest developments in AI and machine learning technologies.",
    category: "events",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    date: "2024-01-05",
  },
  {
    id: 7,
    title: "New Scholarship Program",
    description:
      "We are introducing a new scholarship program to support talented students from underprivileged backgrounds.",
    category: "announcements",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    date: "2024-01-02",
  },
  {
    id: 8,
    title: "Research Publication Highlight",
    description:
      "Our team has published groundbreaking research on sustainable technology solutions in leading journals.",
    category: "general",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    date: "2023-12-28",
  },
  {
    id: 9,
    title: "Networking Event Success",
    description:
      "Our recent networking event brought together over 200 professionals for meaningful connections and collaborations.",
    category: "events",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    date: "2023-12-25",
  },
  {
    id: 10,
    title: "Holiday Break Schedule",
    description:
      "Please note that our center will be closed from December 24th to January 2nd for the holiday season.",
    category: "announcements",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    date: "2023-12-20",
  },
];
