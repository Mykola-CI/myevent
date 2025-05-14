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

const SUCCESS_COOKIE = 'dashboard_success_message'

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
     // Set a client-readable cookie for the success message
    responseCookies.set(SUCCESS_COOKIE, 'Sign up successful!', {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 10, // expire quickly
    })

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
      // Set a client-readable cookie for the success message
    responseCookies.set(SUCCESS_COOKIE, 'Sign in successful!', {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 10,
    })

  } catch (e) {
    console.error(e)
    return { success: false, message: 'Failed to sign you in' }
  }
   // Redirect to the dashboard on success
  redirect('/dashboard')
}
