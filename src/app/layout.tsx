import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/store/Providers";


export const metadata: Metadata = {
  title: "Save Pin",
  description: "Pin any image and organise them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
        <html lang="en">
            <body>
              {children}
            </body>
        </html>
    </Providers>
  );
}
