import { ReactChildren } from '@/types'
import {
  Layout as LayoutContainer,
  LayoutProps as LayoutContainerProps,
} from '@ui-kitten/components'

export type LayoutProps = {
  centered?: boolean
} & ReactChildren &
  LayoutContainerProps

export const Layout = ({
  centered = false,
  children,
  ...rest
}: LayoutProps): JSX.Element => (
  <LayoutContainer
    style={{
      flex: 1,
      padding: 12,
      gap: 12,
      justifyContent: centered ? 'center' : undefined,
      alignItems: centered ? 'center' : undefined,
    }}
    {...rest}
  >
    {children}
  </LayoutContainer>
)
