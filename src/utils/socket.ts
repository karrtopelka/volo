import { API_ENDPOINT } from '@/constants/env'
import { io } from 'socket.io-client'

export const socketChat = io(API_ENDPOINT + '/chat')
export const socketUser = io(API_ENDPOINT + '/user')
