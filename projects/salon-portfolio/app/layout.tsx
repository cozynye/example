import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "@/components/ui/motion/MotionProvider";
import StickyContactBar from "@/components/site/StickyContactBar";

export const metadata: Metadata = {
  title: "미용실 홈페이지 제작 50만원 · 3일 | Make",
  description: "미용실 전용 홈페이지를 단 3일에. 15가지 디자인 중에서 고르세요. 네이버·카카오맵·예약·인스타 연동, 모바일 최적화 기본 포함.",
  keywords: ["미용실 홈페이지", "헤어살롱 웹사이트 제작", "미용실 사이트", "소상공인 홈페이지"],
  openGraph: {
    title: "미용실 홈페이지 제작 50만원 · 3일 | Make",
    description: "미용실 전용 홈페이지를 단 3일에. 15가지 디자인 중에서 고르세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-[var(--color-text-primary)] pb-14">
        <MotionProvider>{children}</MotionProvider>
        <StickyContactBar />
      </body>
    </html>
  );
}
