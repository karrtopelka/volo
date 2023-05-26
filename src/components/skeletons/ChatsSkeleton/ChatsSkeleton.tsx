import { HStack, Skeleton, VStack } from 'native-base'

export const ChatsSkeleton = (): JSX.Element => (
  <VStack space={8} overflow="hidden">
    {new Array(4).fill(0).map((_, i) => (
      <VStack key={i} space={8}>
        <HStack alignItems="center">
          <Skeleton size="10" rounded="full" />
          <Skeleton.Text px="4" />
        </HStack>
        <Skeleton h="1" />
      </VStack>
    ))}
  </VStack>
)
