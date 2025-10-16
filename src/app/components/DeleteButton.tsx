import React from 'react'
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai'
import { PiSpinnerGap } from 'react-icons/pi'
type Props = {
    loading: boolean
}
export default function DeleteButton({ loading }: Props) {
    return (
        <div className='relative hover:opacity-80 transition cursor-pointer'>
            {!loading ? (<>
                <AiOutlineDelete size={32} className='fill-black absolute -top-[2px] -right-[2px]'></AiOutlineDelete>
                <AiFillDelete size={28} className='absolute -top-[2px] -right-[2px] fill-red-600'></AiFillDelete>
            </>) : (<PiSpinnerGap size={32} className='fill-white aniamte-spin'></PiSpinnerGap>)}
        </div>
    )
}