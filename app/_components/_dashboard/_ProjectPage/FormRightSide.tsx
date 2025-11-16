"use client";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { InputField } from "./InputField";
import { FiMapPin, FiTarget } from "react-icons/fi";
import { Project } from "./type";
import { motion } from "framer-motion";
import { TextAreaField } from "./TextAreaField";
import MapSelector from "../../_global/MapSelector";
import ProjectMetadataManager from "./ProjectMetadataManager";
import MultiImages from "../../_global/MultiImage";

interface props {
  setProject: Dispatch<SetStateAction<Project>>;
  project: Project;
  errors: Record<string, string>;
  setErrors: Dispatch<SetStateAction<Record<string, string>>>;
  location: Project["location"] | null;
  setLocation: Dispatch<SetStateAction<Project["location"] | null>>;
}

export default function FormRightSide({
  setProject,
  project,
  errors,
  setErrors,
  location,
  setLocation,
}: props) {
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const [showMap, setShowMap] = useState(false);

  const handleInputChange = (field: keyof Project, value: any) => {
    setProject((prev) => ({
      ...prev,
      [field]: value,
    }));

    // إزالة الخطأ عند التعديل
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const uploaded = Array.from(files).map((file) => ({
        file,
        tempId: crypto.randomUUID(), // أو Date.now() + Math.random()
      })); // تحويل FileList إلى Array<File>
      setProject((prev) => ({
        ...prev,
        images: [...prev.images, ...uploaded], // دمج الصور الجديدة مع السابقة
      }));
    }
  };

  const handleDeleteImage = (
    targetImage:
      | File
      | { id?: number; image_path?: string; tempId?: string }
      | string
  ) => {
    setProject((prev: any) => {
      const newImages = prev.images.filter((img: any) => {
        // 🟡 حذف الصور الجديدة (File + tempId)
        if (
          typeof img === "object" &&
          "tempId" in img &&
          typeof targetImage === "object" &&
          "tempId" in targetImage
        ) {
          return img.tempId !== targetImage.tempId;
        }

        // 🟢 حذف صور قاعدة البيانات (بـ id)
        if (
          typeof img === "object" &&
          "id" in img &&
          typeof targetImage === "object" &&
          "id" in targetImage
        ) {
          return img.id !== targetImage.id;
        }

        // 🔵 حذف رابط مباشر (string)
        if (typeof img === "string" && typeof targetImage === "string") {
          return img !== targetImage;
        }

        return true;
      });

      // ✅ حفظ المعرفات الخاصة بالصور المحذوفة فقط
      const deletedImages = prev.deletedImages ?? [];
      let newDeletedImages = deletedImages;

      if (
        typeof targetImage === "object" &&
        "id" in targetImage &&
        targetImage.id
      ) {
        newDeletedImages = [...deletedImages, targetImage.id];
      }

      return {
        ...prev,
        images: newImages,
        deletedImages: newDeletedImages,
      };
    });
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      {/* images input */}
      <input
        type="file"
        onChange={handleChangeImages}
        name="images"
        hidden
        ref={imagesInputRef}
        multiple
      />
      {/* العمود الأيمن - المعلومات الأساسية */}
      <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
        {/* بطاقة المعلومات الأساسية */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FiTarget className="text-blue-500" />
            المعلومات الأساسية
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="عنوان المشروع"
              value={project.title}
              onChange={(value) => handleInputChange("title", value)}
              error={errors.title}
              required
              dir="rtl"
            />

            <InputField
              label="رابط المشروع (Slug)"
              value={project.slug}
              onChange={(value) => handleInputChange("slug", value)}
              placeholder="example-project"
              dir="ltr"
            />

            <div className="md:col-span-2">
              <TextAreaField
                label="الوصف المختصر"
                value={project.overview}
                onChange={(value) => handleInputChange("overview", value)}
                placeholder="وصف مختصر عن المشروع..."
                rows={3}
                dir="rtl"
              />
            </div>

            <div className="md:col-span-2">
              <TextAreaField
                label="الوصف التفصيلي"
                value={project.description}
                onChange={(value) => handleInputChange("description", value)}
                error={errors.description}
                required
                placeholder="وصف تفصيلي عن أهداف ومكونات المشروع..."
                rows={5}
                dir="rtl"
              />
            </div>
          </div>
        </motion.div>

        {/* بطاقة الموقع والتواريخ */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FiMapPin className="text-green-500" />
            الموقع والتواريخ
          </h2>
          {/* location input  */}
          {
            <div className="flex flex-col gap-1">
              <label className="my-2 pb-1 border-b w-fit border-b-primary">
                الموقع
              </label>
              <input
                readOnly
                value={location ? location.address : ""}
                className={`w-full rounded-md p-2 outline-none read-only:bg-gray-300 border border-gray-300 shadow ring-2 ring-transparent duration-300 focus:ring-primary ${
                  errors && errors["location"]
                    ? "border-red-400 border-2"
                    : "border-gray-300 border"
                }`}
              />
              <span
                onClick={() => setShowMap(true)}
                className="text-red-400 hover:underline text-lg cursor-pointer block self-end hover:text-red-500 hover:scale-110 duration-200"
              >
                حدد الموقع الجديد
              </span>
              {errors && errors["location"] && (
                <p className="my-1 text-red-400 underline">
                  {errors["location"]}
                </p>
              )}
            </div>
          }

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="تاريخ البدء"
              value={project.start_date ? project.start_date.split("T")[0] : ""}
              onChange={(value) =>
                handleInputChange("start_date", `${value}T00:00:00.000000Z`)
              }
              type="date"
              dir="ltr"
            />

            <InputField
              label="تاريخ الانتهاء المتوقع"
              value={
                project.completed_at ? project.completed_at.split("T")[0] : ""
              }
              onChange={(value) =>
                handleInputChange("completed_at", `${value}T00:00:00.000000Z`)
              }
              type="date"
              dir="ltr"
            />
          </div>
        </motion.div>

        {/* project Images */}
        <MultiImages
          images={project.images}
          errors={errors}
          handleDeleteImage={handleDeleteImage}
          imagesInputRef={imagesInputRef}
        />

        {/* بطاقة الإحصائيات */}
        <ProjectMetadataManager
          metadata={project.metadata}
          setProject={setProject}
        />
      </motion.div>

      {/* Map Popup */}
      <MapSelector
        initialLocation={location}
        setLocation={setLocation}
        showMap={showMap}
        onClose={() => setShowMap(false)}
        locale={"en"}
      />
    </>
  );
}
