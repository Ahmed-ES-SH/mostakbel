// components/team/TeamSwiper.tsx
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { getIconComponent } from "@/app/_helpers/GlobalHelpers";

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
  title?: string;
  subtitle?: string;
}

// Social Media Icons Component
const SocialIcons = ({ member }: { member: TeamMember }) => {
  const socialLinks = [
    {
      key: "facebook",
      href: member.facebook,
      icon: "FaFacebookF",
      bg: "#1877F2",
    },
    {
      key: "instagram",
      href: member.instagram,
      icon: "FaInstagram",
      bg: "linear-gradient(45deg, #fdf497, #fd5949, #d6249f, #285AEB)",
    },
    {
      key: "x",
      href: member.x,
      icon: "RiTwitterXFill",
      bg: "#000",
    },
    {
      key: "linkedin",
      href: member.linkedin,
      icon: "FaLinkedinIn",
      bg: "#0A66C2",
    },
    {
      key: "youtube",
      href: member.youtube,
      icon: "FaYoutube",
      bg: "#FF0000",
    },
    {
      key: "whatsapp",
      href: member.whatsapp,
      icon: "FaWhatsapp",
      bg: "#25D366",
    },
    {
      key: "tiktok",
      href: member.tiktok,
      icon: "FaTiktok",
      bg: "#000000",
    },
  ].filter((link) => link.href);

  if (socialLinks.length === 0) return null;

  return (
    <div className="flex justify-center space-x-3 mt-4">
      {socialLinks.map((link) => {
        const Icon = getIconComponent(link.icon);

        return (
          <motion.a
            key={link.key}
            href={link.href ? link.href : "#"}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
            style={{ background: link.bg }}
          >
            <Icon size={16} />
          </motion.a>
        );
      })}
    </div>
  );
};

// Member Card Component
const MemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden mx-4 border border-gray-100"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-blue-600 font-semibold mb-3">{member.job_title}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {member.description}
        </p>

        <SocialIcons member={member} />
      </div>
    </motion.div>
  );
};

// Main Component
export const TeamSwiper = ({
  teamMembers,
  title = "فريقنا المتخصص",
  subtitle = "تعرف على الخبراء والمتخصصين في مجال التغذية",
}: TeamSwiperProps) => {
  const swiperRef = useRef<SwiperType>(null);

  const filteredMembers = teamMembers
    .filter((member) => member.is_active)
    .sort((a, b) => a.sort - b.sort);

  if (filteredMembers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">لا يوجد أعضاء متاحين للعرض</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
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
          >
            {filteredMembers.map((member) => (
              <SwiperSlide key={member.id}>
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
