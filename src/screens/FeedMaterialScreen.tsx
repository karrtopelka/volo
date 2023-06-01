import { Layout } from '@/components'
import { FeedRequestsContainer } from '@/features/feed/FeedRequestContainer'
import { RequestType } from '@/types'

export const FeedMaterialScreen = (): JSX.Element => (
  <Layout centered={true}>
    <FeedRequestsContainer type={RequestType.MATERIAL} />
  </Layout>
)
