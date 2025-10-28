"use client";
import { useAppDispatch } from "@/app/redux/hooks";
import { setWidth } from "@/app/redux/slices/variablesSlice";
import React, { ReactNode, useEffect } from "react";

interface props {
  children: ReactNode;
}

export default function ClientLayout({ children }: props) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const updateWidth = () => {
      dispatch(setWidth(window.innerWidth));
    };

    // التعيين عند أول تحميل
    updateWidth();

    // التحديث عند تغيير حجم الشاشة
    window.addEventListener("resize", updateWidth);

    // تنظيف الـ listener عند إزالة الـ component
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [dispatch]);

  return <div className="w-full">{children}</div>;
}
