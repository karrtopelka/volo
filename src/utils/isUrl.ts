export const isUrl = (string: string): boolean => {
  try {
    new URL(string)

    return true
  } catch (_) {
    return false
  }
}
