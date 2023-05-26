import { Card, Layout } from '@/components'
import { Routes } from '@/constants'
import { MainTabsParamList } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Heading,
  Skeleton,
  Text,
  VStack,
} from 'native-base'
import { useEffect, useState } from 'react'

export const RequestCreateInitialScreen = (): JSX.Element => {
  const [checkingIfSkipScreen, setCheckingIfSkipScreen] = useState(true)
  const [isChecked, setIsChecked] = useState(false)
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const handleCreateRequest = () => {
    if (isChecked) {
      AsyncStorage.setItem('showInitialRequestCreateScreen', 'true')
    }

    return navigation.navigate(Routes.REQUEST_CREATE_GENERAL_INFORMATION)
  }

  const handleEditRequests = () => {
    if (isChecked) {
      AsyncStorage.setItem('showInitialRequestCreateScreen', 'true')
    }

    navigation.navigate(Routes.REQUEST_NAVIGATOR)
  }

  useEffect(() => {
    const checkAsyncStorage = async () => {
      const skipScreen = await AsyncStorage.getItem(
        'showInitialRequestCreateScreen'
      )

      if (skipScreen) {
        return navigation.navigate(Routes.REQUEST_CREATE_GENERAL_INFORMATION)
      }
      setCheckingIfSkipScreen(false)
    }

    checkAsyncStorage()
  }, [])

  if (checkingIfSkipScreen) {
    return (
      <Layout centered={true}>
        <VStack space={4}>
          <Skeleton h={40} />
          <Skeleton.Text mt={4} lines={2} />
          <Skeleton h={10} />
        </VStack>
      </Layout>
    )
  }

  return (
    <Layout centered={true}>
      <Heading>Створення нового запиту</Heading>
      <VStack space={4} mt={4}>
        <Text>
          Ви можете створити новий запит або редагувати існуючі запити.
        </Text>
        <Divider orientation="horizontal" bg="muted.800" />
        <VStack space={4}>
          <Text>Створення новго запиту робиться у чотири основні кроки:</Text>
          <Box ml={4}>
            <Text bold={true}>1. Основна інформація</Text>
            <Text bold={true}>2. Стан та категорія</Text>
            <Text bold={true}>3. Фотознимки</Text>
            <Text bold={true}>4. Додаткова інформація</Text>
          </Box>
        </VStack>
        <Card mt={5}>
          <VStack space={4}>
            <Button size="lg" onPress={handleCreateRequest}>
              Створити новий запит
            </Button>
            <Button variant="outline" onPress={handleEditRequests}>
              Редагувати існуючі запити
            </Button>
          </VStack>
        </Card>
        <Divider />
        <Text>
          В подальшому для редагування заходьте відразу на сторінку запитів, та
          обирайте потрібний
        </Text>
        <Checkbox
          value="dont show again"
          isChecked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        >
          Більше не показувати цю сторінку
        </Checkbox>
      </VStack>
    </Layout>
  )
}
