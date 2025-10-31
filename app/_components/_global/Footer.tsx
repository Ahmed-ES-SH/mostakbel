"use client";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import Img from "./Img";
import NewsletterSection from "./_footer/NewsletterSection";
import CopyrightFooter from "./_footer/CopyrightFooter";

export default function Footer() {
  const t = useTranslation("footer");

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Img src="/logo.png" className="w-16" />
            <p className="text-gray-300 leading-relaxed">{t.tagline}</p>
          </motion.div>

          {/* Quick Links 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">{t.links.about.title}</h4>
            <ul className="space-y-2">
              {["about", "news", "campaign", "pricing", "contact"].map(
                (item) => {
                  const aboutLinks: any = t.links.about;
                  return (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {aboutLinks[item]}
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </motion.div>

          {/* Quick Links 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">{t.links.support.title}</h4>
            <ul className="space-y-2">
              {["home", "support", "campaign", "contact"].map((item) => {
                const supportLinks: any = t.links.support;
                return (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {supportLinks[item]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">{t.contact.title}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-400" />
                <span className="text-gray-300">+163-3854-7896</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400" />
                <div className="space-y-1">
                  <div className="text-gray-300">info@bonat.com</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <CopyrightFooter />
    </footer>
  );
}
