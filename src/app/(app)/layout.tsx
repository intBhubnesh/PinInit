"use client"
import { Suspense } from "react";
import Loading from "./loading";
import Protected from "@/components/AuthLayout";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
         {/* <Protected authentication={true} > */}
            {/* <Suspense fallback={<Loading />}> */}
              {children}
            {/* </Suspense> */}
         {/* </Protected> */}
    </>
  );
}
