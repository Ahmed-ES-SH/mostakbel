"use client";
import React, { useEffect, useState } from "react";
import PaginationCompoennt from "../../_global/Pagination";
import LoadingSpin from "../../_global/LoadingSpin";
import { instance } from "@/app/_helpers/axios";
import { Category } from "../_ProjectPage/type";
import DashboardSidebar from "../DashboardSidebar";
import { ArticleType } from "../_articles/types";
import NewsDashCard from "./NewsDashCard";

interface Props {
  data: ArticleType[];
  categories: Category[];
  pagination: {
    current_Page: number | string;
    last_Page: number | string;
  };
  api: string;
}

export default function NewsBody({ data, pagination, categories, api }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [news, setNews] = useState<ArticleType[]>(data ?? []);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    Number(pagination?.current_Page) || 1
  );
  const [lastPage, setLastPage] = useState(Number(pagination?.last_Page) || 1);
  const [useServerData, setUseServerData] = useState(true);

  // 🧭 التعامل مع تغيير الصفحة
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setCurrentPage(newPage);
      setUseServerData(false);
    }
  };

  // 🧠 جلب المشاريع من API
  const fetchData = async () => {
    setLoading(true);
    try {
      scrollTo(0, 0);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        query: searchTerm,
        status: selectedStatus.join(","),
        categories: selectedCategories.join(","),
      });

      const response = await instance.get(`${api}?${params.toString()}`);
      if (response.status === 200) {
        setNews(response.data.data);
        setCurrentPage(response.data.pagination.current_page);
        setLastPage(response.data.pagination.last_page);
      }
    } catch (error: any) {
      console.error(error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * ✅ المنطق الذكي للجلب:
   * - عند التغيير في البحث → تأخير نصف ثانية.
   * - عند التغيير في الفلاتر أو الصفحة → جلب فوري.
   */
  useEffect(() => {
    if (useServerData) return;

    let debounceTimer: NodeJS.Timeout | null = null;

    // إذا تغيّر البحث فقط → ننتظر نصف ثانية
    if (searchTerm) {
      debounceTimer = setTimeout(() => {
        fetchData();
      }, 500);
    } else {
      // أي تغيير آخر يتم فوراً
      fetchData();
    }

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [
    searchTerm,
    selectedStatus,
    selectedCategories,
    currentPage,
    useServerData,
  ]);

  const statusOptions = [
    { value: "draft", label: "مسودة", color: "bg-gray-400" },
    { value: "under_review", label: "تحت المراجعة", color: "bg-yellow-400" },
    { value: "published", label: "تمت الموافقة", color: "bg-blue-400" },
    { value: "scheduled", label: "مجدول", color: "bg-green-400" },
    { value: "rejected", label: "مرفوض", color: "bg-red-400" },
    { value: "archived", label: "أرشيف", color: "bg-gray-600" },
  ];

  return (
    <div className="w-full flex items-start gap-3">
      <div className="lg:flex-1/2 max-lg:w-full">
        {news && news.length > 0 ? (
          <div className="min-h-screen  w-full">
            {loading ? (
              <LoadingSpin />
            ) : (
              <div className="w-full">
                <div className="grid xl:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4">
                  {news.map((article, index) => (
                    <NewsDashCard
                      setNews={setNews}
                      article={article}
                      key={`news-${index}`}
                    />
                  ))}
                </div>

                {lastPage > 1 && (
                  <PaginationCompoennt
                    currentPage={currentPage}
                    totalPages={lastPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            لا توجد مشاريع متاحة حالياً
          </div>
        )}
      </div>

      <DashboardSidebar
        categories={categories ?? []}
        selectedStatus={selectedStatus}
        selectedCategories={selectedCategories}
        onStatusChange={(val) => {
          setSelectedStatus(val);
          setUseServerData(false);
        }}
        onCategoryChange={(val) => {
          setSelectedCategories(val);
          setUseServerData(false);
        }}
        onSearch={(val) => {
          setSearchTerm(val);
          setUseServerData(false);
        }}
        searchTerm={searchTerm}
        statusOptions={statusOptions}
        title="الأخبار"
        itemTitle="الخبر"
      />
    </div>
  );
}
