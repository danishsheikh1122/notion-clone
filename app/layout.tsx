import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="jotion-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
