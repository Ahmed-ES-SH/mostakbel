"use client";
import { motion } from "framer-motion";
import { Member } from "./types";
import {
  FaEdit,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTrash,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

interface props {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
}

export default function MemberDashCard({ member, onEdit, onDelete }: props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
    >
      <div className="relative">
        <img
          src={member.image || "/placeholder-avatar.jpg"}
          alt={member.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => onEdit(member)}
            className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
          >
            <FaEdit size={14} />
          </button>
          <button
            onClick={() => onDelete(member)}
            className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-colors"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
        <p className="text-blue-600 font-medium mt-1">{member.job_title}</p>
        <p className="text-gray-600 mt-3 line-clamp-3">{member.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {member.facebook && (
            <a
              href={member.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900"
            >
              <FaFacebook size={18} />
            </a>
          )}
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800"
            >
              <FaInstagram size={18} />
            </a>
          )}
          {member.x && (
            <a
              href={member.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-black"
            >
              <FaTwitter size={18} />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaLinkedin size={18} />
            </a>
          )}
          {member.youtube && (
            <a
              href={member.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800"
            >
              <FaYoutube size={18} />
            </a>
          )}
          {member.whatsapp && (
            <a
              href={member.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800"
            >
              <FaWhatsapp size={18} />
            </a>
          )}
          {member.tiktok && (
            <a
              href={member.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-black"
            >
              <FaTiktok size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
