import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./workspace.css";

export const metadata: Metadata = {
  title: "Material Depot Intelligence Hub",
  description: "Interactive business analytics workspace for pricing, category, store and funnel decisions."
};

export default function RootLayout({children}:{children:ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}