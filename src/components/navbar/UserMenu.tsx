'use client'
import { signOutUser } from '@/app/actions/authActions'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'
type Props = {
    userInfo: {
        name: string | null,
        image: string | null
    } | null
}
export default function UserMenu({
    userInfo,
}: Props) {
    return (
        <Dropdown placement='bottom-end'>
            <DropdownTrigger>
                <Avatar isBordered as='button' className='transition-transform' color='default' name={userInfo?.name || 'user avatar'} size='sm' src={userInfo?.image || '/images/user.jpg'}></Avatar>
            </DropdownTrigger>
            <DropdownMenu variant='flat' aria-label='user actions menu'>
                <DropdownSection showDivider>
                    {/* @ts-ignore */}
                    <DropdownItem isReadOnly as='span' className='h-14 flex flex-row' aria-label='username'>signed in as {userInfo.name}</DropdownItem>
                </DropdownSection>
                {/* @ts-ignore */}
                <DropdownItem as={Link} href='/members/edit'>edit profile</DropdownItem>
                {/* @ts-ignore */}
                <DropdownItem color='danger' onClick={async () => signOutUser()}>log out</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}