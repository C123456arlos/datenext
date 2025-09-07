import React, { ReactNode } from "react";

// 1. import `HeroUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
export default function Providers({
    children }: { children: ReactNode }) {
    return (
        <NextUIProvider>{children}</NextUIProvider>
    );
}