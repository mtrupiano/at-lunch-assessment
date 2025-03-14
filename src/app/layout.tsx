import type { Metadata } from "next";
import "./globals.css";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
  title: "At Lunch Assessment",
  description: "Frontend assessment, simple restaurant search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={comfortaa.variable}>
      <body className="min-w-[375px]">{children}</body>
    </html>
  );
}
