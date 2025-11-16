import { FaBloggerB, FaQuestion, FaRegNewspaper } from "react-icons/fa";
import { LiaProjectDiagramSolid, LiaSitemapSolid } from "react-icons/lia";
import { FaLinesLeaning } from "react-icons/fa6";
import { GrArticle, GrDashboard, GrDomain } from "react-icons/gr";
import { IoMdAdd, IoMdAddCircle, IoMdPersonAdd } from "react-icons/io";
import { IoAdd, IoLayersOutline, IoShareSocialSharp } from "react-icons/io5";
import { ImStatsBars2 } from "react-icons/im";

import {
  MdOutlineAddToPhotos,
  MdOutlineDashboard,
  MdOutlineGroups,
  MdOutlineSyncProblem,
} from "react-icons/md";
import {
  PiCards,
  PiNewspaperClippingThin,
  PiUsersThreeFill,
} from "react-icons/pi";
import { RiNewsLine } from "react-icons/ri";
import { TbListDetails, TbSettingsStar } from "react-icons/tb";
import { BsInfoSquareFill } from "react-icons/bs";
import { HiOutlineDuplicate } from "react-icons/hi";
import { TfiLayersAlt, TfiLayoutSlider } from "react-icons/tfi";
import { SiImessage } from "react-icons/si";

const iconStyle = "size-6";

export const pages = [
  {
    title: "الرئيسية",
    icon: <GrDomain className={iconStyle} />,
    to: "",
    minilinks: [
      {
        title: "قسم الواجهة",
        icon: <TfiLayoutSlider className={iconStyle} />,
        to: "/dashboard/slices",
      },
      {
        title: "اهم خدمات المركز",
        icon: <TbSettingsStar className={iconStyle} />,
        to: "/dashboard/servicesdash",
      },
      {
        title: "قسم عن المنصة",
        icon: <BsInfoSquareFill className={iconStyle} />,
        to: "/dashboard/aboutsection",
      },
      {
        title: "قسم الاحصائيات",
        icon: <ImStatsBars2 className={iconStyle} />,
        to: "/dashboard/helpsection",
      },
      {
        title: "قسم الأسألة",
        icon: <FaQuestion className={iconStyle} />,
        to: "/dashboard/faqsection",
      },
      {
        title: "قسم تواصل معنا",
        icon: <SiImessage className={iconStyle} />,
        to: "/dashboard/contactsectiondash",
      },
    ],
  },
  {
    title: "المستخدمون",
    icon: <PiUsersThreeFill className={iconStyle} />,
    to: "",
    minilinks: [
      {
        title: "جميع المستخدمون",
        icon: <PiUsersThreeFill className={iconStyle} />,
        to: "/dashboard/users",
      },
      {
        title: "أضف مستخدم جديد",
        icon: <IoMdPersonAdd className={iconStyle} />,
        to: "/dashboard/adduser",
      },
    ],
  },

  {
    title: "المشاريع",
    icon: <PiCards className={iconStyle} />,
    to: "",
    minilinks: [
      {
        title: "أقسام المشاريع",
        icon: <HiOutlineDuplicate className={iconStyle} />,
        to: "/dashboard/projectcategories",
      },
      {
        title: "أضف قسم جديد",
        icon: <IoMdAdd className={iconStyle} />,
        to: "/dashboard/addprojectcategory",
      },
      {
        title: "جميع المشاريع",
        icon: <LiaProjectDiagramSolid className={iconStyle} />,
        to: "/dashboard/projects",
      },
      {
        title: "أضف  مشروع جديدة",
        icon: <IoMdAddCircle className={iconStyle} />,
        to: "/dashboard/addproject",
      },
    ],
  },

  {
    title: "المدونة",
    icon: <FaBloggerB className={iconStyle} />,
    to: "",
    minilinks: [
      {
        title: "المقالات",
        icon: <GrArticle className={iconStyle} />,
        to: "/dashboard/articles",
      },
      {
        title: "أقسام المقالات",
        icon: <IoLayersOutline className={iconStyle} />,
        to: "/dashboard/articlescategories",
      },
      {
        title: "أضف قسم جديد ",
        icon: <IoAdd className={iconStyle} />,
        to: "/dashboard/addarticlescategory",
      },
      {
        title: "أضف مقال جديدة",
        icon: <MdOutlineAddToPhotos className={iconStyle} />,
        to: "/dashboard/addarticle",
      },
    ],
  },
  {
    title: "الأخبار",
    icon: <FaRegNewspaper className={iconStyle} />,
    to: "",
    minilinks: [
      {
        title: "الأخبار",
        icon: <PiNewspaperClippingThin className={iconStyle} />,
        to: "/dashboard/news",
      },
      {
        title: "أقسام الأخبار",
        icon: <TfiLayersAlt className={iconStyle} />,
        to: "/dashboard/newscategories",
      },
      {
        title: "أضف قسم جديد ",
        icon: <IoAdd className={iconStyle} />,
        to: "/dashboard/addnewscategory",
      },
      {
        title: "أضف مقال خبرى جديدة",
        icon: <MdOutlineAddToPhotos className={iconStyle} />,
        to: "/dashboard/addnews",
      },
    ],
  },

  {
    title: "لوحة التحكم",
    icon: <MdOutlineDashboard className={iconStyle} />,
    to: "/dashboard",
  },
  {
    title: "فروع المركز",
    icon: <LiaSitemapSolid className={iconStyle} />,
    to: "/dashboard/centerbranches",
  },
  {
    title: "أعضاء المركز",
    icon: <MdOutlineGroups className={iconStyle} />,
    to: "/dashboard/centermembers",
  },
  {
    title: "حسابات التواصل الإجتماعى",
    icon: <IoShareSocialSharp className={iconStyle} />,
    to: "/dashboard/socialcontactinfo",
  },

  {
    title: "تفاصيل المركز",
    icon: <TbListDetails className={iconStyle} />,
    to: "/dashboard/companydetailes",
  },
  {
    title: "قسم الأسئلة الشائعه",
    icon: <FaQuestion className={iconStyle} />,
    to: "/dashboard/faq",
  },
  {
    title: "قسم الشكاوى",
    icon: <MdOutlineSyncProblem className={iconStyle} />,
    to: "/dashboard/problems",
  },

  {
    title: "قسم النشرة البريدية",
    icon: <RiNewsLine className={iconStyle} />,
    to: "/dashboard/newsletter",
  },
  {
    title: "روابط نهاية الموقع",
    icon: <FaLinesLeaning className={iconStyle} />,
    to: "/dashboard/footerlinks",
  },
];
