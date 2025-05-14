'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

const COOKIE_NAME = 'dashboard_success_message'

function getCookie(name: string) {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`
}

export default function DashboardSuccessToast() {
  useEffect(() => {
    const message = getCookie(COOKIE_NAME)
    if (message) {
      toast.success(message)
      deleteCookie(COOKIE_NAME)
    }
  }, [])

  return null
}
