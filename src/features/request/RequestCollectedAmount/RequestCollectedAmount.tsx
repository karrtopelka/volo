import { CardAttribute } from '@/components'
import { VStack, Progress, Center } from 'native-base'
import { Text } from '@ui-kitten/components'

export type RequestCollectedAmountProps = {
  totalCollected: number
  goalAmount: number | null
}

const renderCollectedAmount = (
  totalCollected: number,
  goalAmount: number | null
) => {
  if (goalAmount) {
    return <Text category="s1">{`UAH ${totalCollected} / ${goalAmount}`}</Text>
  }

  return (
    <Center>
      <Text category="s1">{`UAH ${totalCollected}`}</Text>
    </Center>
  )
}

export const RequestCollectedAmount = ({
  totalCollected,
  goalAmount,
}: RequestCollectedAmountProps): JSX.Element => (
  <CardAttribute title="Зібрано">
    <VStack space={3}>
      {renderCollectedAmount(totalCollected, goalAmount)}
      {goalAmount && (
        <Progress
          colorScheme="emerald"
          size="md"
          value={(totalCollected / goalAmount) * 100}
        />
      )}
    </VStack>
  </CardAttribute>
)
