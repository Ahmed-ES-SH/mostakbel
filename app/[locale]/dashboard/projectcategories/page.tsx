import DynamicTable from "@/app/_components/_dashboard/_dynamicComponents/DynamicTable";
import React from "react";

interface CategoryType {
  id: number;
  title_en: string;
  title_ar: string;
  bg_color: string;
  image: string;
}

export default function ProjectsCategoriesDashboardPage() {
  const headers = [
    "id",
    "صورة القسم",
    "العنوان (EN)",
    "العوان (AR)",
    "لون الخلفية",
    "ايقونة القسم",
    "تاريخ الانشاء",
  ];
  const keys = [
    { key: "id", cellType: "text" },
    { key: "image", cellType: "image" },
    { key: "title_en", cellType: "text" },
    { key: "title_ar", cellType: "text" },
    { key: "bg_color", cellType: "color" },
    { key: "icon_name", cellType: "icon" },
    {
      key: "created_at",
      cellType: "date",
    },
  ];

  return (
    <DynamicTable<CategoryType>
      itemDirect="projectcategories"
      headers={headers}
      keys={keys}
      api="/projects-categories"
      searchApi="/projects-categories/search"
      deletedApi="/delete-project-category"
    />
  );
}
