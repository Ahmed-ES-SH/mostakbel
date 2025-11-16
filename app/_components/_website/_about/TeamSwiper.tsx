"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MemberCard from "./MemberCard";
import { useTranslation } from "@/app/_hooks/useTranslation";
import type { Swiper as SwiperType } from "swiper";

// Types
export interface TeamMember {
  id: number;
  name: string;
  job_title: string;
  description: string;
  image: string;
  facebook?: string | null;
  instagram?: string | null;
  x?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  whatsapp?: string | null;
  tiktok?: string | null;
  sort: number;
  is_active: boolean;
}

interface TeamSwiperProps {
  teamMembers: TeamMember[];
}

// Main Component
export const TeamSwiper = ({ teamMembers }: TeamSwiperProps) => {
  const swiperRef = useRef<SwiperType>(null);
  const t = useTranslation("teamSiwper");

  if (teamMembers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">لا يوجد أعضاء متاحين للعرض</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            pagination={{
              clickable: true,
              el: ".team-pagination",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="pb-12"
            // إضافة هذه الخاصية لضمان ارتفاع متساوي
            autoHeight={false} // تأكد من أنها false
          >
            {teamMembers.map((member) => (
              <SwiperSlide className="h-auto" key={member.id}>
                <MemberCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Custom Pagination */}
            <div className="team-pagination flex space-x-2" />

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        .team-pagination .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: #d1d5db;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .team-pagination .swiper-pagination-bullet-active {
          background-color: #2563eb;
          opacity: 1;
          transform: scale(1.2);
        }

        .swiper-pagination-bullet:hover {
          background-color: #2563eb;
        }
      `}</style>
    </section>
  );
};
