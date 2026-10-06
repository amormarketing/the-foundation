import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const sans = localFont({
  src: "../public/fonts/Neue.100.otf",
  variable: "--font-sans",
  display: "swap",
  // The file's ascent (718) equals its cap height (720), so text renders high in
  // its line box. Rebalance ascent/descent around the cap height, keeping the
  // 1em total so line heights are unchanged.
  declarations: [
    { prop: "ascent-override", value: "86%" },
    { prop: "descent-override", value: "14%" },
    { prop: "line-gap-override", value: "20%" },
  ],
});

const serif = localFont({
  src: "../public/fonts/bookish.regular.otf",
  variable: "--font-serif",
  display: "swap",
});
export const metadata: Metadata = {
  title: "The Foundation | Educating our future.",
  description:
    "Supporting the education of the next generation through knowledge, advocacy, leadership, and action.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
      <Header />
      {children}
      <Footer />
      </body>
    </html>
  );
}
