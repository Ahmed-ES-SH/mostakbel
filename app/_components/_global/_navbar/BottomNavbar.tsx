"use client";
import LocaleLink from "../LocaleLink";
import { useLocale } from "@/app/_hooks/useLocale";
import { usePathname } from "next/navigation";
import { IoMdHeart } from "react-icons/io";
import LanguageBtn from "./LanguageBtn";
import { CiMenuBurger } from "react-icons/ci";
import Img from "../Img";
import { links } from "@/app/constants/_website/navbar";
import MobileDropLinks from "./MobileDropLinks";

interface props {
  hideWhitePart: boolean;
}

export default function BottomNavbar({ hideWhitePart }: props) {
  const locale = useLocale();
  const pathName = usePathname();

  return (
    <div
      className={`md:c-container w-full rounded-full  md:absolute ${
        !hideWhitePart ? "md:top-[95%]" : "md:top-1/2"
      } md:left-1/2 md:-translate-x-1/2 flex items-start justify-between gap-2`}
    >
      <div className="flex items-center justify-between md:bg-primary-color lg:py-4 flex-1/2 rounded-full gap-4 md:p-4">
        <div className="flex items-center gap-2 md:hidden">
          {/* mobail button */}
          <MobileDropLinks />
          {/* logo small screen */}
          <LocaleLink className="md:hidden" href="/">
            <Img src="/logo.png" className="w-12 md:hidden" />
          </LocaleLink>
        </div>

        {/* current links desktop */}
        <div className="md:flex hidden items-center self-start gap-4">
          {links.map((link, index) => {
            const isActive = link.href !== "/" && pathName.includes(link.href);
            return (
              <LocaleLink
                className={`flex items-center whitespace-nowrap max-md:text-sm hover:text-text-primary duration-300 gap-2 ${
                  isActive ? "text-text-primary" : "text-white"
                } `}
                key={index}
                href={link.href}
              >
                <link.icon className="size-5" />
                <p>{link.label[locale]}</p>
              </LocaleLink>
            );
          })}
        </div>
        {/* message */}
        <p className="text-white hidden 2xl:block">
          {locale == "en"
            ? "Welcome to CDCP Are you ready to help them? Let’s become avolunteers..."
            : "أهلاً بكم في CDCP. هل أنتم مستعدون لمساعدتهم؟ هيا بنا نصبح متطوعين..."}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {/* button */}
        <button className="relative hidden  whitespace-nowrap max-md:text-sm group overflow-hidden bg-primary text-white py-2 md:py-4 px-4 md:px-8 rounded-full md:flex items-center justify-center">
          <div className="flex items-center gap-2 relative order-1">
            <IoMdHeart />
            <p className="">{locale == "en" ? "Donate Now" : "تبرع الأن"}</p>
          </div>
          <span className="order-2 w-full h-full group-hover:h-0 duration-300 absolute top-0 left-0 bg-light-primary-color"></span>
        </button>

        {/* language toggle */}
        <LanguageBtn />
      </div>
    </div>
  );
}
