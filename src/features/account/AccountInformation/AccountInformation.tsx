import { CardAttribute, Tag } from '@/components'
import { User } from '@/types'
import { MaterialIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import {
  Avatar,
  HStack,
  Icon,
  Spinner,
  VStack,
  Text,
  Divider,
  Box,
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

  if (isLoading) {
    return <Spinner size="sm" />
  }

  return (
    <HStack space={5} alignItems="center">
      <VStack space={2.5}>
        <Avatar
          size="lg"
          source={
            data?.avatar ? { uri: data.avatar } : require('@assets/icon.png')
          }
        />
        {data?.reputation ? (
          <HStack space={2} alignItems="center">
            <Icon as={MaterialIcons} name="star" color="#FFC107" size="sm" />
            <Text>{data.reputation} / 5</Text>
          </HStack>
        ) : (
          <></>
        )}
      </VStack>
      <VStack space={2.5}>
        <CardAttribute title={t('email')}>{data?.email}</CardAttribute>
        <Divider />
        <CardAttribute title={t('name')}>
          {data?.name ?? t('emptyField')}
        </CardAttribute>
        <Divider />
        <CardAttribute title={t('phone')}>
          {data?.phoneNumber ?? t('emptyField')}
        </CardAttribute>
        <Divider />
        <CardAttribute title={t('role.title')}>
          {data?.role ? t(`role.${data.role}`) : t('emptyField')}
        </CardAttribute>
        <Divider />
        <CardAttribute title={t('interests')}>
          {data?.interests && data.interests.length ? (
            <Box flexWrap="wrap" style={{ gap: 4 }}>
              {data.interests.map(({ nameUk, nameEn }) => (
                <Tag
                  key={nameUk}
                  name={i18n.language === 'uk' ? nameUk : nameEn}
                />
              ))}
            </Box>
          ) : (
            t('emptyField')
          )}
        </CardAttribute>
        <Divider />
        <HStack space={3}>
          <CardAttribute title={t('lastLogin')}>
            {dayjs(data?.lastLogin).fromNow()}
          </CardAttribute>
          <CardAttribute title={t('created')}>
            {dayjs(data?.createdAt).fromNow()}
          </CardAttribute>
        </HStack>
      </VStack>
    </HStack>
  )
}
