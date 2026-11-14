import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

/**
 * 한글 세리프 폰트 - 웨딩 분위기에 어울리는 우아한 폰트
 */
const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * 영문 클래식 세리프 폰트 - SAVE THE DATE 및 영문 성함용
 */
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seungmoo-eunji-wedding-invitation.vercel.app"),
  title: "김승무 ♥ 성은지 결혼식에 초대합니다",
  description: "2027년 2월 21일 (일) 오전 11시 30분 · 더 채플 앳 청담 채플홀 (6층)",
  icons: {
    icon: "/wedding-invitation.png",
    apple: "/wedding-invitation.png",
  },
  openGraph: {
    title: "김승무 ♥ 성은지 결혼식에 초대합니다",
    description: "2027년 2월 21일 (일) 오전 11시 30분 · 더 채플 앳 청담 채플홀 (6층)",
    type: "website",
    images: [
      {
        url: "/main.jpeg",
        width: 512,
        height: 512,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSerifKR.variable} ${cormorantGaramond.variable} font-serif antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
