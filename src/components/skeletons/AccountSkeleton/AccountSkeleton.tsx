import { HStack, Skeleton, VStack } from 'native-base'

export const AccountSkeleton = (): JSX.Element => (
  <VStack overflow="hidden" my={5}>
    <HStack alignItems="center">
      <Skeleton h="16" w="16" rounded="full" mx={4} />
      <VStack space={2} flex={1}>
        {new Array(2).fill(0).map((_, i) => (
          <VStack space={1} key={i} py={4} px={4}>
            <Skeleton.Text px="4" />
            <Skeleton h="10" px={4} />
          </VStack>
        ))}
      </VStack>
    </HStack>
    <Skeleton h="40" px={4} py={4} />
    <Skeleton h="40" px={4} py={4} />
    <Skeleton h="40" px={4} />
  </VStack>
)
