import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/**
 * 한글 마루부리(MaruBuri) 로컬 웹폰트 - 웨딩 청첩장 본문 서체
 */
const maruBuri = localFont({
  variable: "--font-maruburi",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/MaruBuri-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/MaruBuri-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/MaruBuri-SemiBold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/MaruBuri-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/MaruBuri-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
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
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
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
        url: "/og-image.jpg",
        width: 900,
        height: 1200,
        alt: "김승무 ♥ 성은지 결혼식 초대",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "김승무 ♥ 성은지 결혼식에 초대합니다",
    description: "2027년 2월 21일 (일) 오전 11시 30분 · 더 채플 앳 청담 채플홀 (6층)",
    images: ["/og-image.jpg"],
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
    <html
      lang="ko"
      className={`${maruBuri.variable} ${cormorantGaramond.variable}`}
    >
      <body
        className={`${maruBuri.className} ${maruBuri.variable} ${cormorantGaramond.variable} font-serif antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
