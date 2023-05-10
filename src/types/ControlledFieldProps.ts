import { FieldValues } from 'react-hook-form/dist/types/fields'
import { Control, Path } from 'react-hook-form'

export type ControlledFieldProps<T extends FieldValues> = {
  // react-hook-form props
  name: Path<T>
  control: Control<T>
}
