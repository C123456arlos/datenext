'use client'
// import { MessageDto } from '@/types'
// import { Button, Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
// import React from 'react'
// import MessageTableCell from './MessageTableCell'
// import { userMessages } from '@/hooks/useMessages'
import { AiFillDelete } from "react-icons/ai"
import { deleteMessage } from '../actions/messageActions'
import { truncateString } from '@/lib/util'
import { MessageDto } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"
import { Key, useCallback, useState } from "react"
import { Avatar, Button, Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import PresenceAvatar from "../components/PresenceAvatar"
import { useMessages } from "../hooks/useMessages"
import MessageTableCell from "./MessageTableCell"

type Props = {
    initialMessages: MessageDto[]
    nextCursor?: string
}
const outboxColumns = [
    { key: 'recipientName', label: 'recipient' },
    { text: 'text', label: 'message' },
    { key: 'created', label: 'date sent' },
    { key: 'actions', label: 'actions' }
]
const inboxColumns = [
    { key: 'senderName', label: 'sender' },
    { key: 'text', label: 'message' },
    { key: 'created', label: 'date received' },
    { key: 'actions', label: 'actions' }
]
export default function MessageTable({ initialMessages, nextCursor }: Props) {
    const { columns, isOutbox, isDeleting, deleteMessage, selectRow, messages, loadMore, loadingMore, hasMore } = useMessages(initialMessages, nextCursor)
    return (
        <div className="flex flex-col h-[80vh]">
            <Card>
                <Table aria-label="table with messages" selectionMode="single"
                    onRowAction={(key: React.Key) => selectRow(key)} shadow='none' className="flex flex-col gap-3 h-[80vh] overflow-auto">
                    <TableHeader columns={columns}>{(column) => (<TableColumn key={column.key} width={column.key === 'text' ? '50%' : undefined}>{column.label}</TableColumn>)}
                    </TableHeader>
                    <TableBody
                        items={messages}
                        emptyContent="No messages for this container"
                    >
                        {(item) => (
                            <TableRow
                                key={item.id}
                                className="cursor-pointer"
                            >
                                {(columnKey) => (
                                    <TableCell
                                        className={`${!item.dateRead && !isOutbox
                                            ? "font-semibold"
                                            : ""
                                            }`}
                                    >
                                        <MessageTableCell
                                            item={item}
                                            columnKey={
                                                columnKey as string
                                            }
                                            isOutbox={isOutbox}
                                            deleteMessage={
                                                deleteMessage
                                            }
                                            isDeleting={
                                                isDeleting.loading &&
                                                isDeleting.id === item.id
                                            }
                                        />
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="sticky bottom-0 pb-3 mr-3 text-right">
                    <Button color="default" isLoading={loadingMore} isDisabled={!hasMore} onClick={loadMore}>
                        {hasMore ? 'load more' : 'no messages'}
                    </Button>
                </div>
            </Card>
        </div>
    )
}

