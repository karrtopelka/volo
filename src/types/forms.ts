import { ApiErrorResponseWrapper } from './api'

export type FormComponentProps<T> = {
  onSubmit: (data: T) => void
  isLoading?: boolean
  onCancel?: () => void
  defaultValues?: T
  error?: string
  apiErrorData?: ApiErrorResponseWrapper
  submitButtonLocaleKey?: string
}
