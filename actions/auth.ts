'use server'
import { cookies } from 'next/headers'
import { signin, signup } from '@/utils/authTools'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '@/utils/constants'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}

export const registerUser = async (
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> => {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { token } = await signup(data)
    // Use ResponseCookies to set the cookie
    const responseCookies = await cookies() // This provides ResponseCookies
    responseCookies.set(COOKIE_NAME, token) // Set the cookie

  } catch (e) {
    console.error(e)
    return { success: false, message: 'Failed to sign you up' }
  }
  // Redirect to the dashboard on success
  redirect('/dashboard')
}

export const signinUser = async (
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> => {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { token } = await signin(data)
    // Use ResponseCookies to set the cookie
    const responseCookies = await cookies() // This provides ResponseCookies
    responseCookies.set(COOKIE_NAME, token) // Set the cookie

  } catch (e) {
    console.error(e)
    return { success: false, message: 'Failed to sign you in' }
  }
   // Redirect to the dashboard on success
  redirect('/dashboard')
}
