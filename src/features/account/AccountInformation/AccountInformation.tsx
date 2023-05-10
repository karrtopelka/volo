import { CardAttribute, Tag } from '@/components'
import { User } from '@/types'
import {
  Divider,
  Icon,
  IconElement,
  Spinner,
  Text,
} from '@ui-kitten/components'
import dayjs from 'dayjs'
import { Avatar, HStack, ScrollView, VStack } from 'native-base'
import { useTranslation } from 'react-i18next'

const StarIcon = (): IconElement => (
  <Icon style={{ width: 15, height: 15 }} fill="#FFC107" name="star" />
)

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
    return <Spinner />
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
            <StarIcon />
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
            <ScrollView horizontal={true} directionalLockEnabled={true} w="72">
              <HStack space={3}>
                {data.interests.map(({ nameUk, nameEn }) => (
                  <Tag
                    key={nameUk}
                    name={i18n.language === 'uk' ? nameUk : nameEn}
                  />
                ))}
              </HStack>
            </ScrollView>
          ) : (
            t('emptyField')
          )}
        </CardAttribute>
        <Divider />
        <CardAttribute title={t('created')}>
          {dayjs(data?.createdAt).fromNow()}
        </CardAttribute>
      </VStack>
    </HStack>
  )
}
