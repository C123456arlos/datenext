import Link from 'next/link'
import React from 'react'

const MembersPage = () => {
    return (
        <div>
            <h3 className='text-3xl'>this is the members page</h3>
            <Link href='/'>back home</Link>
        </div>
    )
}

export default MembersPage
