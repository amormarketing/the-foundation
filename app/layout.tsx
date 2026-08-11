import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";


const sans = localFont({
  src: "./fonts/Neue.100.otf",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Foundation | Wisdom · Strength · Truth",
  description:
    "Supporting the education of the next generation through knowledge, advocacy, leadership, and action.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
      <Header />
      {children}
      <Footer />
      </body>
    </html>
  );
}
