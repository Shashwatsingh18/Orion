import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DonationTrace | Follow every donation",
  description: "A verifiable financial trail for charitable funds."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
