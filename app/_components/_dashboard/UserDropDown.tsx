"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { instance } from "@/app/_helpers/axios";
import Cookie from "cookie-universal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/redux/hooks";
import { clearUser } from "@/app/redux/slices/userSlice";
import Img from "../_global/Img";
import { setShowUserButton } from "@/app/redux/slices/variablesSlice";
import LoadingPage from "./LoadingPage";

export default function UserDropDown() {
  const cookie = Cookie();

  const router = useRouter();

  const dispatch = useDispatch();
  const { showUserButton } = useAppSelector((state) => state.variables);
  const { user, loading } = useAppSelector((state) => state.user);

  const toggleDropdown = () => {
    dispatch(setShowUserButton(!showUserButton));
  };

  const handleLogout = async () => {
    try {
      const response = await instance.post(`/logout`);
      if (response.status == 200) {
        const userId = cookie.get("user_id");
        if (userId) {
          cookie.remove(`madaPlus_token`);
        }
        dispatch(clearUser());
        dispatch(setShowUserButton(false));
        toast.success("تم تسجيل الخروج بنجاح");
        router.push(`/ar/login`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // if (loading) return <LoadingPage />;

  if (!user) return null;

  const email = user?.email;
  const name = user?.name;

  return (
    <div className="relative z-999999">
      <div onClick={toggleDropdown} className="flex items-center gap-2 ">
        <Img
          src={user?.image ?? "/male-noimage.jpg"}
          errorSrc="/defaults/male-noimage.jpg"
          className="border border-gray-200 shadow-md cursor-pointer rounded-full w-10 h-10  max-md:w-8 max-md:h-8"
        />
        <div className="flex flex-col text-[12px] text-white">
          <div className="flex items-center gap-2">
            <p className="max-md:hidden">
              {name?.length > 10 ? name?.slice(0, 10) + "..." : name}
            </p>
            <FaAngleDown />
          </div>
          <p className="max-md:hidden">
            {email?.length > 20 ? email?.slice(0, 20) + "..." : email}
          </p>
        </div>
      </div>
      <AnimatePresence>
        {showUserButton && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            <div className="py-1">
              <Link
                onClick={() => dispatch(setShowUserButton(false))}
                href="/ar"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaHome className="mr-2" />
                الصفحة الرئيسية
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2" />
                تسجيل الخروج
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
