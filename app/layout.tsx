import type { Metadata } from "next";

import "@/src/styles/globals.scss";

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
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
