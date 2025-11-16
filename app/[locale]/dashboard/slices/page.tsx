import React from "react";
import SlicesPage from "@/app/_components/_dashboard/_slices/SlicesPage";
import FetchData from "@/app/_helpers/FetchData";

export default async function SlicesDashPage() {
  const slices = await FetchData(`/slices`, false);

  return <SlicesPage data={slices} />;
}
