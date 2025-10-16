import { getMemberPhotosByUserId } from '@/app/actions/memberActions'
import React from 'react'
import { CardHeader, Divider, CardBody, Image } from '@nextui-org/react'
import CardInnerWrapper from '@/app/components/CardInnerWrapper'

export default async function PhotosPage({
    params
}: {
    params: { userId: string }
}) {
    const photos = await getMemberPhotosByUserId(params.userId)

    return (
        <CardInnerWrapper header='Photos' body={
            <div className='grid grid-cols-5 gap-3'>
                {photos && photos.map((photo) => (
                    <div key={photo.id}><Image src={photo.url} alt='member image' className='object-cover aspect-square'></Image></div>
                ))}
            </div>
        }></CardInnerWrapper>
        // <>
        //     <CardHeader className='text-2xl font-semibold text-secondary-300'>photos</CardHeader>
        //     <Divider></Divider>
        //     <CardBody>
        //         <div className='grid grid-cols-5 gap-3'>
        //             {photos && photos.map((photos) => (
        //                 <div key={photos.id}>
        //                     <Image src={photos.url} alt='image of member' className='object-cover aspect-square'></Image>
        //                 </div>
        //             ))}
        //         </div>
        //     </CardBody>
        // </>
    )
}

