"use client";

import "normalize.css";
import "./globals.css";
import { Inter } from "next/font/google";
import { AppProvider } from "./context/appContext";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "CyberArk Identity",
//   description: "CyberArk Identity with NodeJS",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
