"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLocale } from "@/app/_hooks/useLocale";
import { motion } from "framer-motion";
import { NewsCard } from "./NewsCard";
import PaginationComponent from "../../_global/Pagination";
import { FaSearch } from "react-icons/fa";
import { formatDate } from "@/app/_helpers/GlobalHelpers";
import { instance } from "@/app/_helpers/axios";
import { VscLoading } from "react-icons/vsc";
import { CiNoWaitingSign } from "react-icons/ci";
import LocaleLink from "../../_global/LocaleLink";

interface Props {
  data: News[];
  pagination: {
    current_page: number;
    last_page: number;
  };
}

export default function NewsList({ data, pagination }: Props) {
  const locale = useLocale();

  // state
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(pagination?.current_page ?? 1);
  const [lastPage, setLastPage] = useState(pagination?.last_page ?? 1);
  const [news, setNews] = useState<News[]>(data ?? []);
  const [loading, setLoading] = useState(false);

  // refs for initial data + debounce + abort
  const initialDataRef = useRef<News[]>(data ?? []);
  const initialPaginationRef = useRef(
    pagination ?? { current_page: 1, last_page: 1 }
  );
  const debounceRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // helper: restore initial SSR data immediately (no network)
  const restoreInitial = () => {
    // cancel pending debounce / requests
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    // restore
    setNews(initialDataRef.current);
    setLastPage(initialPaginationRef.current.last_page);
    setCurrentPage(initialPaginationRef.current.current_page);
    setLoading(false);
  };

  // fetch search results (debounced caller will call this)
  const fetchSearchResults = async (query: string, page = 1) => {
    // cancel previous request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      const q = encodeURIComponent(query || "");
      const resp = await instance.get(`/public-news?page=${page}&query=${q}`, {
        signal: controller.signal,
      });

      if (resp.status === 200) {
        setNews(resp.data.data);
        setLastPage(resp.data.pagination.last_page);
        setCurrentPage(resp.data.pagination.current_page);
      }
    } catch (err: any) {
      if (err.name === "CanceledError" || err.name === "AbortError") {
        // cancelled — ignore
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  // handle input change: if emptied -> restore immediately; else debounce search
  const onSearchChange = (value: string) => {
    // reset pagination to page 1 on new search
    setCurrentPage(1);
    setSearchQuery(value);

    // clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    // if empty -> restore initial instantly (best performance)
    if (value.trim() === "") {
      restoreInitial();
      return;
    }

    // else debounce call
    // we keep window.setTimeout id typed as number
    debounceRef.current = window.setTimeout(() => {
      fetchSearchResults(value, 1);
      debounceRef.current = null;
    }, 700);
  };

  // effect: when currentPage changes and there is no active search, fetch that page
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      // If there is an active search, fetch results for that page via fetchSearchResults
      // but don't double-trigger if debounce is pending: cancel debounce and fetch immediately for page changes
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      fetchSearchResults(searchQuery, currentPage);
      return;
    }

    // if search is empty and currentPage equals initial current page -> just restore initial (no network)
    if (currentPage === initialPaginationRef.current.current_page) {
      // restore initial data (fast)
      setNews(initialDataRef.current);
      setLastPage(initialPaginationRef.current.last_page);
      return;
    }

    // otherwise fetch default page (no search)
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchPage = async () => {
      try {
        setLoading(true);
        const resp = await instance.get(`/public-news?page=${currentPage}`, {
          signal: controller.signal,
        });
        if (resp.status === 200) {
          setNews(resp.data.data);
          setLastPage(resp.data.pagination.last_page);
        }
      } catch (err: any) {
        if (err.name === "CanceledError" || err.name === "AbortError") {
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    };

    fetchPage();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  return (
    <section className="c-container min-h-screen py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Header + Search */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {locale === "ar" ? "جميع الأخبار" : "All News"}
          </h2>

          {/* Search */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder={locale === "ar" ? "بحث..." : "Search..."}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[80vh]">
            <VscLoading className="animate-spin lg:size-32 size-16 text-primary-color" />
          </div>
        ) : news.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {news.map((article) => (
                <NewsCard
                  id={article.id}
                  key={article.id}
                  title={article.title}
                  description={article.excerpt}
                  image={article.image}
                  date={formatDate(article.created_at)}
                  isRTL={locale == "ar"}
                />
              ))}
            </div>

            <PaginationComponent
              currentPage={currentPage}
              totalPages={lastPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center min-h-[400px] py-12 px-4"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mb-6"
            >
              <div className="relative">
                <div className="w-24 h-24 bg-linear-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center shadow-lg">
                  <CiNoWaitingSign className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm">0</span>
                </div>
              </div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-700 mb-3 text-center"
            >
              {locale === "ar" ? "لا توجد مقالات" : "No Articles Available"}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 text-center max-w-md mb-6 leading-relaxed"
            >
              {locale === "ar"
                ? "لم نتمكن من العثور على أي مقالات تطابق معايير البحث الخاصة بك. حاول تعديل الفلتر أو البحث باستخدام كلمات أخرى."
                : "We couldn't find any articles matching your search criteria. Try adjusting your filters or searching with different keywords."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3"
            >
              <LocaleLink href="/news">
                <button className="px-6 py-2 bg-primary-color text-white rounded-lg hover:bg-primary-dark transition-colors">
                  {locale === "ar" ? "عرض الكل" : "View All"}
                </button>
              </LocaleLink>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
