"use client";
import React, { useState } from "react";
import Link from "next/link";
import { pages } from "@/app/constants/_dashboard/sidebar";
import { usePathname } from "next/navigation";

export default function DashboardPage() {
  const pathname = usePathname();

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen py-20">
      <div className="c-container mx-auto">
        {/* الهيدر */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            مرحباً بك في لوحة التحكم
          </h1>
          <p className="text-gray-600 text-lg">
            إدارة كاملة لمنظمتك الخيرية من مكان واحد
          </p>
        </div>

        {/* البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pages.map((page, index) => {
            if (page.to === "dashboard" || page.to === "/dashboard")
              return null;

            const isDashPage = pathname == `/en/${page.to}`;
            if (isDashPage) return null;
            return (
              <div
                key={index}
                className={`bg-primary-boldgray  rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                  hoveredCard === index
                    ? "scale-105 -translate-y-2"
                    : "hover:scale-102"
                } border border-gray-200 overflow-hidden`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* الهيدر الخاص بالبطاقة */}
                <div className="bg-primary p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl  p-3 rounded-2xl">{page.icon}</div>
                    <h3 className="text-xl font-bold text-right">
                      {page.title}
                    </h3>
                  </div>
                </div>

                {/* محتوى البطاقة */}
                <div className="p-6">
                  {page.minilinks ? (
                    <div className="space-y-3 max-h-[280px] overflow-y-auto">
                      {page.minilinks.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          href={link.to}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 hover:text-black text-white transition-all duration-300 group border border-transparent hover:border-blue-200"
                        >
                          <div className=" transition-colors">{link.icon}</div>
                          <span className="text-white group-hover:text-gray-900 text-right flex-1 font-medium">
                            {link.title}
                          </span>
                          <div className="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={page.to}
                      className="block w-full mt-2 p-4 bg-primary-color text-white text-center rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                    >
                      الانتقال للصفحة
                    </Link>
                  )}
                </div>

                {/* الفوتر */}
                {page.minilinks && (
                  <div
                    dir="rtl"
                    className="px-6 py-4 bg-gray-500 border-t border-gray-400"
                  >
                    <div className="text-center text-white text-sm">
                      {page.minilinks.length} قسم متاح
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
