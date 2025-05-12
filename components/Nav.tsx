'use client'
import { Input } from "@heroui/react"
import { Button, Tooltip } from "@heroui/react"
import { CirclePlus } from 'lucide-react'

const Nav = () => {
  return (
    <nav className="h-[65px] border-b border-default-50 flex items-center px-6 gap-4">
      <div className="w-1/2">
        <Input size="sm" variant="faded" placeholder="search" />
      </div>
    </nav>
  )
}

export default Nav
