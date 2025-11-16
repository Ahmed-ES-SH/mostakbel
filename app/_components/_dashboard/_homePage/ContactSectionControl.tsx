"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { ContactForm } from "../../_website/_contactus/ContactForm";
import Img from "../../_global/Img";
import { getImageSrc, ImageType } from "@/app/_helpers/GlobalHelpers";
import { VscLoading } from "react-icons/vsc";
import { FaSave } from "react-icons/fa";
import { instance } from "@/app/_helpers/axios";
import { toast } from "sonner";

interface props {
  mainImage: string;
}

export default function ContactSectionControl({ mainImage }: props) {
  const openImageRef = useRef<HTMLInputElement>(null);

  const [updateloading, setUpdateLoading] = useState(false);

  const [currentImage, setCurrentImage] = useState<ImageType>(
    mainImage ?? "/website/contact-1.png"
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setCurrentImage(files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!(currentImage instanceof File)) {
        toast.error("تحتاج الى اختيار صورة جديدة لتتمكن من تحديث القسم .");
        return;
      }
      const formData = new FormData();
      if (currentImage instanceof File)
        formData.append("column_5", currentImage);
      const response = await instance.post(
        `/update-variables-data?id=4&limit=6`,
        formData
      );

      if (response.status === 200) {
        toast.success("تم حفظ التعديلات بنجاح");
      }
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ??
        "حدث خطأ أثناء محاولة تحديث بيانات القسم الرجاء المحاولة لاحقا .";
      toast.error(message);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between border rounded-lg shadow-lg max-lg:flex-col max-lg:items-start c-container py-20 relative gap-4">
        <input
          type="file"
          name="conatct-img"
          hidden
          onChange={handleImageChange}
          ref={openImageRef}
        />
        {/* Contact Form */}
        <ContactForm disabled={true} />
        <div
          onClick={() => openImageRef.current?.click()}
          className="lg:w-[750px] select-effect self-start w-full"
        >
          <Img src={getImageSrc(currentImage)} className="w-[900px]" />
        </div>
      </div>
      {/* Save Button */}
      <button
        disabled={updateloading}
        onClick={handleSubmit}
        className="disabled:bg-green-100 mb-12 flex items-center justify-center rounded-lg shadow-lg bg-green-400 p-2 text-white mt-8 w-fit mx-auto"
      >
        {updateloading ? (
          <VscLoading className="animate-spin text-green-500 size-6" />
        ) : (
          <div className="flex items-center gap-2">
            حفظ التعديلات
            <FaSave />
          </div>
        )}
      </button>
    </>
  );
}
