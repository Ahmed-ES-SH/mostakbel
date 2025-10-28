import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { directionMap } from "../constants/_website/Global";
import ReduxProvider from "../_components/_global/_client/ReduxProvider";
import ClientLayout from "../_components/_global/_client/ClientLayout";
import Navbar from "../_components/_global/Navbar";
import Footer from "../_components/_global/Footer";
import { getServerTranslation } from "../_helpers/getServerTranslation";
import { getSharedMetadata } from "../_helpers/SharedMetadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const t = await getServerTranslation("mainMeta");
  const sharedMetadata = await getSharedMetadata(t.title, t.description);

  return {
    title: t.title,
    description: t.description,
    ...sharedMetadata,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "ar" }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const t = await getServerTranslation("mainMeta");

  return (
    <html dir={directionMap[locale]} lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ClientLayout>
            <Toaster position="top-center" richColors closeButton />
            <Navbar />
            <div className="w-full mt-16">{children}</div>
            <Footer />
          </ClientLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
