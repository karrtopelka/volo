import { APIErrorResponse } from '@/types'
import { capitalizeFirstLetter } from './stringUtils'

/**
 * Parse an error into a single error message string
 */
export const getErrorMessage = (
  error: APIErrorResponse,
  message = ''
): string => {
  if (error.message) {
    if (Array.isArray(error.message)) {
      return capitalizeFirstLetter(error.message[0])
    }

    return capitalizeFirstLetter(error.message)
  }

  return message
}
