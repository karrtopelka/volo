import { CardAttribute, Tag } from '@/components'
import { Routes } from '@/constants'
import { useOnlineUsers } from '@/contexts'
import { useMe } from '@/hooks'
import { MainTabsParamList, User } from '@/types'
import { MaterialIcons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import {
  Avatar,
  HStack,
  Icon,
  VStack,
  Text,
  Divider,
  Circle,
  Skeleton,
  Heading,
  IconButton,
} from 'native-base'
import { useTranslation } from 'react-i18next'

export type AccountInformationProps = {
  data: User | undefined
  isLoading: boolean
}

export const AccountInformation = ({
  data,
  isLoading,
}: AccountInformationProps): JSX.Element => {
  const { t, i18n } = useTranslation('account')
  const { userIds } = useOnlineUsers()
  const { data: me } = useMe()
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const isOwnAccount = () => me?.id === data?.id

  const handleAccountEditPress = () =>
    navigation.navigate(Routes.ACCOUNT_EDIT_NAVIGATOR)

  const isUserOnline = userIds.includes(data!.id)

  if (isLoading) {
    return <Skeleton.Text lines={5} />
  }

  return (
    <VStack space={3} flex={1}>
      <VStack space={3} alignSelf="center" w="100%" position="relative">
        {isOwnAccount() && (
          <IconButton
            position="absolute"
            top={0}
            right={0}
            size="lg"
            _icon={{
              as: MaterialIcons,
              name: 'edit',
              color: 'black',
            }}
            onPress={handleAccountEditPress}
          />
        )}
        <VStack position="relative" alignSelf="center">
          <Circle
            bgColor={isUserOnline ? 'green.500' : 'gray.300'}
            rounded="full"
            position="absolute"
            bottom={0}
            zIndex={1}
            alignSelf="flex-end"
            w={5}
            h={5}
          />
          <Avatar
            size="xl"
            source={
              data?.avatar ? { uri: data.avatar } : require('@assets/icon.png')
            }
          />
        </VStack>
        <HStack space={2} alignItems="center" alignSelf="center">
          <Text alignSelf="center">
            {isUserOnline ? 'В мережі' : dayjs(data?.lastLogin).fromNow()}
          </Text>
          {data?.reputation ? (
            <>
              <Divider orientation="vertical" />
              <HStack space={2} alignItems="center" alignSelf="center">
                <Icon
                  as={MaterialIcons}
                  name="star"
                  color="#FFC107"
                  size="sm"
                />
                <Text>{data.reputation} / 5</Text>
              </HStack>
            </>
          ) : (
            <></>
          )}
        </HStack>
      </VStack>
      <Heading alignSelf="center" size="lg">
        {data?.name ?? data?.email.split('@')[0]}
      </Heading>
      {data?.name && (
        <CardAttribute title={t('email')}>{data?.email}</CardAttribute>
      )}
      <CardAttribute title={t('phone')}>
        {data?.phoneNumber ?? 'Не вказано'}
      </CardAttribute>
      <CardAttribute title={t('role.title')}>
        {data?.role ? t(`role.${data.role}`) : t('emptyField')}
      </CardAttribute>
      <CardAttribute title={t('interests')}>
        {data?.interests && data.interests.length ? (
          <HStack flexWrap="wrap" style={{ gap: 4 }}>
            {data.interests.map(({ nameUk, nameEn }) => (
              <Tag
                key={nameUk}
                name={i18n.language === 'uk' ? nameUk : nameEn}
              />
            ))}
          </HStack>
        ) : (
          t('emptyField')
        )}
      </CardAttribute>
      <CardAttribute title={t('created')}>
        {dayjs(data?.createdAt).fromNow()}
      </CardAttribute>
    </VStack>
  )
}
