"use client";

import { JSX, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGraduationCap, FaHeartbeat, FaBolt, FaSave } from "react-icons/fa";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { useLocale } from "@/app/_hooks/useLocale";
import { IoMdTrendingUp } from "react-icons/io";
import { FcElectricalSensor } from "react-icons/fc";
import { getIconComponent } from "@/app/_helpers/GlobalHelpers";
import EditTextPopup from "../EditTextPopup";
import IconPicker from "../../_global/IconPicker";
import ServicesMainTexts from "./ServicesMainTexts";
import { toast } from "sonner";
import { instance } from "@/app/_helpers/axios";
import { VscLoading } from "react-icons/vsc";

type textType = { en: string; ar: string; nl: string };

type Service = {
  icon: string;
  icon_style: string;
  title: textType;
  description: textType;
};

interface textsType {
  title: textType;
  subtitle: textType;
}

interface props {
  data: Service[];
  texts: textsType;
}

type filedType = "title" | "description" | "subtitle" | "";

export default function ServicesSectionDash({ data, texts }: props) {
  const locale = useLocale();

  const [titles, setTitles] = useState(
    texts ?? {
      title: { en: "", ar: "", nl: "" },
      subtitle: { en: "", ar: "", nl: "" },
    }
  );
  const [services, setServices] = useState(data ?? []);
  const [selectedService, setSelectedService] = useState<any>({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(
    null
  );
  const [filedType, setFiledType] = useState<filedType>("");

  const handleShowIconPicker = (index: number) => {
    setActiveServiceIndex(index);
    setShowIconPicker(true);
  };

  // Handle text input change inside popup
  const handleInputChange = (name: string, value: string | number) => {
    const [field, lang] = name.split("_");

    setSelectedService((prev: any) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value,
      },
    }));
  };

  // Generate inputs dynamically for EditTextPopup
  const inputs = useMemo(() => {
    const fieldConfig: Record<
      string,
      { label: string; type: "short-text" | "long-text" }
    > = {
      title: { label: "العنوان", type: "short-text" },
      subtitle: { label: "النص الفرعي", type: "short-text" },
      description: { label: "الوصف", type: "long-text" },
    };

    const config = fieldConfig[filedType];
    if (!config) return [];

    return ["en", "ar", "nl"].map((lang) => ({
      name: `${filedType}_${lang}`,
      value: selectedService[filedType]?.[lang] ?? "",
      type: config.type,
      label: `${config.label} (${lang.toUpperCase()})`,
    }));
  }, [filedType, selectedService]);

  // When user clicks on a text
  const handleSelectService = (
    type: filedType,
    text: textType,
    index: number
  ) => {
    setSelectedService((prev: any) => ({
      ...prev,
      [type]: {
        en: text.en || "",
        ar: text.ar || "",
        nl: text.nl || "",
      },
    }));
    setActiveServiceIndex(index);
    setFiledType(type);
    setIsPopupOpen(true);
  };

  // Save changes to selected service in local state
  const handleSaveChanges = () => {
    if (activeServiceIndex === null) return;

    setServices((prev) => {
      const updated = [...prev];

      updated[activeServiceIndex] = {
        ...updated[activeServiceIndex],
        [filedType]: {
          en: selectedService[filedType].en,
          ar: selectedService[filedType].ar,
          nl: selectedService[filedType].nl,
        },
      };

      return updated;
    });

    setIsPopupOpen(false);
  };

  const handleServiceIconChange = (iconName: string) => {
    if (activeServiceIndex !== null) {
      setServices((prev) => {
        const updated = [...prev];
        updated[activeServiceIndex] = {
          ...updated[activeServiceIndex],
          icon: iconName, // تعديل الحقل الذي يحتوي اسم الأيقونة
        };
        return updated;
      });
    }
    setShowIconPicker(false);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
    setSelectedService({});
  };

  const handleSubmit = async () => {
    try {
      setUpdateLoading(true);
      const formData = new FormData();

      formData.append("services", JSON.stringify(services));
      formData.append("texts", JSON.stringify(titles));

      const response = await instance.post(
        `/update-charity-services`,
        formData
      );
      if (response.status == 200) {
        toast.success("تم تحديث بيانات القسم بنجاح .");
      }
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ??
        "حدث خطا أثناء محاولة تحديث بيانات القسم الرجاء المحاولة لاحقا .";
      toast.error(message);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[95vh] flex items-center justify-center">
      <section className="relative pt-20 pb-10 border rounded-lg  border-gray-300 shadow-lg bg-cover bg-center">
        {/* overlay */}
        <div className="container mx-auto px-6 text-center z-2 relative">
          <ServicesMainTexts titles={titles} setTitles={setTitles} />

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-20 max-lg:gap-28 gap-8">
            {services.map((service, i) => {
              const Icon = getIconComponent(service.icon);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl group relative shadow-md p-8 flex flex-col items-center justify-between hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-center pt-3 absolute -top-[25%] left-1/2 -translate-x-1/2 rounded-t-full w-40 h-40 mb-6 ">
                    <span
                      onClick={() => handleShowIconPicker(i)}
                      className="order-1 select-effect relative"
                    >
                      <Icon className={`${service.icon_style ?? ""}`} />
                    </span>
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white outline-20 outline-primary-color rounded-t-full"></div>
                  </div>
                  <div className="flex flex-col items-center z-3 relative">
                    <div className="flex items-center justify-center bg-transparent rounded-full w-20 h-12 mb-2"></div>
                    <h3
                      onClick={() =>
                        handleSelectService("title", service.title, i)
                      }
                      className="text-xl select-effect font-bold text-stone-800 mb-3"
                    >
                      {service.title[locale]}
                    </h3>
                    <p
                      onClick={() =>
                        handleSelectService(
                          "description",
                          service.description,
                          i
                        )
                      }
                      className="text-stone-600 select-effect mb-6"
                    >
                      {service.description[locale]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <button
          disabled={updateloading}
          onClick={handleSubmit}
          className=" disabled:bg-green-100 flex items-center justify-center rounded-lg shadow-lg bg-green-400 p-2 text-white mt-8 w-fit mx-auto"
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
      </section>

      <EditTextPopup
        loadingState={updateloading}
        operationType={"edit"}
        onSave={handleSaveChanges}
        showPopup={isPopupOpen}
        onClose={handleClose}
        inputs={inputs}
        onChange={handleInputChange}
      />

      {/* Icon Picker */}
      <IconPicker
        show={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        selectedIcon={services[activeServiceIndex || 0]?.icon}
        onChange={handleServiceIconChange}
      />
    </div>
  );
}
