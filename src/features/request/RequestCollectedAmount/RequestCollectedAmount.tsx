import { CardAttribute } from '@/components'
import { VStack, Progress, Center, Heading } from 'native-base'

export type RequestCollectedAmountProps = {
  totalCollected: number
  goalAmount: number | null
}

const renderCollectedAmount = (
  totalCollected: number,
  goalAmount: number | null
) => {
  if (goalAmount) {
    return (
      <Heading size="xs">{`UAH ${totalCollected} / ${goalAmount}`}</Heading>
    )
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
