import { getMemberByUserId } from '@/app/actions/memberActions'
import CardInnerWrapper from '@/app/components/CardInnerWrapper'
import { notFound } from 'next/navigation'
import React from 'react'
export default async function MemberDetailedPage({
    params
}: { params: { userId: string } }) {
    const member = await getMemberByUserId(
        params.userId
    )
    if (!member) return notFound()
    return (
        <CardInnerWrapper header='profile' body={member.description}></CardInnerWrapper>
    )
}




