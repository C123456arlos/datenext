import { CardHeader, Divider, CardBody } from '@nextui-org/react'
import React from 'react'
export default function ChatPage() {
    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary-200'>chat</CardHeader>
            <Divider></Divider>
            <CardBody>chat goes here</CardBody>
        </>
    )
}