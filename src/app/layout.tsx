import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
