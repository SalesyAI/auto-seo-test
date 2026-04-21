import type { Metadata } from "next";
import LayoutProvider from "@/src/components/providers/layout-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhtasim Seyan | GTM System Architect & AI Builder",
  description: "I build the ops layer your business is missing. GTM System Architect & AI Builder for scaling agencies and tech-forward founders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Playfair+Display:wght@500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}