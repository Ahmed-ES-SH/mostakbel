import ContactSectionControl from "@/app/_components/_dashboard/_homePage/ContactSectionControl";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function ContactSectionDash() {
  const data = await FetchData(`/variables-data?id=4&limit=6`, false);

  const { column_5 } = await data;
  return <ContactSectionControl mainImage={column_5} />;
}
