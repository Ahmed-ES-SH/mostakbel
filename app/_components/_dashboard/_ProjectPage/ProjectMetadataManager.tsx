import { Button } from "@/components/ui/button";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import {
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
  ChangeEvent,
} from "react";
import { projectMetadata } from "./type";

interface ProjectMetadataManagerProps {
  metadata: projectMetadata[];
  setProject: Dispatch<SetStateAction<any>>;
}

export default function ProjectMetadataManager({
  metadata,
  setProject,
}: ProjectMetadataManagerProps) {
  const [localMetadata, setLocalMetadata] = useState<projectMetadata[]>(
    metadata || []
  );

  // مزامنة البيانات مع المكون الأب
  useEffect(() => {
    setLocalMetadata(metadata || []);
  }, [metadata]);

  const updateProjectMetadata = (newMetadata: projectMetadata[]) => {
    setLocalMetadata(newMetadata);
    setProject((prev: any) => ({
      ...prev,
      metadata: newMetadata,
    }));
  };

  // إضافة إحصائية جديدة
  const handleAddMetadata = (e: any) => {
    e.preventDefault();
    const newMetadataItem: projectMetadata = {
      title: {
        ar: "إحصائية جديدة",
        en: "New Statistic",
      },
      value: 0,
    };

    updateProjectMetadata([...localMetadata, newMetadataItem]);
  };

  // حذف إحصائية
  const handleRemoveMetadata = (index: number) => {
    const newMetadata = localMetadata.filter((_, i) => i !== index);
    updateProjectMetadata(newMetadata);
  };

  // تحديث حقل معين في الإحصائية
  const handleMetadataChange = (index: number, field: string, value: any) => {
    const updatedMetadata: any = [...localMetadata];

    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      updatedMetadata[index] = {
        ...updatedMetadata[index],
        [parent]: {
          ...updatedMetadata[index][parent as keyof projectMetadata],
          [child]: value,
        },
      };
    } else {
      updatedMetadata[index] = {
        ...updatedMetadata[index],
        [field]: value,
      };
    }

    updateProjectMetadata(updatedMetadata);
  };

  return (
    <div className="space-y-4">
      {/* قائمة الإحصائيات */}
      <div className="space-y-4">
        {localMetadata.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            {/* حقول إدخال العنوان باللغتين */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان (عربي)
                  </label>
                  <input
                    type="text"
                    value={item.title.ar}
                    onChange={(e) =>
                      handleMetadataChange(index, "title.ar", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    placeholder="أدخل العنوان بالعربية"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان (إنجليزي)
                  </label>
                  <input
                    type="text"
                    value={item.title.en}
                    onChange={(e) =>
                      handleMetadataChange(index, "title.en", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Enter title in English"
                  />
                </div>
              </div>
            </div>

            {/* قيمة الإحصائية */}
            <div className="w-32 shrink-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                القيمة
              </label>
              <input
                type="number"
                value={item.value}
                onChange={(e) =>
                  handleMetadataChange(
                    index,
                    "value",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-left"
                min="0"
                dir="ltr"
              />
            </div>

            {/* زر الحذف */}
            <Button
              variant="outline"
              size="sm"
              className="h-10 w-10 p-0 mt-6 shrink-0"
              onClick={() => handleRemoveMetadata(index)}
            >
              <FiTrash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        ))}
      </div>

      {/* حالة عدم وجود إحصائيات */}
      {localMetadata.length === 0 && (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="mb-4">لا توجد إحصائيات مضافة</p>
          <Button type="button" variant="outline" onClick={handleAddMetadata}>
            <FiPlus className="ml-2" />
            إضافة أول إحصائية
          </Button>
        </div>
      )}

      {/* زر الإضافة عندما تكون هناك إحصائيات موجودة */}
      {localMetadata.length > 0 && (
        <Button
          type="button"
          variant="outline"
          onClick={handleAddMetadata}
          className="w-full flex items-center justify-center gap-2 py-3"
        >
          <FiPlus className="h-4 w-4" />
          إضافة إحصائية جديدة
        </Button>
      )}

      {/* معاينة الإحصائيات */}
      {localMetadata.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            معاينة الإحصائيات
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {localMetadata.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-lg text-center">
                    {item.value.toLocaleString("ar-SA")}
                  </div>
                  <div className="text-sm text-gray-600 text-center mt-1">
                    {item.title.ar}
                  </div>
                  <div className="text-xs text-gray-400 text-center mt-1">
                    {item.title.en}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
