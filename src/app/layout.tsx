import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UltraLux - Miami Ultra-Luxury Real Estate",
  description: "Discover ultra-luxury properties in Miami's most exclusive neighborhoods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
