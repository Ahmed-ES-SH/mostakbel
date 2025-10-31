import React, { ReactNode } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./globals.css";

export default function Rootlayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
