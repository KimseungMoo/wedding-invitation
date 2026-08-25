import type { Metadata } from "next";
import { wedding } from "@/wedding.config";

export const metadata: Metadata = {
  title: `우리 이야기 · ${wedding.groom.name} & ${wedding.bride.name}`,
  description: wedding.us.todayAlertText,
};

export default function UsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
