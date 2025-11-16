import MembersManagement from "@/app/_components/_dashboard/_centerMembers/MembersManagement";
import FetchData from "@/app/_helpers/FetchData";
import React from "react";

export default async function CenterMembers() {
  const response = await FetchData(`/center-members`, true);

  if (!response) return null;

  const { data, pagination } = await response;

  return <MembersManagement members={data} pagination={pagination} />;
}
