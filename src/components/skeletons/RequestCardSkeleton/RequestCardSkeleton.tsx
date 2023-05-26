import { Skeleton, VStack } from 'native-base'

export const RequestCardSkeleton = (): JSX.Element => (
  <VStack
    borderWidth="1"
    space={8}
    overflow="hidden"
    rounded="md"
    _dark={{
      borderColor: 'coolGray.500',
    }}
    _light={{
      borderColor: 'coolGray.200',
    }}
    flex={1}
  >
    <Skeleton h="40" />
    <Skeleton.Text px="4" pb={4} />
  </VStack>
)
