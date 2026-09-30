import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"Material Depot Intelligence Hub",description:"Self-initiated business analytics case study for pricing, category, store and funnel decisions."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}