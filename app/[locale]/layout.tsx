// import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { directionMap } from "../constants/_website/Global";
import ReduxProvider from "../_components/_global/_client/ReduxProvider";
import ClientLayout from "../_components/_global/_client/ClientLayout";
import Navbar from "../_components/_global/Navbar";
import Footer from "../_components/_global/Footer";
import { getServerTranslation } from "../_helpers/getServerTranslation";
import { getSharedMetadata } from "../_helpers/SharedMetadata";
import ScrollToTop from "../_components/_global/ScrollToTop";
import ThemeProvider from "../_components/_website/ThemeProvider";
import FetchData from "../_helpers/FetchData";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
  params: any;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const socialData = await FetchData(`/social-contact-info`, false);
  return (
    <html dir={directionMap[locale as "en" | "ar"]} lang={locale}>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider>
            <ClientLayout>
              <Toaster position="top-center" richColors closeButton />
              <Navbar socialData={socialData} />
              <div className="w-full relative">
                {children}
                <ScrollToTop />
              </div>
              <Footer />
            </ClientLayout>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
