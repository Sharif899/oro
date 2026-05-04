import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ORO — Less Decisions. Better Execution.",
  description: "ORO monitors, adapts, and executes so your capital follows a structured system over time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
