"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { Member, MemberFormData, MembersManagementProps } from "./types";
import MemberModal from "./MemberModal";
import MemberDashCard from "./MemberDashCard";
import ConfirmDeletePopup from "../_dynamicComponents/ConfirmDeletePopup";
import { instance } from "@/app/_helpers/axios";
import { toast } from "sonner";
import PaginationCompoennt from "../../_global/Pagination";
import LoadingSpin from "../../_global/LoadingSpin";

// المكون الرئيسي لإدارة الأعضاء
export default function MembersManagement({
  members: membersData,
  pagination,
}: MembersManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);
  const [confirmPopup, setConfrimPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(pagination.current_page ?? 1);
  const [lastPage, setLastPage] = useState(pagination.last_page ?? 1);
  const [clientMode, setClientMode] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setClientMode(true);
      setCurrentPage(newPage);
    }
  };

  const openAddModal = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const openEditModal = (member: Member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleEdit = async (formData: Partial<MemberFormData>) => {
    try {
      setLoading(true);
      const memberData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key == "is_active") return;
        if (key === "image" && !(value instanceof File)) return;
        if (value) memberData.append(key, value as any);
      });
      const response = await instance.post(
        `/update-member/${editingMember?.id}`,
        memberData
      );

      if (response.status === 200) {
        const newMember = response.data.data;
        toast.success("تم  تحديث بيانات العضو  بنجاح .");
        setMembers((prev) =>
          prev.map((mem) => (mem.id == editingMember?.id ? newMember : mem))
        );
        closeModal();
      }
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ??
        "حدث خطأ أثناء محاولة تحديث بيانات القسم الرجاء المحاولة لاحقا .";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData: Partial<MemberFormData>) => {
    try {
      setLoading(true);
      const memberData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        memberData.append(key, value as any);
      });
      const response = await instance.post(`/create-member`, memberData);

      if (response.status === 201) {
        const newMember = response.data.data;
        toast.success("تم  انشاء العضو الجديد بنجاح .");
        setMembers((prev) => [newMember, ...prev]);
        closeModal();
      }
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ??
        "حدث خطأ أثناء محاولة تحديث بيانات القسم الرجاء المحاولة لاحقا .";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (formData: Partial<MemberFormData>) => {
    if (editingMember) {
      handleEdit(formData);
    } else {
      handleAdd(formData);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const response = await instance.delete(
        `/delete-center-member/${deletingMember?.id}`
      );

      if (response.status === 200) {
        toast.success("تم حذف العضو بنجاح .");
        setMembers((prev) =>
          prev.filter((mem) => mem.id != deletingMember?.id)
        );
        setConfrimPopup(false);
        setDeletingMember(null);
      }
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ??
        "حدث خطأ أثناء محاولة تحديث بيانات القسم الرجاء المحاولة لاحقا .";
      toast.error(message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const confirmDelete = (member: Member) => {
    setDeletingMember(member);
    setConfrimPopup(true);
  };

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setFetchLoading(true);
        const response = await instance.get(
          `/center-members?page=${currentPage}`
        );
        if (response.status == 200) {
          setMembers(response.data.data);
          setCurrentPage(response.data.pagination.current_page);
          setLastPage(response.data.pagination.last_page);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setFetchLoading(false);
      }
    };

    if (clientMode) fetchClientData();
  }, [currentPage, clientMode]);

  useEffect(() => {
    if (membersData && membersData.length > 0) {
      setMembers(membersData);
    }
  }, [membersData]);

  if (fetchLoading) return <LoadingSpin />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              إدارة أعضاء المركز
            </h1>
            <p className="text-gray-600 mt-2">
              إدارة وتنظيم بيانات أعضاء المركز
            </p>
          </div>
          {members && members.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddModal}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2  hover:bg-blue-700 transition-colors"
            >
              <FaPlus />
              <span>إضافة عضو جديد</span>
            </motion.button>
          )}
        </div>

        {/* شبكة البطاقات */}
        {members.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {members.map((member) => (
                <MemberDashCard
                  key={member.id}
                  member={member}
                  onEdit={openEditModal}
                  onDelete={confirmDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                لا يوجد أعضاء
              </h3>
              <p className="text-gray-600 mb-6">
                ابدأ بإضافة أول عضو إلى المركز
              </p>
              <button
                onClick={openAddModal}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                إضافة أول عضو
              </button>
            </div>
          </div>
        )}

        <PaginationCompoennt
          currentPage={currentPage}
          totalPages={lastPage}
          onPageChange={handlePageChange}
        />

        {/* نافذة إضافة/تعديل العضو */}
        <MemberModal
          isOpen={isModalOpen}
          onClose={closeModal}
          member={editingMember || undefined}
          onSave={handleSave}
          mode={editingMember ? "edit" : "add"}
          loading={loading}
        />

        <ConfirmDeletePopup
          showConfirm={confirmPopup}
          onClose={() => setConfrimPopup(false)}
          id={deletingMember?.id as number}
          onDelete={handleDelete}
          title={`العضو - ${deletingMember?.name}`}
          loading={deleteLoading}
        />
      </div>
    </div>
  );
}
