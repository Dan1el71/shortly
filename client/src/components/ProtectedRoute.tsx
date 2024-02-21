import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { getProfile } from '../api/auth'

interface Props {
  children?: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate()
  const setProfile = useAuthStore((state) => state.setProfile)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await getProfile()
        setProfile(data.profile)
      } catch (error) {
        navigate('/auth', {
          replace: true,
        })
      }
    }

    loadProfile()
  }, [navigate, setProfile])

  return <>{children || <Outlet />}</>
}
