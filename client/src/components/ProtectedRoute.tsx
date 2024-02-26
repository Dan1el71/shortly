import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { getProfile } from '../api/auth'

interface Props {
  children?: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate()
  const profile = useAuthStore((state) => state.profile)
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

  if (!profile) return <Navigate to="/auth" />

  return <>{children || <Outlet />}</>
}
