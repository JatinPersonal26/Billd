// app/layout.tsx
import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers"; // from above
import "./globals.css";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { ModeToggle } from "@/components/custom/ModeToggle";
import { useEffect } from "react";
import { useRouter } from "next/router";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Billd",
  description: "Custom billing App",
  icons: {
    icon: "/bill.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <ModeToggle />
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
