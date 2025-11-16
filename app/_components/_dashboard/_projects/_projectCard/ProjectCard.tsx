"use client";
import { motion } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaTint,
  FaChild,
  FaGraduationCap,
  FaExclamationTriangle,
  FaLeaf,
  FaTools,
} from "react-icons/fa";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { JSX } from "react";

interface ProjectImage {
  id: number;
  project_id: number;
  image_path: string;
}

interface Category {
  id: number;
  title_en: string;
  title_ar: string;
  icon_name: string;
  bg_color: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface MetadataItem {
  title: {
    ar: string;
    en: string;
  };
  value: number;
}

export interface ProjectType {
  id: number;
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  start_date: string;
  completed_at: string;
  status: "pending" | "in_progress" | "completed" | "cancelled" | "approved";
  target_amount: string;
  collected_amount: string;
  is_urgent: boolean;
  volunteers_needed: number;
  created_by: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  images: ProjectImage[];
  category: Category;
  metadata: MetadataItem[];
}

interface ProjectCardProps {
  project: ProjectType;
  onDelete: (projectId: number) => void;
}

const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  const router = useRouter();

  const progressPercentage = Math.round(
    (parseFloat(project.collected_amount) / parseFloat(project.target_amount)) *
      100
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      calendar: "gregory",
    });
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
    }).format(parseFloat(amount));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "قيد الانتظار", variant: "secondary" as const },
      in_progress: { label: "قيد التنفيذ", variant: "default" as const },
      completed: { label: "مكتمل", variant: "success" as const },
      cancelled: { label: "ملغي", variant: "destructive" as const },
      approved: { label: "معتمد", variant: "success" as const },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  // دالة لتنسيق عرض القيمة بناءً على نوع الإحصائية
  const formatMetadataValue = (item: MetadataItem) => {
    const value = item.value;

    // إذا كانت القيمة تحتوي على نقاط (عدد عائم كبير) نعرضها كرقم عادي
    if (value.toString().includes("…")) {
      return value.toString().replace("…", "");
    }

    return value.toLocaleString("ar-SA");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full border-l-4 h-full border-l-blue-500 hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: project.category.bg_color }}
              >
                <FaGraduationCap size={16} />
              </div>
              <span className="text-sm text-gray-600">
                {project.category.title_ar}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {getStatusBadge(project.status)}
              {project.is_urgent && (
                <Badge
                  variant="destructive"
                  className="flex items-center gap-1"
                >
                  <FaExclamationTriangle size={12} />
                  عاجل
                </Badge>
              )}
            </div>
          </div>

          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">
              {project.title}
            </h3>

            <div className="flex gap-1 ml-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() =>
                  router.push(`/ar/dashboard/projects/${project.id}`)
                }
              >
                <FaEdit className="h-4 w-4 text-blue-600" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onDelete(project.id)}
              >
                <FaTrash className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Progress Section */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">التقدم</span>
              <span className="font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatCurrency(project.collected_amount)}</span>
              <span>{formatCurrency(project.target_amount)}</span>
            </div>
          </div>

          {/* Metadata Statistics Grid */}
          {project.metadata && project.metadata.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                الإحصائيات
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {project.metadata.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">
                        {formatMetadataValue(item)}
                      </div>
                      <div className="text-xs text-gray-600 truncate">
                        {item.title.ar}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <FaMapMarkerAlt className="text-gray-400" />
              <span className="text-gray-600 truncate">
                {project.location.address}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <FaCalendarAlt className="text-gray-400" />
              <span className="text-gray-600">
                {formatDate(project.start_date)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <FaUsers className="text-purple-500" />
              <span className="text-gray-600">
                {project.volunteers_needed} متطوع
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <FaCalendarAlt className="text-gray-400" />
              <span className="text-gray-600">
                {formatDate(project.completed_at)}
              </span>
            </div>
          </div>

          {/* Dates Info */}
          <div className="flex justify-between text-xs text-gray-500 border-t pt-2">
            <span>تاريخ الإنشاء: {formatDate(project.created_at)}</span>
            <span>آخر تحديث: {formatDate(project.updated_at)}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
