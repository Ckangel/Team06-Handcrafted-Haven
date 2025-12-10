import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Handcrafted Haven | Unique Artisan Products",
    template: "%s | Handcrafted Haven",
  },
  description:
    "Discover unique handcrafted products from talented artisans around the world. Shop handmade jewelry, pottery, textiles, woodwork, and more.",
  keywords: [
    "handcrafted",
    "artisan",
    "handmade",
    "unique products",
    "jewelry",
    "pottery",
    "textiles",
    "woodwork",
    "crafts",
    "gifts",
  ],
  authors: [{ name: "Handcrafted Haven Team" }],
  creator: "Handcrafted Haven",
  publisher: "Handcrafted Haven",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://handcrafted-haven.vercel.app"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Handcrafted Haven",
    title: "Handcrafted Haven | Unique Artisan Products",
    description:
      "Discover unique handcrafted products from talented artisans around the world. Shop handmade jewelry, pottery, textiles, woodwork, and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Handcrafted Haven - Unique Artisan Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Handcrafted Haven | Unique Artisan Products",
    description:
      "Discover unique handcrafted products from talented artisans around the world.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${inter.variable} antialiased font-sans`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
