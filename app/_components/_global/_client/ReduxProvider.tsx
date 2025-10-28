"use client";
import { store } from "@/app/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

interface props {
  children: ReactNode;
}

export default function ReduxProvider({ children }: props) {
  return <Provider store={store}>{children}</Provider>;
}
