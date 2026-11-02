import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const bodyFont = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const monoFont = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Sri Sujeeth Sirivella | AI · Cybersecurity · Engineering",
  description: "Sri Sujeeth Sirivella — Computer Science and Engineering undergraduate exploring AI/ML, cybersecurity, networking and full-stack engineering.",
  openGraph: {
    title: "Sri Sujeeth Sirivella | Green terminal / intelligent systems",
    description: "Exploring intelligent systems, cybersecurity and networks through hands-on engineering.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Sri Sujeeth Sirivella", description: "AI · Cybersecurity · Networks" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050b08",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>{children}</body></html>;
}
