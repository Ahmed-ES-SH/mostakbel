"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { useLocale } from "@/app/_hooks/useLocale";
import "swiper/css";
import "swiper/css/effect-fade";
import Img from "@/app/_components/_global/Img";

// Slide type
type Slide = {
  image: string;
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
};

export default function HeroSwiper() {
  const locale = useLocale();
  const t = useTranslation("hero");

  // Default slides data
  const slides: Slide[] = [
    {
      image: "/website/slide1.jpg",
      title: {
        en: "Every Donation Counts",
        ar: "كل تبرع يصنع فرقًا",
      },
      subtitle: {
        en: "Every Heart Matters",
        ar: "كل قلب له قيمة",
      },
    },
    {
      image: "/website/slide2.jpg",
      title: {
        en: "Together We Can Make a Change",
        ar: "معًا يمكننا إحداث التغيير",
      },
      subtitle: {
        en: "Your Help Brings Hope",
        ar: "مساعدتك تجلب الأمل",
      },
    },
    {
      image: "/website/slide3.jpg",
      title: {
        en: "Give a Hand to Those in Need",
        ar: "مد يد العون للمحتاجين",
      },
      subtitle: {
        en: "Small Acts, Big Impact",
        ar: "أفعال صغيرة، تأثير كبير",
      },
    },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* shape image */}
              <Img
                className="lg:w-[380px] w-[320px] z-4 absolute bottom-0 left-0"
                src="/website/shap-2.png"
              />

              {/* main image */}
              <Img
                src={slide.image}
                alt={slide.title.en}
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
                  {slide.title[locale]}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                  className="text-white text-2xl sm:text-4xl font-semibold mb-8"
                >
                  {slide.subtitle[locale]}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex gap-4 flex-wrap justify-center"
                >
                  <Button
                    size="lg"
                    className="bg-stone-800 py-6 px-8 rounded-full text-xl hover:bg-stone-700 text-white"
                  >
                    {t.discover}
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="flex items-center py-6 px-8 rounded-full text-xl gap-2 bg-light-primary-color hover:bg-primary-color text-white"
                  >
                    <FaPlay className="text-sm" />
                    {t.watchVideo}
                  </Button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
