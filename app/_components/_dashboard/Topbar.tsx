"use client";
import React from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import Img from "../_global/Img";
import LocaleLink from "../_global/LocaleLink";
import { setShowSidebar } from "@/app/redux/slices/variablesSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import UserDropDown from "./UserDropDown";

export default function Topbar() {
  const dispatch = useAppDispatch();
  const { showSidebar, logoSrc } = useAppSelector((state) => state.variables);

  return (
    <>
      <div
        dir="ltr"
        className="w-full fixed top-0 left-0 z-99999 h-[70px] bg-fourth-dash shadow-md"
      >
        <div className="w-[95%] h-full  mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiBars3BottomRight
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
              className={`text-white hover:scale-125 duration-200 block w-fit ml-auto size-7 cursor-pointer ${
                showSidebar ? " opacity-0 z-[-2]" : "opacity-100 z-1"
              }`}
            />

            <LocaleLink href="/" className="flex items-center justify-center">
              <Img className="w-[65px]" src={logoSrc ?? "/logo.png"} />
            </LocaleLink>
          </div>
          <div className="flex items-center gap-5 cursor-pointer">
            <UserDropDown />
          </div>
        </div>
      </div>
    </>
  );
}
