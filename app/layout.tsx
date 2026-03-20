import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "South Jersey Sourdough Share",
  description: "Share pages for South Jersey Sourdough products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}