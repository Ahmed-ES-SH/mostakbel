import CenterBranchesControl from "@/app/_components/_dashboard/_CenterBranches/CenterBranchesControl";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function CenterBranches() {
  const branchesData = await FetchData(`/center-branches`, false);

  return <CenterBranchesControl branchesData={branchesData} />;
}
