'use client'

import { Button } from '@heroui/react'
import { deleteEventById } from '@/actions/events'

const DeleteEventButton = ({ eventId }: { eventId: string }) => {
  const handleDelete = async () => {
    try {
      await deleteEventById(eventId)
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  return (
    <Button
      onPress={handleDelete}
      variant="ghost"
      size="sm"
      aria-label="Delete event"
      className="text-2xl text-red-600 hover:bg-red-100"
    >
      ×
    </Button>
  )
}

export default DeleteEventButton