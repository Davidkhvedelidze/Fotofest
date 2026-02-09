import type { Metadata } from "next";
import Script from "next/script";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased font-sans overflow-x-hidden"
        suppressHydrationWarning
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = stored || (systemPrefersDark ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {
                  console.error('Theme initialization failed', e);
                }
              })();
            `,
          }}
        />
        <AntdProvider>{children}</AntdProvider>
        <footer className="border-t border-white/30 font-sans bg-[#681155] py-10 text-center text-sm text-white">
          <p>
            © {new Date().getFullYear()} PhotoFest — გაიღიმე · გადაიღე ·
            გააზიარე
          </p>
        </footer>
      </body>
    </html>
  );
}
