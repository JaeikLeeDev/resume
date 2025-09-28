import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getPersonalInfoDB } from "@/lib/notion";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const personalInfo = await getPersonalInfoDB();
    return {
      title: `개발자 ${personalInfo.name} 이력서`,
      description: `${personalInfo.position} ${personalInfo.name} 이력서`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Fallback metadata in case of error
    return {
      title: "개발자 이력서",
      description: "개발자 이력서 웹사이트",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
