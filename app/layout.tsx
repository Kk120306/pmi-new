import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/app/ui/Navbar";
import Footer from "@/app/ui/Footer";

export const metadata: Metadata = {
    title: "Pacific Market Insights",
    description:
        "Explore articles and equity research decks from Pacific Market Insights.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />  
        {children}
        <Footer />
      </body>
    </html>
  );
}
