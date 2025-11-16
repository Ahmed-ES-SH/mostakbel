"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/app/_hooks/useTranslation";
import ProjectCard from "../_home/_projectsSwiper/ProjectCard";
import { useLocale } from "@/app/_hooks/useLocale";
import { ProjectType } from "../../_dashboard/_projects/_projectCard/ProjectCard";
import { useEffect, useRef, useState } from "react";
import PaginationCompoennt from "../../_global/Pagination";
import { instance } from "@/app/_helpers/axios"; // axios instance

interface Props {
  projectsData: ProjectType[];
  pagination: {
    current_page: number;
    last_page: number;
  };
}

export default function FeaturedProjectsSection({
  projectsData,
  pagination,
}: Props) {
  const t = useTranslation("featured");
  const locale = useLocale();

  const [projects, setProjects] = useState<ProjectType[]>(projectsData ?? []);
  const [currentPage, setCurrentPage] = useState<number>(
    pagination?.current_page ?? 1
  );
  const [lastPage, setLastPage] = useState<number>(pagination?.last_page ?? 1);
  const [loading, setLoading] = useState<boolean>(false);

  const abortRef = useRef<AbortController | null>(null);
  const userTriggeredRef = useRef(false);

  const fetchPage = async (page: number) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      const response = await instance.get(`/public-projects?page=${page}`, {
        signal: controller.signal as any,
      });
      if (response.status === 200) {
        const p = response.data.pagination;
        setProjects(response.data.data || []);
        setCurrentPage(p.current_page);
        setLastPage(p.last_page);
      }
    } catch (err: any) {
      const isCanceled =
        err?.code === "ERR_CANCELED" ||
        err?.name === "CanceledError" ||
        err?.message === "canceled";
      if (!isCanceled) console.error("Failed loading projects page", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userTriggeredRef.current) {
      userTriggeredRef.current = false;
      return;
    }
    userTriggeredRef.current = false;
    fetchPage(currentPage);

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage && newPage !== currentPage) {
      userTriggeredRef.current = true;
      setCurrentPage(newPage);
    }
  };

  return (
    <section
      id="projects-section"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="c-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6 text-balance">
            {t.title}
          </h2>
        </motion.div>

        {projects.length > 0 ? (
          <div className="w-full grid grid-cols-4 gap-4">
            {projects.map((project, index) => (
              <ProjectCard
                locale={locale}
                project={project}
                key={`project-${index}`}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <svg
              className="w-16 h-16 mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-2a4 4 0 018 0v2m-4 4v-4m0-4V5a2 2 0 114 0v8a2 2 0 11-4 0z"
              />
            </svg>
            <p className="text-lg sm:text-xl">
              {loading ? "Loading projects..." : "No projects available."}
            </p>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mt-8">
            <PaginationCompoennt
              currentPage={currentPage}
              totalPages={lastPage}
              onPageChange={handlePageChange}
              disapled={loading}
            />
          </div>
        )}
      </div>
    </section>
  );
}
