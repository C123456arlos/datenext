import React from "react"
import { CardHeader, Divider, CardBody } from "@nextui-org/react"
import EditForm from "./EditForm"
import { getAuthUserId } from "@/app/actions/authActions"
import { getMemberByUserId } from "@/app/actions/memberActions"
import { notFound } from "next/navigation"
import CardInnerWrapper from "@/app/components/CardInnerWrapper"
export default async function MemberEditPage() {
    const userId = await getAuthUserId()
    const member = await getMemberByUserId(userId)
    if (!member) return notFound()
    return (
        <CardInnerWrapper header='edit' body={<EditForm member={member}></EditForm>}></CardInnerWrapper>
    )
}
