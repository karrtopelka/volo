import { ReactChildren } from '@/types'
import {
  Box,
  Divider,
  HStack,
  Heading,
  IBoxProps,
  IHeadingProps,
  ITextProps,
  Text,
  VStack,
} from 'native-base'

export type CardProps = {
  title?: string
  titleProps?: IHeadingProps
  titleAction?: React.ReactNode
  shortDescription?: string
  shortDescriptionProps?: ITextProps
  footerActions?: React.ReactNode
  sectionsPadding?: number | string
  status?: 'info' | 'success' | 'warning' | 'error'
} & ReactChildren &
  IBoxProps

const renderCardHeader = ({
  title,
  titleProps,
  titleAction,
  shortDescription,
  shortDescriptionProps,
}: Pick<
  CardProps,
  | 'title'
  | 'titleProps'
  | 'titleAction'
  | 'shortDescription'
  | 'shortDescriptionProps'
>): JSX.Element => {
  if (!title && !shortDescription) {
    return <></>
  }

  return (
    <VStack space={2}>
      {title && (
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="xl" ml="-1" {...titleProps}>
            {title}
          </Heading>
          {titleAction}
        </HStack>
      )}
      {shortDescription && (
        <Text
          fontSize="xs"
          _light={{
            color: 'violet.500',
          }}
          _dark={{
            color: 'violet.400',
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
          {...shortDescriptionProps}
        >
          {shortDescription}
        </Text>
      )}
    </VStack>
  )
}

export const Card = ({
  title,
  titleProps,
  titleAction,
  shortDescription,
  shortDescriptionProps,
  footerActions,
  sectionsPadding = 6,
  status,
  children,
  ...rest
}: CardProps): JSX.Element => (
  <Box
    rounded="lg"
    overflow="hidden"
    borderColor="coolGray.200"
    borderWidth="1"
    _dark={{
      borderColor: 'coolGray.600',
      backgroundColor: 'gray.700',
    }}
    _web={{
      shadow: 2,
      borderWidth: 0,
    }}
    _light={{
      backgroundColor: 'gray.50',
    }}
    borderTopWidth={status ? '4' : '1'}
    borderTopColor={
      status ? `${status}.500` : rest._dark ? 'coolGray.600' : 'coolGray.200'
    }
    {...rest}
  >
    <VStack p={sectionsPadding} space={5}>
      {renderCardHeader({
        title,
        titleProps,
        titleAction,
        shortDescription,
        shortDescriptionProps,
      })}
      <Box>{children}</Box>
      {footerActions && (
        <VStack space={3}>
          <Divider />
          {footerActions}
        </VStack>
      )}
    </VStack>
  </Box>
)
