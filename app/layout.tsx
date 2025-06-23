import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/app/ui/Navbar"; 
import Footer from "@/app/ui/Footer";

export const metadata: Metadata = {
  title: "Pacific Market Insights",
  description:
    "Discover our collection of articles where we explore the latest trends and insights.",
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
