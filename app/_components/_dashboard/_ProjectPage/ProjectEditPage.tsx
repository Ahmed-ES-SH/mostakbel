// pages/ProjectEditPage.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Category, Project } from "./type";
import { instance } from "@/app/_helpers/axios";
import { toast } from "sonner";
import FormRightSide from "./FormRightSide";
import FormLeftSide from "./FormLeftSide";

interface props {
  data: Project;
  categories: Category[];
}

export default function ProjectEditPage({ data, categories }: props) {
  const [project, setProject] = useState<Project>(data);
  const [originalProject] = useState<Project>(data);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [location, setLocation] = useState<Project["location"] | null>(
    project.location
  );

  if (!project) return <div className="min-h-screen"></div>;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!project.title.trim()) {
      newErrors.title = "عنوان المشروع مطلوب";
    }

    if (!project.description.trim()) {
      newErrors.description = "وصف المشروع مطلوب";
    }

    if (!project.target_amount || parseFloat(project.target_amount) <= 0) {
      newErrors.target_amount = "المبلغ المستهدف يجب أن يكون أكبر من الصفر";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // إنشاء نسخة من project بدون الحقول غير المهمة
    const projectToCompare: any = { ...project, location };

    // إزالة الحقول غير المهمة
    delete projectToCompare.metadata;
    delete projectToCompare.deletedImages;

    const originalToCompare = {
      ...originalProject,
      location: project.location,
    };

    // مقارنة
    const isChanged =
      JSON.stringify(projectToCompare) !== JSON.stringify(originalToCompare);

    if (!isChanged) {
      toast.info("لم يتم تحديث أي بيانات");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Loop على جميع خصائص المشروع
      Object.entries(project).forEach(([key, value]) => {
        // تجاهل الحقول غير المهمة
        if (["deletedImages", "metadata"].includes(key)) return;

        if (value === null || value === undefined) return;

        // تحويل Boolean إلى 1/0
        if (typeof value === "boolean") {
          formData.append(key, value ? "1" : "0");
          return;
        }

        // التعامل مع مصفوفة الصور
        if (key === "images" && Array.isArray(value)) {
          value.forEach((img) => {
            if (img instanceof File) {
              formData.append("images[]", img);
            } else if ("file" in img && img.file instanceof File) {
              formData.append("images[]", img.file);
            }
          });
          return;
        }

        // تحويل object مثل location إلى JSON
        if (typeof value === "object" && !Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
          return;
        }

        // الحقول البسيطة الأخرى
        formData.append(key, value as any);
      });

      if (project.metadata.length > 0)
        formData.append("metadata", JSON.stringify(project.metadata));
      if (project.deletedImages && project.deletedImages?.length > 0)
        formData.append("deletedImages", JSON.stringify(project.deletedImages));
      if (location) formData.append("location", JSON.stringify(location));

      // إرسال POST أو PUT
      const response = await instance.post(`/projects/${project.id}`, formData);

      if (response.status == 200) {
        const data = response.data.data;
        setProject(data);
        toast.success("تم تحديث المشروع بنجاح");
      }
    } catch (error: any) {
      console.error("Error updating project:", error);
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء تحديث المشروع"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  console.log(project);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="c-container">
        {/* الهيدر */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تعديل المشروع
          </h1>
          <p className="text-gray-600">
            قم بتعديل معلومات المشروع وحفظ التغييرات
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* العمود الايمن */}
            <FormRightSide
              setProject={setProject}
              project={project}
              errors={errors}
              setErrors={setErrors}
              location={location}
              setLocation={setLocation}
            />

            {/* العمود الأيسر - الإعدادات والإجراءات */}
            <FormLeftSide
              project={project}
              setProject={setProject}
              errors={errors}
              setErrors={setErrors}
              isSubmitting={isSubmitting}
              categories={categories}
            />
          </motion.div>
        </form>
      </div>
    </div>
  );
}
