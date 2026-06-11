import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReplyKit Pro — 200+ Cold Outreach Templates That Book Calls",
  description:
    "Free, searchable library of battle-tested cold email, LinkedIn DM, and follow-up templates. Copy, customize, and send in under 60 seconds.",
  keywords: [
    "cold email templates",
    "linkedin dm templates",
    "outreach templates",
    "sales templates",
    "copy paste cold emails",
  ],
  openGraph: {
    title: "ReplyKit Pro — Free Outreach Templates",
    description: "200+ cold outreach templates. Copy, paste, close.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
