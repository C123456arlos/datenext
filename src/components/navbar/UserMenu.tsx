'use client'
import { signOutUser } from '@/app/actions/authActions'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'
type Props = {
    user: Session['user']
}
export default function UserMenu({
    user,
}: Props) {
    return (
        <Dropdown placement='bottom-end'>
            <DropdownTrigger>
                <Avatar isBordered as='button' className='transition-transform' color='default' name={user?.name || 'user avatar'} size='sm' src={user?.image || '/images/user.jpg'}></Avatar>
            </DropdownTrigger>
            <DropdownMenu variant='flat' aria-label='user actions menu'>
                <DropdownSection showDivider>
                    {/* @ts-ignore */}
                    <DropdownItem isReadOnly as='span' className='h-14 flex flex-row' aria-label='username'>signed in as {user?.name}</DropdownItem>
                </DropdownSection>
                {/* @ts-ignore */}
                <DropdownItem as={Link} href='/members/edit'>edit profile</DropdownItem>
                {/* @ts-ignore */}
                <DropdownItem color='danger' onClick={async () => signOutUser()}>log out</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}