import type { Metadata } from "next";
import { Manrope, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Avery & Bryant | Real Estate Media & AI Infrastructure | Arkansas",
  description:
    "Professional real estate media, AI voice agents, virtual staging, and content systems for modern real estate operations. Little Rock & NW Arkansas.",
  metadataBase: new URL("https://averyandbryant.com"),
  openGraph: {
    type: "website",
    title: "Avery & Bryant | Real Estate Media & AI Infrastructure",
    description:
      "Professional real estate media, AI voice agents, virtual staging, and content systems for modern real estate operations.",
    siteName: "Avery & Bryant",
    images: ["/images/staging-twilight.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avery & Bryant | Real Estate Media & AI Infrastructure",
    description:
      "Professional real estate media, AI voice agents, virtual staging. Arkansas based, nationally scaled.",
    images: ["/images/staging-twilight.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: "/favicon.svg",
  },
  other: {
    "theme-color": "#C41230",
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
      className={`dark ${manrope.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
