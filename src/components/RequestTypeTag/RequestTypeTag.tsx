import { REQUEST_TYPES } from '@/constants'
import { RequestType } from '@/types'
import { Center } from 'native-base'
import { useTranslation } from 'react-i18next'

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
}: RequestTypeTagProps): JSX.Element => {
  const { i18n } = useTranslation()
  const requestType = REQUEST_TYPES.find(({ value }) => value === typeTag)

  return (
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
      {i18n.language === 'uk' ? requestType?.labelUk : requestType?.labelEn}
    </Center>
  )
}
