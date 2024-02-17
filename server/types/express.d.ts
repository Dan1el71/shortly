declare namespace Express {
  export interface Request {
    user: {
      _id: number
      username: string
      guest: boolean
    }
  }
}
