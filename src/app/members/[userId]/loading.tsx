import { Spinner } from '@nextui-org/react'
import React from 'react'
export default function Loading() {
    return (
        <div className='flex justify-center items-center my-auto'>
            <Spinner label='loading' color='default'></Spinner>
        </div>
    )
}