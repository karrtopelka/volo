import { FieldError } from 'react-hook-form'
import i18next from 'i18next'

export const getValidationErrorMessage = (error: FieldError) => {
  const { ref, type } = error

  if (type === 'required' || type === 'optionality') {
    return i18next.t('errors:validation.required')
  }

  if (ref?.name === 'email' && type === 'email') {
    return i18next.t('errors:validation.email')
  }

  if (ref?.name === 'password' && type === 'min') {
    return i18next.t('errors:validation.passwordLength')
  }

  if (ref?.name === 'passwordConfirmation' && type === 'passwords-match') {
    return i18next.t('errors:validation.passwordConfirmation')
  }

  return error.message
}
