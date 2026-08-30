import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ChatPanel } from "@/components/ChatPanel";
import { LiveBackground } from "@/components/LiveBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartKart | AI Shopping Assistant",
  description: "Compare prices instantly across platforms with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col text-white`}
        style={{ background: "#050508", position: "relative" }}
      >
        {/* Live animated background — renders as fixed layer */}
        <LiveBackground />

        {/* All page content sits above the background via z-index */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <ChatPanel />
        </div>
      </body>
    </html>
  );
}
