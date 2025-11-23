"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
} from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { setUser } from "@/app/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import Cookie from "cookie-universal";
import { instance } from "@/app/_helpers/axios";
import { encryptToken } from "@/app/_helpers/GlobalHelpers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/_components/_global/LoadingPage";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { user, loading } = useAppSelector((state) => state.user);

  const cookie = Cookie();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const data = {
        login: formData.email,
        password: formData.password,
      };
      const response = await instance.post(`/login`, data);
      if (response.status == 200) {
        const token = encryptToken(response.data.token);
        cookie.set("stichtingmostakbal_token", token);
        const user = response.data.data;
        dispatch(setUser(user));
        const direct = user.role == "admin" ? "/en/dashboard" : "/";
        setTimeout(() => {
          router.push(direct);
        }, 300);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const message =
        error?.response?.data?.message ??
        "حدث خطأ غير متوقع اثناء تسجيل الدخول الرجاء المحاولة لاحقا !";
      if (error.status == 401) {
        toast.error(
          "خطأ فى بيانات التسجيل تأكد من البريد او كلمة السر وأعد المحاولة"
        );
      }
      if (error.status == 404) {
        toast.error(
          "هذا المستخدم غير موجود ضمن مستخدمين المنصة تاكد من البريد وحاول مره اخرى ."
        );
      }
      if (error.status == 500) {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (!loading && user) {
      const direct = user.role == "admin" ? "/en/dashboard" : "/";
      router.push(direct);
    }
  }, [loading]);

  if (loading) return <LoadingPage />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaSignInAlt className="w-8 h-8 text-blue-600" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              تسجيل الدخول
            </CardTitle>
            <CardDescription className="text-gray-600">
              مرحباً بعودتك! يرجى إدخال بياناتك
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* حقل البريد الإلكتروني */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pr-10 pl-4 py-3 text-right"
                    placeholder="example@domain.com"
                    dir="rtl"
                  />
                </div>
              </motion.div>

              {/* حقل كلمة المرور */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  كلمة المرور
                </Label>
                <div className="relative">
                  <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pr-10 pl-12 py-3 text-right"
                    placeholder="أدخل كلمة المرور"
                    dir="rtl"
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-4 h-4" />
                    ) : (
                      <FaEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* زر تسجيل الدخول */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 text-lg font-medium transition-all duration-200"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <FaSignInAlt className="ml-2 w-4 h-4" />
                      تسجيل الدخول
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
