import type { Metadata } from "next";
import "./globals.css";
import { AntdProvider } from "@/components/providers/AntdProvider";

export const metadata: Metadata = {
  title: "PhotoFest • Event Photo Experiences",
  description:
    "PhotoFest გთავაზობთ ჯადოსნურ სარკეს, ფოტოკაბინას და 360° გამოცდილებას ღონისძიებებისთვის – ინდივიდუალური დიზაინი და მყისიერი გაზიარება.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans overflow-x-hidden">
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
