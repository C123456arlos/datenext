'use client'
import { Tab, Tabs } from '@nextui-org/react'
import { Member } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useTransition } from 'react'
import { Key } from 'react'
import MemberCard from '../members/MemberCard'
import LoadingComponent from '../components/Loading'
type Props = {
    members: Member[]
    likeIds: string[]
}
export default function ListsTab({ members, likeIds }: Props) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    console.log(pathname)
    const [isPending, startTransition] = useTransition()
    const tabs = [
        {
            id: 'source',
            label: 'i liked'
        },
        {
            id: 'target',
            label: 'like me',
        },
        {
            id: 'mutual',
            label: 'mutual'
        }
    ]
    function handleTabChange(key: Key
    ) {
        startTransition(() => {
            const params = new URLSearchParams(searchParams)
            params.set('type', key.toString())
            router.replace(
                `${pathname}?${params.toString()}`
            )
        })
    }
    return (
        <div className='flex w-full flex-col mt-10 gap-5'>
            <Tabs aria-label='like' items={tabs} color='default' onSelectionChange={(key) => handleTabChange(key)}>
                {(item) => (<Tab key={item.id} title={item.label}>{
                    isPending ? (<LoadingComponent></LoadingComponent>) : (
                        <>
                            {members.length > 0 ? (
                                <div className='grid grid-cols-2 md:grid-c0ls-3 xl:grid-cols-6 gap-8'>
                                    {members.map((member) => (<MemberCard key={member.id} member={member} likeIds={likeIds}></MemberCard>))}
                                </div>
                            ) : <div>nope</div>}</>
                    )}</Tab>)}
            </Tabs>
        </div>
    )
}