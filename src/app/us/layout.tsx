import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { wedding } from "@/wedding.config";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${wedding.groom.name} && ${wedding.bride.name}`,
  description: wedding.us.todayAlertText,
};

export default function UsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`${pressStart.variable} min-h-full`}>{children}</div>;
}
