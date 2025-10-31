"use client";

import { useEffect, useState } from "react";
import NavDiv from "./_navbar/NavDiv";
import Img from "./Img";
import { FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import LocaleLink from "./LocaleLink";
import BottomNavbar from "./_navbar/BottomNavbar";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/app/_hooks/useLocale";

export default function Navbar() {
  const locale = useLocale();
  const [hideWhitePart, setHideWhitePart] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) setHideWhitePart(true);
      else setHideWhitePart(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentDetailes = [
    {
      title: {
        en: "Locate Address:",
        ar: "العنوان:",
      },
      value: "Damascus, Syria - Al-Mazzeh",
    },
    {
      title: {
        en: "Call us any time:",
        ar: "اتصل بنا في أي وقت:",
      },
      value: "+963 944 123 456",
    },
    {
      title: {
        en: "Email us any time:",
        ar: "راسلنا في أي وقت:",
      },
      value: "info@hewar-peace.org",
    },
  ];

  const socialIcons = [
    {
      icon: FaFacebook,
      href: "www.facebook.com",
    },
    {
      icon: FaYoutube,
      href: "www.youtube.com",
    },
    {
      icon: FaLinkedin,
      href: "www.linkedin.com",
    },
    {
      icon: FaTiktok,
      href: "www.tiktok.com",
    },
  ];

  return (
    <NavDiv>
      <div
        className={`w-full h-full ${
          hideWhitePart ? "md:bg-transparent bg-white" : "bg-white"
        }`}
      >
        <div className="c-container relative mx-auto flex flex-col items-center justify-center">
          {/* Animate presence for smooth hide/show */}
          <AnimatePresence>
            {!hideWhitePart && (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className=" items-center justify-between mx-auto py-2 w-fit hidden lg:flex lg:w-full"
              >
                {/* logo */}
                <LocaleLink href="/">
                  <Img src="/logo.png" className="w-16 hidden lg:block" />
                </LocaleLink>

                {/* current details */}
                <div className="md:flex hidden items-center gap-4">
                  {currentDetailes.map((item, index) => (
                    <div
                      key={`nav-${index}`}
                      className="flex flex-col items-start gap-2 ltr:not-last:border-r rtl:not-last:border-l ltr:pr-8 rtl:pl-8 border-gray-300"
                    >
                      <p className="text-gray-600 text-sm">
                        {item.title[locale]}
                      </p>
                      <h3 className="font-semibold text-xl xl:text-2xl">
                        {item.value}
                      </h3>
                    </div>
                  ))}
                </div>

                {/* social icons */}
                <div className="items-center gap-3 hidden xl:flex">
                  {socialIcons.map((item, index) => (
                    <LocaleLink
                      key={`social-icon-${index}`}
                      href={item.href}
                      className="lg:size-12 size-8 text-primary-color cursor-pointer hover:bg-primary-color hover:text-white duration-300 rounded-full border border-gray-200 flex items-center justify-center"
                    >
                      <item.icon className="size-6" />
                    </LocaleLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* bottom navbar */}
          <BottomNavbar hideWhitePart={hideWhitePart} />
        </div>
      </div>
    </NavDiv>
  );
}
