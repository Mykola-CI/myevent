// /components/Submit.tsx
'use client'

import { Button } from '@heroui/react'

interface SubmitProps {
  label: string
  isLoading?: boolean
  [key: string]: any
}

const SubmitButton = ({ label, isLoading, ...btnProps }: SubmitProps) => {

  return (
    <Button {...btnProps} type="submit" isLoading={isLoading}>
      {label}
    </Button>
  )
}

export default SubmitButton
