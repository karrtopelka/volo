import 'react-native-url-polyfill/auto'
import {
  AspectRatio,
  Box,
  HStack,
  Heading,
  Stack,
  Text,
  Image,
  VStack,
  Center,
  Pressable,
} from 'native-base'
import { MainTabsParamList, Request } from '@/types'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { RequestTypeTag } from '../RequestTypeTag'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Routes } from '@/constants'

export type RequestCardProps = {
  request: Request
}

export const RequestCard = ({ request }: RequestCardProps): JSX.Element => {
  const { i18n } = useTranslation()
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const hasImages = request.attachments.length > 0

  const handleCardClick = () =>
    navigation.navigate(Routes.REQUEST_NAVIGATOR, {
      screen: Routes.REQUEST,
      params: {
        id: request.id,
        isSelfRequest: true,
      },
    })

  return (
    <Pressable onPress={handleCardClick}>
      <Box
        maxW="80"
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
      >
        <Box overflow="hidden" flex="1">
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={
                hasImages
                  ? {
                      uri: request.attachments[0].fileUrl,
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
          <RequestTypeTag typeTag={request.type} />
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
              Collected {request.totalCollected} / {request.goalAmount}
            </Text>
          </Center>
        </Box>
        <Stack p="4" space={3} justifyContent="space-between" flex="1">
          <VStack space={2}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {request.title}
              </Heading>
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
              >
                {i18n.language === 'uk'
                  ? request.category.nameUk
                  : request.category.nameEn}
              </Text>
            </Stack>
            <Text fontWeight="400">
              {request.description.length > 50 ? (
                <>
                  {request.description.substring(0, 50).trim()}...
                  <Text
                    color="violet.500"
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight="400"
                  >
                    {' '}
                    Read More
                  </Text>
                </>
              ) : (
                request.description
              )}
            </Text>
          </VStack>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400"
              >
                {dayjs(request.createdAt).fromNow()}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Pressable>
  )
}
