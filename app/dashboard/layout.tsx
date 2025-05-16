import { getCurrentUser } from '@/utils/users'
import DashboardSuccessToast from '@/components/DashboardSuccessToast'
import { getAttendeesCountForDashboard } from '@/utils/attendees'
import Shell from '@/components/Shell'

const DashboardLayout = async ({
  children,
  events,
  rsvps,
}: {
  children: React.ReactNode
  events: React.ReactNode
  rsvps: React.ReactNode
}) => {
  const user = await getCurrentUser()
  const count = await getAttendeesCountForDashboard(user.id)

  return (
    <>
      <DashboardSuccessToast />
      <Shell user={user} count={count} events={events} rsvps={rsvps}>
        {children}
      </Shell>
    </>
  )
}

export default DashboardLayout