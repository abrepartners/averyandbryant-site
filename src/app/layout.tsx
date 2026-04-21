import type { Metadata } from "next";
import { Manrope, Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/nav";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Footer } from "@/components/footer";
import { Analytics, AnalyticsNoScript } from "@/components/analytics";
import { UtmCapture } from "@/components/utm-capture";

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
    "Professional real estate media, AI voice agents, virtual staging, and content systems for modern real estate operations. Little Rock, Arkansas.",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Avery & Bryant - Real Estate Media",
              "@id": "https://averyandbryant.com",
              "url": "https://averyandbryant.com",
              "telephone": "(501) 502-2925",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "12521 Kanis Rd",
                "addressLocality": "Little Rock",
                "addressRegion": "AR",
                "postalCode": "72211",
                "addressCountry": "US",
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 34.7465,
                "longitude": -92.3582,
              },
              "priceRange": "$$",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "24",
              },
              "areaServed": [
                { "@type": "City", "name": "Little Rock" },
                { "@type": "City", "name": "Benton" },
                { "@type": "City", "name": "Conway" },
                { "@type": "City", "name": "Hot Springs" },
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Real Estate Media Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Real Estate Photography",
                      "description": "Professional HDR listing photography",
                    },
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Real Estate Video Tours",
                      "description": "Cinematic property video tours with drone footage",
                    },
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Drone Photography",
                      "description": "FAA-licensed aerial photography and videography",
                    },
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Virtual Staging",
                      "description": "AI-powered virtual staging via StudioAI",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AnalyticsNoScript />
        <Analytics />
        <UtmCapture />
        <Nav />
        <main>{children}</main>
        <ScrollToTop />
        <Footer />
        {/* GHL visitor tracking — ties site behavior back to contacts in GHL */}
        <Script
          id="ghl-tracking"
          src="https://link.averyandbryant.com/js/external-tracking.js"
          data-tracking-id="tk_5a641e0f012240c7bedc21fba0692d75"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
