import { getAllEvents } from '@/utils/events'
import { getCurrentUser } from '@/utils/users'
import Link from 'next/link'
import DeleteEventButton from '@/components/DeleteEventButton'

const Events = async () => {
  const user = await getCurrentUser()
  const events = await getAllEvents(user.id)

  return (
    <div className="pt-8 pl-8 w-96">
      {events.map((event) => (
      <div key={event.id} className="pt-2 w-full flex items-center justify-between">
        <Link
        href={`/dashboard/events/${event.id}`}
        className="hover:underline hover:text-blue-800 transition-colors"
        >
        {event.name}
        </Link>
        <DeleteEventButton eventId={event.id} />
      </div>
      ))}
    </div>
  )
}

export default Events