import { getErrorMessage } from '@/utils'
import { APIErrorResponse, ApiErrorResponseWrapper, Override } from '@/types'
import { UseMutationResult } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { Box, Text, useToast } from 'native-base'
import { useTranslation } from 'react-i18next'

type MutateOptions<TData> = {
  onSuccess?: (data: TData) => void
  onError?: (error: APIErrorResponse) => void
  setApiErrorData?: Dispatch<SetStateAction<string[] | string | undefined>>
  successMessageKey?: string
  errorMessageKey?: string
  showErrorSnackbar?: boolean
}

type MutateAsyncWrapperFunction<TData, TVariables> = (
  data: TVariables,
  options?: MutateOptions<TData>
) => Promise<TData>

type UseMutationWrapper<TData, TVariables> = Override<
  UseMutationResult<TData, ApiErrorResponseWrapper, TVariables>,
  {
    mutateAsync: MutateAsyncWrapperFunction<TData, TVariables>
  }
>

export const useMutationWrapper = <TData, TVariables = Partial<TData>>(
  mutation: () => UseMutationResult<TData, ApiErrorResponseWrapper, TVariables>
): UseMutationWrapper<TData, TVariables> => {
  const { mutateAsync, ...rest } = mutation()
  const { t } = useTranslation('common')

  const { show } = useToast()

  const mutateAsyncWrapper: MutateAsyncWrapperFunction<
    TData,
    TVariables
  > = async (data, options = {}) => {
    const {
      successMessageKey,
      onSuccess,
      setApiErrorData,
      onError,
      showErrorSnackbar = true,
      errorMessageKey = t('errorDuringRequest')!,
    } = options

    return await mutateAsync(data, {
      onSuccess: (response) => {
        onSuccess?.(response)

        successMessageKey &&
          show({
            render: () => (
              <Box bg="#16C975" px="4" py="3" rounded="sm">
                <Text color="#1D171A">{successMessageKey}</Text>
              </Box>
            ),
            placement: 'top',
            variant: 'subtle',
            duration: 2500,
          })
      },
      onError: (err: ApiErrorResponseWrapper) => {
        const error = err.data

        onError?.(error)

        if (setApiErrorData && error.statusCode === 400) {
          setApiErrorData(error.message)
        }

        if (showErrorSnackbar) {
          const message = getErrorMessage(error, errorMessageKey)

          show({
            render: () => (
              <Box bg="#FC4984" px="4" py="3" rounded="sm">
                <Text color="#1D171A">{message}</Text>
              </Box>
            ),
            placement: 'top',
            variant: 'subtle',
            duration: 4000,
          })
        }
      },
    })
  }

  return {
    mutateAsync: mutateAsyncWrapper,
    ...rest,
  }
}
