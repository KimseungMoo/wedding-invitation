import type { Metadata, Viewport } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";

/**
 * 한글 세리프 폰트 - 웨딩 분위기에 어울리는 우아한 폰트
 */
const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "결혼합니다",
  description: "소중한 분들을 초대합니다",
  icons: {
    icon: "/wedding-invitation.png",
    apple: "/wedding-invitation.png",
  },
  openGraph: {
    title: "결혼합니다",
    description: "소중한 분들을 초대합니다",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSerifKR.variable} font-serif antialiased`}>
        {children}
      </body>
    </html>
  );
}
