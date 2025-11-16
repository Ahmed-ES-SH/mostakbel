"use client";
import { useLocale } from "@/app/_hooks/useLocale";
import React from "react";
import { FaProjectDiagram, FaNewspaper, FaBlog } from "react-icons/fa";

interface Props {
  categoryTitle: string;
  targetPage: "projects" | "news" | "blog";
}

export default function CategoryHeader({ categoryTitle, targetPage }: Props) {
  const locale = useLocale();

  const pageConfig = {
    projects: {
      icon: FaProjectDiagram,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      iconColor: "text-blue-600",
      description:
        locale === "ar"
          ? "استكشف مشاريعنا المتميزة في:"
          : "Discover our outstanding projects in:",
    },
    news: {
      icon: FaNewspaper,
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      iconColor: "text-green-600",
      description:
        locale === "ar" ? "تابع آخر الأخبار في:" : "Follow the latest news in:",
    },
    blog: {
      icon: FaBlog,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      iconColor: "text-purple-600",
      description:
        locale === "ar"
          ? "اقرأ مقالاتنا المتعلقة بـ:"
          : "Read our articles about:",
    },
  };

  const config = pageConfig[targetPage];
  const IconComponent = config.icon;

  return (
    <section
      className={`px-4 py-8 ${config.bgColor} border-l-4 ${config.borderColor} rounded-r-lg mb-6`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-white border ${config.borderColor}`}>
          <IconComponent className={`text-2xl ${config.iconColor}`} />
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {categoryTitle}
          </h1>

          <p className="text-gray-700">
            {config.description}{" "}
            <span className="font-semibold text-gray-900">{categoryTitle}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
