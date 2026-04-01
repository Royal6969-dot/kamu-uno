import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kamu Uno — Peru Travel Agency",
  description:
    "Discover the wonders of Peru. Machu Picchu, Amazon, Lake Titicaca and more. Personalized travel plans, no registration required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-stone-950 text-stone-100 antialiased">
        {children}
      </body>
    </html>
  );
}
