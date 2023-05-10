import { RequestType } from '@/types'
import { Center } from 'native-base'

export type RequestTypeTagProps = {
  typeTag: RequestType
}

export const requestTypeTagColor = (typeTag: RequestType) => {
  switch (typeTag) {
    case 'FINANCIAL':
      return 'blue'
    case 'MATERIAL':
      return 'green'
    case 'COLLECTION':
      return 'orange'
    case 'THINGS':
      return 'violet'
    default:
      return 'black'
  }
}

export const RequestTypeTag = ({
  typeTag,
}: RequestTypeTagProps): JSX.Element => (
  <Center
    bg={`${requestTypeTagColor(typeTag)}.500`}
    _dark={{
      bg: `${requestTypeTagColor(typeTag)}.400`,
    }}
    _text={{
      color: 'warmGray.50',
      fontWeight: '700',
      fontSize: 'xs',
    }}
    position="absolute"
    bottom="0"
    px="3"
    py="1.5"
    borderTopRightRadius={4}
  >
    {typeTag}
  </Center>
)
