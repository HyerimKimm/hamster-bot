import type { Metadata } from "next";
import { Asta_Sans } from "next/font/google";

import "@/src/styles/globals.scss";

const astaSans = Asta_Sans({
  subsets: ["latin"],
  variable: "--font-asta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hamster Bot",
  description: "귀여운 햄스터와 대화하기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={astaSans.variable}>
      <body className={astaSans.className}>{children}</body>
    </html>
  );
}
