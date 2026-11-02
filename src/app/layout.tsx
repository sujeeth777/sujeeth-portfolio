import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sri Sujeeth Sirivella | AI · Cybersecurity · Engineering",
  description: "Sri Sujeeth Sirivella — Computer Science and Engineering undergraduate exploring AI/ML, cybersecurity, networking and full-stack engineering.",
  openGraph: {
    title: "Sri Sujeeth Sirivella | Engineering with intent",
    description: "Exploring intelligent systems, cybersecurity and networks through hands-on engineering.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Sri Sujeeth Sirivella", description: "AI · Cybersecurity · Networks" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080d18",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
