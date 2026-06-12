import type { Metadata } from "next";
import { Bebas_Neue, Dancing_Script, Montserrat } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "Royal Priesthood Embassy Thika",
    "Kingdom Formation Kenya",
    "Pastor Charles Muchemi",
    "church Thika Kenya",
    "online church service Kenya",
  ],
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    url: "https://rpwebsite.vercel.app",
    siteName: site.name,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${bebasNeue.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream font-sans text-charcoal">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-burgundy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
