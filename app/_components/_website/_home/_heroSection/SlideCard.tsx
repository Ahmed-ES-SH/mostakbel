"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Img from "@/app/_components/_global/Img";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";
import { useLocale } from "@/app/_hooks/useLocale";
import { Slide } from "./HeroSection";
import VideoPopup from "./VideoPopup";

interface props {
  index: number;
  slide: Slide;
  t: any;
}

export default function SlideCard({ index, slide, t }: props) {
  const locale = useLocale();

  const [videoPopup, setVideoPopup] = useState(false);

  const title = locale == "ar" ? slide.title_ar : slide.title_en;
  const subTitle = locale == "ar" ? slide.subTitle_ar : slide.subTitle_en;
  return (
    <div className="relative w-full h-full">
      {/* shape image */}
      <Img
        className="lg:w-[380px] w-[320px] z-4 absolute bottom-0 left-0"
        src="/website/shap-2.png"
      />

      {/* main image */}
      <Img
        src={slide.image ?? "/noImage.png"}
        alt={slide.title_en}
        priority={index === 0}
        className="object-cover z-2 relative w-full h-full brightness-60"
      />

      {/* main content */}
      <div className="absolute w-full top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 flex flex-col items-center justify-center text-center px-2 lg:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white text-4xl sm:text-6xl font-extrabold mb-4"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-white text-2xl sm:text-4xl font-semibold mb-8"
        >
          {subTitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setVideoPopup(true)}
            className="flex items-center py-6 px-8 rounded-full text-xl gap-2 bg-light-primary-color hover:bg-primary-color text-white"
          >
            <FaPlay className="text-sm" />
            {t.watchVideo}
          </Button>
        </motion.div>
      </div>

      <VideoPopup
        isOpen={videoPopup}
        videoUrl={slide.link_video ?? slide.video_path}
        onClose={() => setVideoPopup(false)}
      />
    </div>
  );
}
