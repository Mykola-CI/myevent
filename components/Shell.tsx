'use client'

import { usePathname } from 'next/navigation'
import Side from './Side'
import Nav from './Nav'
import React from 'react'

interface ShellProps {
  user: any
  count: number
  events: React.ReactNode
  rsvps: React.ReactNode
  children: React.ReactNode
}

const Shell = ({ user, count, events, rsvps, children }: ShellProps) => {
  const pathname = usePathname()

  return (
    <div className="flex w-screen h-screen">
      <aside className="w-[200px] min-w-[200px] max-w-[200px] h-full border-r border-default-50">
        <Side email={user?.email} />
      </aside>
      <div className="w-[calc(100vw-200px)] ">
        <Nav />
        <main className="h-[calc(100vh-65px)]">
          {pathname === '/dashboard' ? (
            <div className="flex w-full h-full">
              <div className="w-1/2 border-r border-default-50">{rsvps}</div>
              <div className="w-1/2 flex flex-col">
                <div className="border-b border-default-50 w-full h-1/2">
                  {events}
                </div>
                <div className="w-full h-1/2">
                  <div className="w-full flex h-full justify-center items-center">
                    <div>
                      <h4 className="text-lg">Attendees</h4>
                      <h2 className="text-6xl font-semibold my-8 text-center">
                        {count}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  )
}

export default Shell
