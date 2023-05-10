import { FormControl, WarningOutlineIcon } from 'native-base'
import { ComponentProps, useState } from 'react'
import { FieldValues, useController } from 'react-hook-form'
import { ControlledFieldProps } from '@/types'
import { Icon, IconProps, Input } from '@ui-kitten/components'
import { getValidationErrorMessage } from '@/utils'
import { TouchableWithoutFeedback } from 'react-native'

export type ControlledInputProps<T extends FieldValues> = {
  formControlProps?: Partial<ComponentProps<typeof FormControl>>
  label?: string
  labelProps?: Partial<ComponentProps<typeof FormControl.Label>>
} & Partial<ComponentProps<typeof Input>> &
  ControlledFieldProps<T>

export const ControlledInput = <T extends FieldValues>({
  formControlProps = {},
  labelProps = {},
  label,
  control,
  name,
  ...inputProps
}: ControlledInputProps<T>): JSX.Element => {
  const [secureTextEntry, setSecureTextEntry] = useState(
    inputProps.secureTextEntry
  )

  const toggleSecureEntry = () => {
    setSecureTextEntry((prev) => !prev)
  }

  const renderIcon = (props: IconProps) => {
    if (
      inputProps.secureTextEntry === undefined ||
      !inputProps.secureTextEntry
    ) {
      return <></>
    }

    return (
      <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
      </TouchableWithoutFeedback>
    )
  }

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

      <Input
        {...inputProps}
        value={value}
        onChangeText={onChange}
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
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
