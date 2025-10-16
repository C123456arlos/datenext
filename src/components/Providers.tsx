// 'use client'
// import React, { ReactNode } from "react";

// // 1. import `HeroUIProvider` component
// import { NextUIProvider } from "@nextui-org/react";
// import { usePresenceChannel } from "../hooks/usePresenceChannel";
// import { useNotificationChannel } from "../hooks/useNotificationChannel";
// export default function Providers({
//     children, userId }: { children: ReactNode, userId: string | null }) {
//     usePresenceChannel()
//     useNotificationChannel(userId)
//     return (
//         <NextUIProvider>{children}</NextUIProvider>
//     );
// }



"use client";

import { getUnreadMessageCount } from "@/app/actions/messageActions";
import useMessageStore from "../app/hooks/useMessageStore";
import { useNotificationChannel } from "../app/hooks/useNotificationChannel";
import { usePresenceChannel } from "../app/hooks/usePresenceChannel";
import { NextUIProvider } from "@nextui-org/react";
import React, {
    ReactNode,
    useCallback,
    useEffect,
    useRef,
} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

export default function Providers({
    children,
    userId,
    profileComplete

}: {
    children: ReactNode;
    userId: string | null;
    profileComplete: boolean

}) {
    const isUnreadCountSet = useRef(false)
    const { updateUnreadCount } = useMessageStore(
        (state) => ({
            updateUnreadCount: state.updateUnreadCount,
        })
    );

    const setUnreadCount = useCallback(
        (amount: number) => {
            updateUnreadCount(amount);
        },
        [updateUnreadCount]
    );

    // useEffect(() => {
    //     if (!isUnreadCountSet && userId) {
    //         getUnreadMessageCount().then((count) => {
    //             setUnreadCount(count);
    //         });
    //     }
    // }, [setUnreadCount, userId]);
    useEffect(() => {
        if (userId) {
            getUnreadMessageCount().then((count) => {
                setUnreadCount(count);
            });
        }
    }, [userId]);
    usePresenceChannel(userId, profileComplete);
    useNotificationChannel(userId, profileComplete);
    return (
        <SessionProvider>
            <NextUIProvider>
                <ToastContainer
                    position="top-right"
                    hideProgressBar
                />
                {children}
            </NextUIProvider>
        </SessionProvider>
    );
}
