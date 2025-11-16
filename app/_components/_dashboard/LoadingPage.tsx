import React from "react";
import LoadingSpin from "../_global/LoadingSpin";

export default function LoadingPage() {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen z-999999">
      <LoadingSpin />
    </div>
  );
}
