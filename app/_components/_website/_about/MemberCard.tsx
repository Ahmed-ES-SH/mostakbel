"use client";
import { motion } from "framer-motion";
import { TeamMember } from "./TeamSwiper";
import SocialIcons from "./SocialIcons";

export default function MemberCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white h-[500px] flex flex-col rounded-2xl shadow-lg overflow-hidden mx-4 border border-gray-100"
    >
      {/* الصورة - ارتفاع ثابت */}
      <div className="relative h-64 overflow-hidden shrink-0">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
      </div>

      {/* المحتوى - يأخذ المساحة المتبقية */}
      <div className="p-6 text-center max-h-64 overflow-y-auto flex flex-col grow">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-blue-600 font-semibold mb-3">{member.job_title}</p>
        <p className="text-gray-600 text-sm  leading-relaxed mb-4 grow">
          {member.description}
        </p>

        <SocialIcons member={member} />
      </div>
    </motion.div>
  );
}
