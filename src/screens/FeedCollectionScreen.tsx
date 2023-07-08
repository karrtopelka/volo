import { Layout } from '@/components'
import { FeedRequestsContainer } from '@/features/feed/FeedRequestContainer'
import { RequestType } from '@/types'

export const FeedCollectionScreen = (): JSX.Element => (
  <Layout centered={true}>
    <FeedRequestsContainer type={RequestType.COLLECTION} />
  </Layout>
)
