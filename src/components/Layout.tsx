import { ReactChildren } from '@/types'
import { Box, IBoxProps } from 'native-base'

export type LayoutProps = {
  centered?: boolean
} & ReactChildren &
  IBoxProps

export const Layout = ({
  centered = false,
  children,
  ...rest
}: LayoutProps): JSX.Element => (
  <Box
    flex={1}
    p={4}
    justifyContent={centered ? 'center' : undefined}
    alignItems={centered ? 'center' : undefined}
    {...rest}
  >
    {children}
  </Box>
)
