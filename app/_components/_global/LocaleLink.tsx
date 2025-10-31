"use client";
import { useLocale } from "@/app/_hooks/useLocale";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LocaleLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  onClick?: () => void;
}

export default function LocaleLink({
  children,
  className,
  href,
  onClick,
}: LocaleLinkProps) {
  const locale = useLocale();
  const formattedHref = `/${locale}/${href}`.replace(/\/+/g, "/");
  return (
    <Link
      onClick={onClick}
      href={formattedHref}
      className={`${className} block outline-none`}
    >
      {children}
    </Link>
  );
}
