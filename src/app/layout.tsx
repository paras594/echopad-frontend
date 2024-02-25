import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
// import NavComponent from "@/components/NavComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Echopad",
  description: "Sharing content across multiple devices with ease.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["echopad", "sync", "text sync", "share text"],
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#231942" }],
  authors: [{ name: "Paras Arora" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cupcake">
      <body
        className={`${inter.className} min-h-screen overflow-hidden flex flex-col`}
      >
        <AuthProvider>
          <Navbar />
          {/* <NavComponent /> */}
          <div className="flex-1">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
