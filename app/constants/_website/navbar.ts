import { FaBlog, FaCommentAlt, FaHome } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { SiCloudflareworkers } from "react-icons/si";

export const links = [
  {
    icon: FaHome,
    href: "/",
    label: { en: "Home", ar: "الرئيسية" },
  },
  {
    icon: IoIosInformationCircleOutline,
    href: "/about",
    label: { en: "About", ar: "عن الجمعية" },
  },
  {
    icon: SiCloudflareworkers,
    href: "/ourwork",
    label: { en: "our Work", ar: "أعمالنا" },
  },
  {
    icon: FaBlog,
    href: "/blog",
    label: { en: "Blog", ar: "الأخبار" },
  },
  {
    icon: FaCommentAlt,
    href: "/contact",
    label: { en: "Contact us", ar: "تواصل معنا" },
  },
];
