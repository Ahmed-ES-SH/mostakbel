import CenterBranchesComponent from "@/app/_components/_website/_centerbranches/CenterBranchesComponent";
import FetchData from "@/app/_helpers/FetchData";
import { getServerTranslation } from "@/app/_helpers/serverTranslation";
import { getSharedMetadata } from "@/app/_helpers/SharedMetadata";
import React from "react";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = await getServerTranslation(locale, "centerBranchesMeta");
  const sharedMetadata = await getSharedMetadata(t.title, t.description);
  return {
    title: `${t.title}`,
    description: `${t.description}`,
    ...sharedMetadata,
  };
}

export default async function CenterBranchesPage() {
  const centerBranches = await FetchData(`/center-branches`, false);
  return (
    <>
      <CenterBranchesComponent data={centerBranches} />
    </>
  );
}
