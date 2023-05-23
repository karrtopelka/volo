import {
  FormControl,
  IInputProps,
  Icon,
  Input,
  Pressable,
  WarningOutlineIcon,
} from 'native-base'
import { ComponentProps, useState } from 'react'
import { FieldValues, useController } from 'react-hook-form'
import { ControlledFieldProps } from '@/types'
import { getValidationErrorMessage } from '@/utils'
import { MaterialIcons } from '@expo/vector-icons'

export type ControlledInputProps<T extends FieldValues> = {
  formControlProps?: Partial<ComponentProps<typeof FormControl>>
  label?: string
  labelProps?: Partial<ComponentProps<typeof FormControl.Label>>
} & Partial<IInputProps> &
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

  const RIghtIcon = (): JSX.Element => {
    if (
      inputProps.secureTextEntry === undefined ||
      !inputProps.secureTextEntry
    ) {
      return <></>
    }

    return (
      <Pressable onPress={toggleSecureEntry}>
        <Icon
          as={
            <MaterialIcons
              name={secureTextEntry ? 'visibility' : 'visibility-off'}
            />
          }
          size={5}
          mr="2"
          color="muted.400"
        />
      </Pressable>
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
        InputRightElement={<RIghtIcon />}
        type={secureTextEntry ? 'password' : 'text'}
        secureTextEntry={secureTextEntry}
        h="12"
        fontSize="sm"
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
