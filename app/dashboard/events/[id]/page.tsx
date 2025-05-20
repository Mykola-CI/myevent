import { getOneEvent } from '@/utils/events'
import { getCurrentUser } from '@/utils/users'
import { redirect } from 'next/navigation'

interface PageParams {
  id: string
}

const EventPage = async ({ params }: { params: Promise<PageParams> }) => {
  const user = await getCurrentUser()
  const { id } = await params
  const event = await getOneEvent(user.id, id)

  if (!event) redirect('/dashboard/events')

  return <div className="pt-8 pl-8">{event.name}</div>
}

export default EventPage