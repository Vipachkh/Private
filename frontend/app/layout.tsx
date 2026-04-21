import type { Metadata } from "next";
import { Playfair_Display, Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

const prompt = Prompt({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["thai", "latin"],
  variable: '--font-prompt'
});

export const metadata: Metadata = {
  title: "VibeCafe | Typical Summer & Modern",
  description: "Experience the bright summer typical tone in our modern style cafe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`scroll-smooth ${playfair.variable} ${prompt.variable}`}>
      <body className="font-sans antialiased bg-brand-white text-brand-dark min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
