import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JANAPADA - Nurturing Young Readers & Writers | Bangalore",
  description: "A noble educational initiative promoting writing skills, encouraging reading, and cultivating love for literature in English & Kannada. Quarterly competitions for high school students in Bangalore (grades 9-12).",
  keywords: ["essay competition", "writing competition", "Bangalore", "Kannada", "English", "bilingual education", "reading", "literature", "high school", "students"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
