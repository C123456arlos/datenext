import Image from 'next/image'
import React from 'react'
import { Photo, Role } from '@prisma/client';
import { CldImage } from 'next-cloudinary';
import clsx from 'clsx';
import { Button } from '@nextui-org/react';
import { ImCheckmark, ImCross } from 'react-icons/im'
import { auth } from '@/auth';
import { useRole } from '../hooks/useRole';
import { useRouter } from 'next/navigation';
import { approvePhoto, rejectPhoto } from '../actions/adminActions';
import { toast } from 'react-toastify';
type Props = {
    photo: Photo | null;
};
export default function MemberImage({
    photo,
}: Props) {
    const role = useRole()
    const isAdmin = role === 'ADMIN'
    const router = useRouter()
    if (!photo) return null
    const approve = async (photoId: string) => {
        try {
            await approvePhoto(photoId)
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    const reject = async (photo: Photo) => {
        try {
            await rejectPhoto(photo)
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    // const session = await auth()
    // const role = session?.user.role
    return (
        <div>
            {photo?.publicId ? (<CldImage alt='image of member' src={photo.publicId} width={300} height={300} crop='fill' gravity='faces'
                className={clsx('rounded-2xl', { 'opacity-40': !photo.isApproved && !isAdmin })} priority></CldImage>) : (<Image width={220} height={220} src={photo?.url || '/images/user.jpg'} alt='image of user'></Image>)
            }
            {!photo?.isApproved && role !== Role.ADMIN && (<div
                className='absolute bottom-2 w-full bg-slate-200 p-1'>
                <div className='flex justify-center text-danger font-semibold'>awaiting approval</div>
            </div>)}
            {isAdmin && (
                <div className='flex flex-row gap-2 mt-2'>
                    <Button onPress={() => approve(photo.id)} color='success' variant='bordered' fullWidth>
                        <ImCheckmark size={20}></ImCheckmark>
                    </Button>
                    <Button onPress={() => reject(photo)} color='danger' variant='bordered' fullWidth>
                        <ImCross size={20}></ImCross>
                    </Button>
                </div>
            )}
        </div>
    )
}








