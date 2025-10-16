import { getMemberByUserId } from '@/app/actions/memberActions'
import React, { ReactNode } from 'react'
import MemberSidebar from '../MemberSidebar'
import { notFound } from 'next/navigation'
import { Card } from '@nextui-org/react'
import { getAuthUserId } from '@/app/actions/authActions'
export default async function Layout({
    children, params
}: {
    children: ReactNode
    params: { userId: string }
}) {
    const userId = await getAuthUserId()
    const member = await getMemberByUserId(
        userId
    )
    if (!member) return notFound()
    const basePath = `/members/edit`
    const navLinks = [
        { name: 'edit profile', href: `${basePath}` },
        { name: 'update', href: `${basePath}/photos` }
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
// 2:16
// 2:31


