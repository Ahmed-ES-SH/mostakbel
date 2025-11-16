import React from "react";
import Topbar from "@/app/_components/_dashboard/Topbar";
import Sidebar from "@/app/_components/_dashboard/Sidebar";
import FetchData from "@/app/_helpers/FetchData";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await FetchData(`/current-user`, false);

  if (user.error) redirect(`/ar/login`);

  // تأكد أن redirect تم في useEffect — عندها سيمنع العرض
  if (!user.error && user.role != "admin") redirect(`/ar/forbidden`);

  return (
    <div dir="rtl">
      <Topbar />
      <div className="flex items-start w-full gap-1 h-fit max-md:overflow-visible z-99">
        <Sidebar />
        <div className="w-full h-full overflow-y-auto duration-200 mt-20 px-2 lg:px-6">
          {children}
        </div>
      </div>
    </div>
  );
}
