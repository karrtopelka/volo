import { Skeleton, VStack } from 'native-base'

export const RequestSkeleton = (): JSX.Element => (
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
  >
    <Skeleton h="40" />
    <Skeleton.Text px="4" />
    <Skeleton h="10" px={4} />
    <Skeleton.Text px="4" />
    <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
  </VStack>
)
