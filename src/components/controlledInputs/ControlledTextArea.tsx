import {
  FormControl,
  ITextAreaProps,
  TextArea,
  WarningOutlineIcon,
} from 'native-base'
import { ComponentProps } from 'react'
import { FieldValues, useController } from 'react-hook-form'
import { ControlledFieldProps } from '@/types'
import { getValidationErrorMessage } from '@/utils'

export type ControlledTextAreaProps<T extends FieldValues> = {
  formControlProps?: Partial<ComponentProps<typeof FormControl>>
  label?: string
  labelProps?: Partial<ComponentProps<typeof FormControl.Label>>
} & ITextAreaProps &
  ControlledFieldProps<T>

export const ControlledTextArea = <T extends FieldValues>({
  formControlProps = {},
  labelProps = {},
  label,
  control,
  name,
  ...textAreaProps
}: ControlledTextAreaProps<T>): JSX.Element => {
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

      <TextArea
        autoCompleteType={false}
        value={value}
        onChangeText={onChange}
        h={20}
        {...textAreaProps}
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
