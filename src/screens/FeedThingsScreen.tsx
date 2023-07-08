import { Layout } from '@/components'
import { FeedRequestsContainer } from '@/features/feed/FeedRequestContainer'
import { RequestType } from '@/types'

export const FeedThingsScreen = (): JSX.Element => (
  <Layout centered={true}>
    <FeedRequestsContainer type={RequestType.THINGS} />
  </Layout>
)
