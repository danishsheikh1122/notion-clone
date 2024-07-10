import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jotion",
  description: "This is a landing page of jotion clone ",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme:light)",
        url: "/logodarkmodeJ.svg",
        href: "/logodarkmodeJ.svg",
      },
      {
        media: "(prefers-color-scheme:dark)",
        url: "/logolightmodeJ.svg",
        href: "/logolightmodeJ.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
