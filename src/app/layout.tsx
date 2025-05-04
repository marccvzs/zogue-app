import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Comfortaa, ABeeZee } from "next/font/google";
import "./globals.css";
import Header from "@/app/_components/Header";
import Providers from "@/app/providers";
import { WebVitals } from '@/app/_components/web-vitals';
import Footer from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";

const comfortaaSans = Comfortaa({
  variable: "--font-comfortaa-sans",
  subsets: ["latin"],
});

const aBeeZee = ABeeZee({
  weight: '400',
  variable: "--font-abeezee-mono",
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
          className={`${comfortaaSans.variable} ${aBeeZee.variable} antialiased`}
        >
          <Providers>
            {/* @ts-ignore */}
            <WebVitals />
            <Header />
            <main>
              {children}
            </main>
            <Toaster />
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
