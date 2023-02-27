import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'

export interface useAuthProps {}

export function useAuth() {
  const [cookies, setCookies] = useCookies(['AUTH_BEARER_default'])

  useEffect(() => {
    console.log(cookies)
  }, [cookies])
}
