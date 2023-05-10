/**
 * Capitalizes first letter of a string
 * @return string
 */
export const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const isString = (str: unknown): boolean => typeof str === 'string'
