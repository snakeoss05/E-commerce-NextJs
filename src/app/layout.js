"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { Store } from "../lib/store";
import Layout from "./client/components/layout";
import { Suspense } from "react";
import Loading from "./loading";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Mary's simple recipe for maple bacon donuts
           makes a sticky, sweet treat with just a hint
           of salt that you'll keep coming back for."></meta>
        <title>My App</title>
      </head>
      <body className={inter.className}>
        <Provider store={Store}>
          <Suspense fallback={<Loading />}>
            <Layout>{children}</Layout>
          </Suspense>
        </Provider>

        <Toaster />
      </body>
    </html>
  );
}
