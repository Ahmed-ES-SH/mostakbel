"use client";
import { getIconComponent } from "@/app/_helpers/GlobalHelpers";
import { TeamMember } from "./TeamSwiper";
import { motion } from "framer-motion";

// Social Media Icons Component
export default function SocialIcons({ member }: { member: TeamMember }) {
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
}
