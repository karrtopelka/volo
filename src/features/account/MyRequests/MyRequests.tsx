import { RequestCard } from '@/components'
import { useMyRequests } from '@/hooks'
import { Text, Spinner, Button } from '@ui-kitten/components'
import { Box, HStack, ScrollView } from 'native-base'
import { useState } from 'react'

export const MyRequests = (): JSX.Element => {
  const [limit, setLimit] = useState(5)
  const { data, isLoading } = useMyRequests({ limit })

  const handleLimit = () => setLimit((prev) => prev + 5)

  if (isLoading) {
    return (
      <HStack space={3} alignSelf="center" m={5}>
        <Box>
          <Spinner size="small" />
        </Box>
        <Text>Loading</Text>
      </HStack>
    )
  }

  return (
    <ScrollView horizontal={true}>
      <HStack space={3}>
        {data ? (
          data.data.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))
        ) : (
          <Text>No requests</Text>
        )}
        {data?.hasMore && (
          <Button style={{ alignSelf: 'center' }} onPress={handleLimit}>
            Load more
          </Button>
        )}
      </HStack>
    </ScrollView>
  )
}
