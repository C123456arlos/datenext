import { getAuthUserId } from '@/app/actions/authActions'
import { getMemberByUserId, getMemberPhotosByUserId } from '@/app/actions/memberActions'
import React from 'react'
import MemberPhotos from '@/app/components/MemberPhotos'
import MemberPhotoUpload from './MemberPhotoUpload'
import CardInnerWrapper from '@/app/components/CardInnerWrapper'
export default async function PhotosPage() {
    const userId = await getAuthUserId()
    const member = await getMemberByUserId(userId)
    const photos = await getMemberPhotosByUserId(userId)
    return (
        <>
            <CardInnerWrapper header='edit profile' body={
                <>
                    {" "}
                    <MemberPhotoUpload></MemberPhotoUpload>
                    <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image}></MemberPhotos>


                </>}></CardInnerWrapper>
        </>
    )
}



