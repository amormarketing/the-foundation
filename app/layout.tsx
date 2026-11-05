import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import MessageWidget from "@/app/components/MessageWidget";
import { pageMetadata, SITE_URL } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({
    path: "/",
    title: "The Foundation | Educating our future.",
    shareTitle: "$1,000+ Scholarship for Students Who Lead | The Foundation",
    description:
      "Free to apply. For U.S. high school juniors and seniors and college, trade, and vocational students. Reviewed every quarter. A 501(c)(3) nonprofit.",
  }),
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
      <MessageWidget />
      </body>
    </html>
  );
}
