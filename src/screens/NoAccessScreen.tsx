import { SelectLanguageContainer } from '@/components'
import { VStack, Text, Box } from 'native-base'
import { useTranslation } from 'react-i18next'

export const NoAccessScreen = (): JSX.Element => {
  const { t } = useTranslation('errors')

  const text = t('requiredData.noAccess')!.split('. ')

  return (
    <Box
      safeArea={true}
      alignItems="center"
      justifyContent="center"
      h="full"
      p={2}
    >
      <VStack space="md" w="sm">
        <VStack space="sm" w="full">
          {text.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}
        </VStack>
        <SelectLanguageContainer />
      </VStack>
    </Box>
  )
}
