export const getSharedMetadata = (title: string, description: string) => ({
  keywords: [
    "goede doelen",
    "charitatieve organisatie",
    "Syrië",
    "stichtingmostakbal",
    "hulpverlening",
    "donaties",
    "gemeenschapssteun",
    "lokale ontwikkeling",
    "maatschappelijke projecten",
    "vrijwilligerswerk",
    "sociale dienstverlening",
    "steun aan behoeftige gezinnen",
    "duurzame initiatieven",
    "gemeenschapsontwikkeling",
    "samenwerking",
    "menselijke hulp",
  ],
  openGraph: {
    title,
    description,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://stichtingmostakbal.nl"}`,
    siteName: "stichtingmostakbal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@stichtingmostakbal", // غيّره إذا لم يكن لديك حساب تويتر
    title,
    description,
  },
});
