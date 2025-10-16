'use client'
import useMessageStore from '../hooks/useMessageStore'
import { useNotificationChannel } from '../hooks/useNotificationChannel'
import { usePresenceChannel } from '../hooks/usePresenceChannel'
import { NextUIProvider } from '@nextui-org/react'
import React, { ReactNode, useCallback, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getUnreadMessageCount } from '../actions/messageActions'
export default function Providers({
    children, userId
}: { children: ReactNode, userId: string | null }) {
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

    useEffect(() => {
        if (userId) {
            getUnreadMessageCount().then((count) => {
                setUnreadCount(count);
            });
        }
    }, [setUnreadCount, userId]);
    // usePresenceChannel();
    // useNotificationChannel(userId);
    return (
        <NextUIProvider>
            {/* <ToastContainer>
            </ToastContainer> */}
            {children}
        </NextUIProvider>
    )
}
