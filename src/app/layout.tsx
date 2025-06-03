import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { AuthProvider } from "@/contexts/auth-context";
import { SocketProvider } from "@/contexts/socket-context";
import SetupSocketEvents from "@/components/SetupSocketEvents";
import QueryClientWrapperProvider from "@/components/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Echopad",
  description: "Sharing content across multiple devices with ease.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["echopad", "sync", "text sync", "share text"],
  authors: [{ name: "Paras Arora" }],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  shrinkToFit: false,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#231942" }],
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
          <QueryClientWrapperProvider>
            <SocketProvider>
              <SetupSocketEvents />
              <Navbar />
              <div className="flex-1">{children}</div>
            </SocketProvider>
          </QueryClientWrapperProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
