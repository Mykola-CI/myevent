// /actions/events.ts
'use server'

import { db } from '@/db/db'
import { events } from '@/db/schema'
import { delay } from '@/utils/delay'
import { getCurrentUser } from '@/utils/users'
import randomName from '@scaleway/random-name'
import { revalidateTag } from 'next/cache'
import { eq } from 'drizzle-orm' 

export const createNewEvent = async () => {
  await delay(1000)
  const user = await getCurrentUser()

  await db.insert(events).values({
    startOn: new Date().toUTCString(),
    createdById: user.id,
    isPrivate: false,
    name: randomName('event', ' '),
  })

  revalidateTag('events')
  revalidateTag('dashboard:events')
}

export const deleteEventById = async (id: string) => {
  await db.delete(events).where(eq(events.id, id))
  revalidateTag('events')
  revalidateTag('dashboard:events')
}