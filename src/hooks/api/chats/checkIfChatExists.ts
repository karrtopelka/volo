import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { AxiosInstance } from 'axios'

type CheckIfChatExistsResponse = {
  id: number
  recipientName: string
  recipientId: number
}

export const checkIfChatExists = async (
  recipientId: number,
  client: AxiosInstance
): Promise<CheckIfChatExistsResponse | null> =>
  client
    .get(`/chats/user/${recipientId}/`)
    .then(unwrapResponse)
    .catch(unwrapErrorResponse)
