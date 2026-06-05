import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "@/components/ui/motion/MotionProvider";

export const metadata: Metadata = {
  title: "미용실 포트폴리오 | Salon Portfolio",
  description: "프리미엄 미용실 웹사이트 포트폴리오 - 트렌디하고 세련된 디자인",
  keywords: ["미용실", "헤어살롱", "포트폴리오", "웹디자인"],
  openGraph: {
    title: "미용실 포트폴리오 | Salon Portfolio",
    description: "프리미엄 미용실 웹사이트 포트폴리오",
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
      <body className="min-h-full flex flex-col bg-white text-[var(--color-text-primary)]">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
