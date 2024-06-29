"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { Store } from "../lib/store";
import Layout from "./client/components/layout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={Store}>
          <Layout>{children}</Layout>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
