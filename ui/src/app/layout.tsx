import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ConnectionProvider } from "@/contexts/connexion.provider";
import Image from "next/image";
import Nav from "@/app/_components/Nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Phish Aware",
  description:
    "Phish Aware vous apprend à détecter et à vous protéger contre les attaques de phishing. Explorez nos ressources et renforcez votre sécurité numérique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-800`}
      >
        <TooltipProvider>
          <ConnectionProvider>
            <div className="min-h-screen text-white flex flex-col relative items-center justify-center p-4">
              <Nav />
              <div className="fixed top-0 left-0 w-full h-full z-0">
                <Image
                  src="/images/bg.jpeg"
                  alt={`Background`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="w-full h-full relative z-10 flex justify-center items-center">
                {children}
              </div>
            </div>
          </ConnectionProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
