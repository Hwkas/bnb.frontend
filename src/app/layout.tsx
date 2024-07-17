import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// my imports
import Navbar from "@/components/navbar/navbar";
import SearchModal from "@/components/modal/search-modal";
import LoginModal from "@/components/modal/login-modal";
import SignupModal from "@/components/modal/signup-modal";
import AddPropertyModal from "@/components/modal/add-property-modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bnb Clone",
  description: "AirBnb Clone App.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="pt-32">
          {children}
        </div>

        <SearchModal />
        <LoginModal />
        <SignupModal />
        <AddPropertyModal />
      </body>
    </html>
  );
}
