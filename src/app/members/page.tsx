import React from 'react'
import { getMembers } from '../actions/memberActions'
import MemberCard from './MemberCard'
import { Photo } from '@prisma/client'
export default async function MembersPage() {
    const members = await getMembers()
    return (
        <div className='mt-6 md:mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-8'>
            {members && members.map((member) => <MemberCard member={member} key={member.id}></MemberCard>)}
        </div>
    )
}
