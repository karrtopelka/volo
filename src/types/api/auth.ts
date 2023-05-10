export type UserAuthInfo = {
  refreshToken: string
  accessToken: string
}

export type UserCredentials = {
  email: string
  password: string
  longitude: number
  latitude: number
}

export type LoginError = {
  detail: string
}
