import { HStack, Progress, Text } from 'native-base'
import { Card } from '../Card'

export type StepperContainerProps = {
  numberOfSteps: number
  currentStep: number
  title: string
}

export const StepperContainer = ({
  numberOfSteps,
  currentStep,
  title,
}: StepperContainerProps): JSX.Element => (
  <Card sectionsPadding={4}>
    <HStack space={5} alignItems="center">
      <Text>Крок {currentStep}</Text>
      <Progress
        value={(currentStep / numberOfSteps) * 100}
        colorScheme="light"
        flex={1}
      />
    </HStack>
    <Text textAlign="center" mt={2}>
      {title}
    </Text>
  </Card>
)
