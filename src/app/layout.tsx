import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HYPHEN | AX Automation Solutions",
  description: "업무자동화와 AX 소싱 솔루션으로 비즈니스 효율을 극대화합니다. RPA, AI 에이전트, 데이터 파이프라인, 워크플로우 자동화.",
  keywords: ["업무자동화", "AX", "RPA", "AI 에이전트", "소싱", "자동화 솔루션"],
  openGraph: {
    title: "HYPHEN | AX Automation Solutions",
    description: "업무자동화와 AX 소싱 솔루션으로 비즈니스 효율을 극대화합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${outfit.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#161616] text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
