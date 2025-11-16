import ServicesSectionDash from "@/app/_components/_dashboard/_homePage/ServicesSectionDash";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function ServicesDash() {
  const data = await FetchData(`/charity-services`, false);

  const { texts, services } = await data;

  return <ServicesSectionDash data={services} texts={texts} />;
}
