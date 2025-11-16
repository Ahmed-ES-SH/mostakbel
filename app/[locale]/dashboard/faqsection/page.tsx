import FAQSectionControl from "@/app/_components/_dashboard/_homePage/_FAQSectionDash/FAQSectionControl";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function FAQSectionDash() {
  const data = await FetchData(`/variables-data?id=4&limit=6`, false);

  const faqs = await FetchData(`/faqs?limit=5`, false);

  const { column_1, column_2, column_3, column_4 } = await data;

  const imagesData = [column_2, column_3, column_4];

  return (
    <FAQSectionControl faqs={faqs} texts={column_1} imagesData={imagesData} />
  );
}
