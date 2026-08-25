import type { Metadata } from "next";
import { wedding } from "@/wedding.config";

export const metadata: Metadata = {
  title: `${wedding.groom.name} && ${wedding.bride.name}`,
  description: wedding.us.todayAlertText,
};

export default function UsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
