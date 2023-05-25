import { AspectRatio, Box, Text, Image, Center } from 'native-base'
import { Request } from '@/types'
import { RequestTypeTag } from '../RequestTypeTag'

export const RequestImage = ({
  attachments,
  type,
  totalCollected,
  goalAmount,
}: Pick<
  Request,
  'attachments' | 'type' | 'totalCollected' | 'goalAmount'
>): JSX.Element => {
  const hasImages = attachments.length > 0

  return (
    <Box overflow="hidden" flex="1">
      <AspectRatio w="100%" ratio={16 / 9}>
        <Image
          source={
            hasImages
              ? {
                  uri: attachments[0].fileUrl,
                }
              : require('@assets/request-placeholder.png')
          }
          alt="no_image"
          resizeMode="cover"
          w="full"
          h="full"
          p="0"
        />
      </AspectRatio>
      <RequestTypeTag typeTag={type} />
      {totalCollected && goalAmount && (
        <Center
          bg="green.500"
          _dark={{
            bg: `green.400`,
          }}
          position="absolute"
          top="0"
          right="0"
          px="3"
          py="1.5"
          borderBottomLeftRadius={4}
        >
          <Text color="warmGray.50" fontWeight={700} fontSize="xs">
            Зібрано {totalCollected} / {goalAmount}
          </Text>
        </Center>
      )}
    </Box>
  )
}
