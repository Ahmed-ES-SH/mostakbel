"use client";
import Img from "@/app/_components/_global/Img";
import { motion } from "framer-motion";

interface props {
  image_1?: string;
  image_2?: string;
  icon_image?: string;
}

export default function ImageCollage({
  image_1 = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
  image_2 = "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&q=80",
  icon_image = "/website/hand-group-shape1-3-1.png",
}: props) {
  return (
    <div className="relative w-full h-full">
      {/* Main large image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl"
      >
        <Img
          src={image_1}
          alt="Happy children"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Bottom middle image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute bottom-0 left-1/4 w-1/2 h-2/5 rounded-3xl overflow-hidden shadow-2xl"
      >
        <Img
          src={image_2}
          alt="Child portrait"
          className="w-full h-full object-cover filter grayscale"
        />
      </motion.div>

      {/* Top right circular image */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute top-16 right-0 w-32 h-32"
      >
        <Img
          src={icon_image}
          alt="Children together"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Decorative splash */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-4 right-1/4 w-24 h-32 bg-amber-400 rounded-full filter blur-2xl"
      />
    </div>
  );
}
