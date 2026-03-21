import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const BASE_URL = 'https://gonpunclaw.vercel.app';

export const metadata: Metadata = {
  title: "공픈클로 | 공무원·공공기관 AI 업무자동화 100선",
  description:
    "오픈클로(OpenClaw)를 활용한 공무원·공공기관 업무 AX(AI Transformation) 100가지 유스케이스",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: 'website',
    url: BASE_URL,
    title: '공픈클로 | 공무원·공공기관 AI 업무자동화 100선',
    description: '오픈클로(OpenClaw)를 활용한 공무원·공공기관 업무 AX(AI Transformation) 100가지 유스케이스',
    siteName: '공픈클로',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '공픈클로 | 공무원·공공기관 AI 업무자동화 100선',
    description: '오픈클로(OpenClaw)를 활용한 공무원·공공기관 업무 AX(AI Transformation) 100가지 유스케이스',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
