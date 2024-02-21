export type State = {
  profile: Profile | null
  isAuth: boolean
}

export type Actions = {
  setProfile: (profile: Profile) => void
  logout: () => void
}

export type Profile = {
  _id: number
  username: string
  guest: boolean
  iat: number
  exp: number
}
