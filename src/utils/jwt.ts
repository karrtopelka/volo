import jwtDecode from 'jwt-decode'

export const isValidToken = (token: string) => {
  if (!token) {
    return false
  }

  const decoded = jwtDecode<{ exp: number }>(token)
  const currentTime = Date.now() / 1000

  return decoded.exp > currentTime
}
