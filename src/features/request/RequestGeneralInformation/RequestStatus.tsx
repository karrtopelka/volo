import { CardAttribute } from '@/components'
import { REQUEST_STATUSES } from '@/constants'
import { RequestStatus as RequestStatusType } from '@/types'
import { Heading, IHeadingProps } from 'native-base'
import { useTranslation } from 'react-i18next'

export type RequestStatusProps = {
  status: RequestStatusType
}

export const RequestStatus = ({ status }: RequestStatusProps): JSX.Element => {
  const { i18n } = useTranslation()
  const foundStatus = REQUEST_STATUSES.find(({ value }) => status === value)
  const statusName = foundStatus
    ? i18n.language === 'uk'
      ? foundStatus.labelUk
      : foundStatus.labelEn
    : ''

  const getColor = (): IHeadingProps['color'] => {
    switch (status) {
      case RequestStatusType.OPEN:
        return 'blue.500'
      case RequestStatusType.IN_PROGRESS:
        return 'primary.500'
      case RequestStatusType.COMPLETED:
        return 'green.500'
      case RequestStatusType.CLOSED:
        return 'danger.500'
      default:
        return 'black'
    }
  }

  return (
    <CardAttribute title="Стан">
      <Heading size="md" color={getColor()}>
        {statusName}
      </Heading>
    </CardAttribute>
  )
}
