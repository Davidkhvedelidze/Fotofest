import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FotoFest • Event Photo Experiences",
  description:
    "FotoFest გთავაზობთ ჯადოსნურ სარკეს, ფოტოკაბინას და 360° გამოცდილებას ღონისძიებებისთვის – ინდივიდუალური დიზაინი და მყისიერი გაზიარება.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
