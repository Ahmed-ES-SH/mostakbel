import { Toaster } from "sonner";
import { directionMap } from "../constants/_website/Global";
import ReduxProvider from "../_components/_global/_client/ReduxProvider";
import ClientLayout from "../_components/_global/_client/ClientLayout";
import Navbar from "../_components/_global/Navbar";
import Footer from "../_components/_global/Footer";
import { getSharedMetadata } from "../_helpers/SharedMetadata";
import ScrollToTop from "../_components/_global/ScrollToTop";
import ThemeProvider from "../_components/_website/ThemeProvider";
import FetchData from "../_helpers/FetchData";
import { getServerTranslation } from "../_helpers/serverTranslation";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;

  const t = await getServerTranslation(locale ?? "nl", "mainMeta");
  const sharedMetadata = await getSharedMetadata(t.title, t.description);

  return {
    title: t.title,
    description: t.description,
    icons: {
      icon: [
        { url: "/logo.png" },
        { url: "/logo-square.png", sizes: "32x32", type: "image/png" },
        { url: "/logo-square.png", sizes: "16x16", type: "image/png" },
        // Adding a larger size for Google (48px multiple) if available, or relying on the larger file
        { url: "/logo-square.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
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
  const socialData = await FetchData(`/header-data`, false);
  return (
    <html dir={directionMap[locale as "en" | "ar" | "nl"]} lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Cairo:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data for Google (Organization Logo) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://stichtingmostakbal.nl",
              logo: "https://stichtingmostakbal.nl/logo-square.png", // الشعار المربع الجديد (256x256)
              name: "stichtingmostakbal",
              sameAs: [
                "https://www.facebook.com/stichtingmostakbal",
                "https://twitter.com/stichtingmostakbal",
                "https://www.linkedin.com/company/stichtingmostakbal",
              ],
            }),
          }}
        />
      </head>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider>
            <ClientLayout>
              <Toaster position="top-center" richColors closeButton />
              <Navbar socialData={socialData} />
              <div className="w-full min-h-screen relative">
                {children}
                <ScrollToTop />
              </div>
              <Footer socialData={socialData} />
            </ClientLayout>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
