import { getMemberByUserId } from '@/app/actions/memberActions'
import React, { ReactNode } from 'react'
import MemberSidebar from '../MemberSidebar'
import { notFound } from 'next/navigation'
import { Card } from '@nextui-org/react'
export default async function Layout({
    children, params
}: {
    children: ReactNode
    params: { userId: string }
}) {
    const member = await getMemberByUserId(
        params.userId
    )
    if (!member) return notFound()
    const basePath = `/members/${member.userId}`
    const navLinks = [
        { name: 'profile', href: `${basePath}` },
        { name: 'photos', href: `${basePath}/photos` },
        { name: 'chat', href: `${basePath}/chat` }
    ]
    return (

        <div className='grid grid-cols-12 gap-5 h-[80vh]'>
            <div className='col-span-3'>
                <MemberSidebar member={member} navLinks={navLinks} ></MemberSidebar>
            </div>
            <div className='col-span-9'>
                <Card className='w-full mt-10 h-[80vh]'>
                    {children}
                </Card>
            </div>
        </div>)
}


