"use client";
import Img from "@/app/_components/_global/Img";
import { getImageSrc } from "@/app/_helpers/GlobalHelpers";
import { motion } from "framer-motion";
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";

type ImageType = string | File | null;

interface props {
  image_1: ImageType;
  image_2: ImageType;
  icon_image: ImageType;
  setImages: Dispatch<SetStateAction<ImageType[]>>;
}

export default function ImageCollageControl({
  image_1,
  image_2,
  icon_image,
  setImages,
}: props) {
  const openImageRef = useRef<HTMLInputElement>(null);
  const openImage2Ref = useRef<HTMLInputElement>(null);
  const openIconImageRef = useRef<HTMLInputElement>(null);

  const handleChangeImage = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImages((prev) => {
        const newImages = [...prev];
        newImages[index] = file;
        return newImages;
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      <input
        onChange={(e) => handleChangeImage(e, 0)}
        type="file"
        name="image_1"
        ref={openImageRef}
        hidden
      />
      <input
        onChange={(e) => handleChangeImage(e, 1)}
        type="file"
        name="image_2"
        ref={openImage2Ref}
        hidden
      />
      <input
        onChange={(e) => handleChangeImage(e, 2)}
        type="file"
        name="icon_image"
        ref={openIconImageRef}
        hidden
      />

      {/* Main large image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        onClick={() => openImageRef.current?.click()}
        className="absolute select-effect top-0 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl"
      >
        <Img
          src={getImageSrc(image_1)}
          alt="Happy children"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Bottom middle image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        onClick={() => openImage2Ref.current?.click()}
        className="absolute select-effect bottom-0 left-1/4 w-1/2 h-2/5 rounded-3xl overflow-hidden shadow-2xl"
      >
        <Img
          src={getImageSrc(image_2)}
          alt="Child portrait"
          className="w-full h-full object-cover filter grayscale"
        />
      </motion.div>

      {/* Top right circular image */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        onClick={() => openIconImageRef.current?.click()}
        className="absolute select-effect top-16 right-0 w-32 h-32"
      >
        <Img
          src={getImageSrc(icon_image)}
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
