import { ReactChildren } from '@/types'
import { HStack, Heading, Text } from 'native-base'
import { View } from 'react-native'

export type CardAttributeProps = {
  title: string
  isRequired?: boolean
} & ReactChildren

const renderChildren = (children: string | number | React.ReactNode) => {
  if (typeof children === 'string' || typeof children === 'number') {
    return <Text>{children}</Text>
  }

  return children
}

export const CardAttribute = ({
  title,
  isRequired = false,
  children,
}: CardAttributeProps): JSX.Element => (
  <View>
    <HStack>
      <Heading size="sm" mb={2}>
        {title}
      </Heading>
      {isRequired && (
        <Heading size="xs" color="red.500" mb={2}>
          *
        </Heading>
      )}
    </HStack>
    {renderChildren(children)}
  </View>
)
