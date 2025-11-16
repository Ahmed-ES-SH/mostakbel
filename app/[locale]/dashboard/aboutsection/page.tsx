import AboutSectionDash from "@/app/_components/_dashboard/_homePage/_aboutSectionDash/AboutSectionDash";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function AboutDash() {
  const data = await FetchData(`/variables-data?id=2&limit=6`, false);

  const { column_1, column_2, column_3, column_4, column_5 } = await data;

  return (
    <AboutSectionDash
      charities={column_1}
      texts={column_2}
      mainImage={column_3}
      banner={{ headData: column_5, cards: column_4 }}
    />
  );
}
