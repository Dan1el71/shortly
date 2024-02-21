import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Actions, State, Profile } from '../types/types'

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      profile: null,
      isAuth: false,
      setProfile: (profile: Profile) =>
        set(() => ({
          profile,
          isAuth: true,
        })),
      logout: () =>
        set(() => ({
          profile: null,
          isAuth: false,
        })),
    }),
    {
      name: 'auth',
    }
  )
)
