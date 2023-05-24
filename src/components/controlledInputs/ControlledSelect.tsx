import {
  CheckIcon,
  FormControl,
  Icon,
  Select,
  WarningOutlineIcon,
} from 'native-base'
import { ComponentProps, useEffect, useState } from 'react'
import { FieldValues, useController } from 'react-hook-form'
import { ControlledFieldProps } from '@/types/ControlledFieldProps'
import { MaterialIcons } from '@expo/vector-icons'

export type SelectOption = { label: string; value: string }

export type ControlledSelectProps<T extends FieldValues> = {
  options: SelectOption[]
  formControlProps?: Partial<ComponentProps<typeof FormControl>>
  label?: string
} & ControlledFieldProps<T>

export const ControlledSelect = <T extends FieldValues>({
  options,
  formControlProps = {},
  label,
  control,
  name,
}: ControlledSelectProps<T>): JSX.Element => {
  const [internalState, setInternalState] = useState()

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController<T>({
    name,
    control,
  })

  useEffect(() => {
    if (value !== internalState) {
      setInternalState(value)
    }
  }, [value])

  return (
    <FormControl {...formControlProps} isInvalid={!!error}>
      <Select
        selectedValue={internalState}
        minWidth="200"
        h={10}
        accessibilityLabel={label}
        placeholder={label}
        dropdownIcon={
          <Icon as={<MaterialIcons name="expand-more" />} size="2xl" mr={1} />
        }
        _selectedItem={{
          bg: 'gray.200',
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={onChange}
      >
        {options.map((option) => (
          <Select.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Select>

      {error && (
        <FormControl.ErrorMessage
          mt={2}
          leftIcon={<WarningOutlineIcon size="xs" />}
        >
          {error.message}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  )
}
