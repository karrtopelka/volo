import { ReactChildren } from '@/types'
import { Text } from '@ui-kitten/components'
import { HStack } from 'native-base'
import { View } from 'react-native'

export type CardAttributeProps = {
  title: string
  isRequired?: boolean
} & ReactChildren

const renderChildren = (children: any) => {
  if (typeof children === 'string' || typeof children === 'number') {
    return <Text category="p1">{children}</Text>
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
      <Text category="s1" style={{ marginBottom: 12 }}>
        {title}
      </Text>
      {isRequired && (
        <Text category="s1" style={{ marginBottom: 12, color: 'red' }}>
          *
        </Text>
      )}
    </HStack>
    {renderChildren(children)}
  </View>
)
