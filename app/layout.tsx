import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Lume — Anéis e Pulseiras",
  description: "Anéis e pulseiras com acabamento premium e design sofisticado.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${inter.variable} bg-cream font-sans text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
