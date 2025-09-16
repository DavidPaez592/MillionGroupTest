import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Saira } from "next/font/google";
import Footer from "@/components/Footer";
import LoadingIndicator from "@/components/LoadingIndicator";
// Make sure MainNav exists at the correct path and extension
// Update the import path and extension if needed
import MainNav from "@/app/MainNav";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-heading", subsets: ["latin"] });
const saira = Saira({ variable: "--font-saira", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Million — Propiedades",
  description: "Listado de propiedades (tech test)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${saira.variable} antialiased`}
        style={{ fontFamily: "var(--font-saira), sans-serif" }}
      >
        <LoadingIndicator />
        <MainNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
