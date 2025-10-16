import { Spinner } from "@nextui-org/react";
import { color } from "framer-motion";
import React from 'react'
export default function LoadingComponent({
    label
}: { label?: string }) {
    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <Spinner label={label || 'loading'} color="default"></Spinner>
        </div>
    )
}