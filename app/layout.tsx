import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import NavBar from "./(marketing)/_components/NavBar";
import {Toaster } from 'sonner'
import SearchCmd from "@/components/search-cmd";
import { ModalProvider } from "@/components/providers/modal-provider";

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
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="jotion-theme"
          >
            <main>
              {/* <NavBar></NavBar> */}
              <Toaster position="bottom-center"/>
              <ModalProvider/>
              {children}
            </main>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
