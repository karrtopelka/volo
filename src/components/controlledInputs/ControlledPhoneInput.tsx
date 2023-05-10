import { ControlledFieldProps } from '@/types'
import { getValidationErrorMessage } from '@/utils'
import { FormControl, Input, WarningOutlineIcon } from 'native-base'
import { ComponentProps } from 'react'
import { FieldValues, useController } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input/react-native-input'

export type ControlledPhoneInputProps<T extends FieldValues> = {
  formControlProps?: Partial<ComponentProps<typeof FormControl>>
  label?: string
  labelProps?: Partial<ComponentProps<typeof FormControl.Label>>
} & Partial<ComponentProps<typeof PhoneInput>> &
  ControlledFieldProps<T>

export const ControlledPhoneInput = <T extends FieldValues>({
  formControlProps = {},
  labelProps = {},
  label,
  control,
  name,
  ...inputProps
}: ControlledPhoneInputProps<T>): JSX.Element => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController<T>({
    name,
    control,
  })

  return (
    <FormControl {...formControlProps} isInvalid={!!error}>
      {label && <FormControl.Label {...labelProps}>{label}</FormControl.Label>}

      <PhoneInput
        style={{ height: 35 }}
        {...inputProps}
        value={value}
        onChange={onChange}
        inputComponent={Input}
      />

      {error && (
        <FormControl.ErrorMessage
          mt={2}
          leftIcon={<WarningOutlineIcon size="xs" />}
        >
          {getValidationErrorMessage(error)}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  )
}
