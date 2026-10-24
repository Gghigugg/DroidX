import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IG Agent OS — Creator Operations",
  description: "A human-supervised AI team for Instagram creator workflows."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
