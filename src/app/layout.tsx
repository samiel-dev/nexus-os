import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "NexusOS", template: "%s — NexusOS" },
  description: "The professional business operating system for IT companies in Morocco. Projects, CRM, Invoicing, HR & AI — all in one platform.",
  keywords: ["SaaS Maroc", "gestion de projet Rabat", "CRM Maroc", "facturation MAD", "NexusOS", "plateforme IT Maroc"],
  authors: [{ name: "NexusOS", url: "https://nexus-os-blush.vercel.app" }],
  metadataBase: new URL("https://nexus-os-blush.vercel.app"),
  openGraph: {
    title: "NexusOS — The Business Platform for Moroccan IT",
    description: "Professional project management, CRM, invoicing, HR & AI for IT companies in Morocco.",
    type: "website",
    locale: "fr_MA",
    siteName: "NexusOS",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%237C3AED'/><path d='M10 8l6 8-6 8h4l4-5.33L22 24h4l-6-8 6-8h-4l-4 5.33L14 8z' fill='white'/></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
