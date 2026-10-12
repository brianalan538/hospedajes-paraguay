import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
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
  title: "Hospedajes Paraguay 🇵🇾",
  description: "Directorio de hospedajes, hoteles y cabañas en Paraguay. Reservá por WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-100 text-stone-900">
        <Header />
        <div className="flex-1">{children}</div>
        <footer className="mt-10 bg-white py-6 text-center text-xs font-semibold text-stone-500 ring-1 ring-stone-200">
          Hospedajes Paraguay · Hecho con 🧉 en Paraguay · Reserva directa por WhatsApp
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
