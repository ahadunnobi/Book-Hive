import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "animate.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BookHive | Discover & Borrow Your Next Great Read",
  description:
    "Explore a curated collection of 2,000+ books across 20 categories. BookHive offers a premium, fast, and seamless experience for book lovers to find and borrow their next favorite titles.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="bookhive">
      <body className={`${outfit.className} min-h-screen bg-base-100 text-base-content antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
