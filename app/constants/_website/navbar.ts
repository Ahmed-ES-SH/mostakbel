import { FaBlog, FaHome } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { SiCloudflareworkers } from "react-icons/si";
import { SlOrganization } from "react-icons/sl";
import { IoNewspaperOutline } from "react-icons/io5";

export const links = [
  {
    icon: FaHome,
    href: "/",
    label: { en: "Home", ar: "الرئيسية", nl: "Home" },
  },
  {
    icon: IoIosInformationCircleOutline,
    href: "/about",
    label: { en: "About", ar: "عن المركز", nl: "Over ons" },
  },
  {
    icon: SiCloudflareworkers,
    href: "/ourwork",
    label: { en: "our Work", ar: "أعمالنا", nl: "Ons Werk" },
  },
  {
    icon: FaBlog,
    href: "/blog",
    label: { en: "Blog", ar: "المدونة", nl: "Blog" },
  },
  {
    icon: IoNewspaperOutline,
    href: "/news",
    label: { en: "News", ar: "الأخبار", nl: "Nieuws" },
  },
  {
    icon: SlOrganization,
    href: "/centerbranches",
    label: { en: "Center branches", ar: "فروع المركز", nl: "Centrumafdelingen" },
  },
];

