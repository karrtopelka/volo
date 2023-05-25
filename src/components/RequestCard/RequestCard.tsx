import 'react-native-url-polyfill/auto'
import { HStack, IBoxProps, Text, VStack } from 'native-base'
import { MainTabsParamList, Request } from '@/types'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { Routes } from '@/constants'
import { Card } from '../Card'
import { RequestImage } from './RequestImage'

export type RequestCardProps = {
  request: Request
  isSelfRequest?: boolean
  maxW?: IBoxProps['maxW']
}

export const RequestCard = ({
  request,
  isSelfRequest = false,
  maxW = 80,
}: RequestCardProps): JSX.Element => {
  const { i18n } = useTranslation()
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const handleCardClick = () =>
    navigation.dispatch(
      CommonActions.navigate({
        name: Routes.REQUEST_NAVIGATOR,
        params: {
          screen: Routes.REQUEST,
          params: {
            id: request.id,
            isSelfRequest,
          },
        },
      })
    )

  return (
    <Card
      onPress={handleCardClick}
      topImage={
        <RequestImage
          attachments={request.attachments}
          type={request.type}
          totalCollected={request.totalCollected}
          goalAmount={request.goalAmount}
        />
      }
      title={request.title.trim()}
      shortDescription={
        i18n.language === 'uk'
          ? request.category.nameUk
          : request.category.nameEn
      }
      maxW={maxW}
    >
      <VStack space={2}>
        <Text fontWeight="400" isTruncated={request.description.length > 50}>
          {request.description.trim()}
        </Text>
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
      </VStack>
    </Card>
  )
}
