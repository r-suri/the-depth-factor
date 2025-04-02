import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "The Depth Factor - Personal Growth Companion",
  description: "The Depth Factor helps you navigate life's challenges with personalized guidance rooted in depth psychology.",
  keywords: "personal growth, depth psychology, self-help, mental health, wellbeing, life coaching",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${poppins.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#121212" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-poppins antialiased">
        {/* Background accent elements for personality */}
        <div className="fixed top-20 right-[10%] accent-dot"></div>
        <div className="fixed bottom-20 left-[10%] accent-dot-secondary"></div>
        {children}
      </body>
    </html>
  );
}
