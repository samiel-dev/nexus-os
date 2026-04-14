import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusOS — The AI Business Operating System for Moroccan IT Startups",
  description:
    "NexusOS is the all-in-one AI-powered business platform built for IT startups in Morocco. Manage projects, clients, teams, invoices, and analytics — all in one intelligent hub.",
  keywords: [
    "SaaS Morocco",
    "IT startup platform",
    "project management Maroc",
    "CRM Rabat",
    "business software Morocco",
    "NexusOS",
  ],
  authors: [{ name: "NexusOS Team", url: "https://nexusos.ma" }],
  metadataBase: new URL("https://nexusos.ma"),
  openGraph: {
    title: "NexusOS — Business OS for Moroccan IT Startups",
    description:
      "All-in-one platform: Projects, CRM, Invoicing, HR & AI Analytics built for Morocco.",
    type: "website",
    locale: "fr_MA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
