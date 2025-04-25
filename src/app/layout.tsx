import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/_components/Header";
import Providers from "@/app/providers";
import { WebVitals } from '@/app/_components/web-vitals';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zoguë",
  description: "The Foster app by Foster people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
            {/* @ts-ignore */}
            <WebVitals />
            <Header />
            {children}
            <footer className='bg-primary w-full text-center p-4'>
              <p>Zoguë.app &#169;2025 - All rights reserved</p>
            </footer>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
