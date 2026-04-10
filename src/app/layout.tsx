import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ember — Algo grande está se aproximando",
  description:
    "Uma convocação foi iniciada. Assista à mensagem e garanta seu lugar na lista.",
  openGraph: {
    title: "Ember — Convocação",
    description: "Uma convocação foi iniciada.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-[#0a0a0a] font-sans text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
