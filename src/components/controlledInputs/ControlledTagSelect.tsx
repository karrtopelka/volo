import { ControlledFieldProps } from '@/types'
import { Spinner } from '@ui-kitten/components'
import { FormControl, VStack, WarningOutlineIcon } from 'native-base'
import { ComponentProps, useEffect, useState } from 'react'
import { FieldValues, useController } from 'react-hook-form'
import MultiSelect from 'react-native-multiple-select'

export type TagSelectOption = {
  id: number
  name: string
}

export type ControlledTagSelectProps<T extends FieldValues> = {
  options: TagSelectOption[]
  formControlProps?: Partial<ComponentProps<typeof FormControl>>
  label?: string
  isLoading?: boolean
} & ControlledFieldProps<T>

export const ControlledTagSelect = <T extends FieldValues>({
  options,
  formControlProps = {},
  label,
  isLoading = false,
  control,
  name,
}: ControlledTagSelectProps<T>): JSX.Element => {
  const [internalState, setInternalState] = useState<string[]>([])

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

  const onSelectedItemsChange = (selectedItems: string[]) => {
    setInternalState(selectedItems)
    onChange(selectedItems)
  }

  return (
    <FormControl {...formControlProps} isInvalid={!!error}>
      <VStack space="5">
        <VStack space="2">
          {isLoading ? (
            <Spinner status="basic" size="small" />
          ) : (
            <MultiSelect
              hideTags
              items={options}
              uniqueKey="id"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={internalState}
              selectText={label}
              searchInputPlaceholderText={label}
              tagRemoveIconColor="#7b7b7b"
              tagBorderColor="#7b7b7b"
              tagTextColor="#7b7b7b"
              selectedItemTextColor="#000"
              selectedItemIconColor="#000"
              itemTextColor="#7b7b7b"
              searchInputStyle={{ color: '#CCC', height: 50 }}
              submitButtonColor="#1b1b1b"
              hideSubmitButton={true}
              submitButtonText="Submit"
              noItemsText="No items found"
            />
          )}

          {error && (
            <FormControl.ErrorMessage
              mt={2}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {error.message}
            </FormControl.ErrorMessage>
          )}
        </VStack>
      </VStack>
    </FormControl>
  )
}
