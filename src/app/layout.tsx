"use-client";

import type { Metadata } from "next";
import "./globals.css";
import { bespak, northden, poppins, routhem } from "./fonts/font";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export const metadata: Metadata = {
  title: "Logo Electronics",
  description: "Created by Rahul Rana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${bespak.variable} ${routhem.variable}  ${northden.variable}`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
