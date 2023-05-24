import { CardAttribute } from '@/components'
import { VStack, Progress, Center, Heading, Text } from 'native-base'

export type RequestCollectedAmountProps = {
  totalCollected: number | null
  goalAmount: number | null
}

const renderCollectedAmount = (
  totalCollected: number | null,
  goalAmount: number | null
) => {
  if (goalAmount) {
    if (!totalCollected) {
      return <Heading size="xs">{`UAH ${goalAmount}`}</Heading>
    }

    return (
      <Heading size="xs">{`UAH ${totalCollected} / ${goalAmount}`}</Heading>
    )
  }

  if (!totalCollected) {
    return <Heading size="xs">-</Heading>
  }

  return (
    <Center>
      <Heading size="xs">{`UAH ${totalCollected}`}</Heading>
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
      {goalAmount && totalCollected ? (
        <Progress
          colorScheme="emerald"
          size="md"
          value={(totalCollected / goalAmount) * 100}
        />
      ) : (
        <Text>Цей запит не збирає фінанси</Text>
      )}
    </VStack>
  </CardAttribute>
)
