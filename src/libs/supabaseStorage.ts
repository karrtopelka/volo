import 'react-native-url-polyfill/auto'
import { SUPABASE_SERVICE_API, SUPABASE_STORAGE_URL } from '@env'
import { StorageClient } from '@supabase/storage-js'

export const storageClient = new StorageClient(SUPABASE_STORAGE_URL, {
  apikey: SUPABASE_SERVICE_API,
  Authorization: `Bearer ${SUPABASE_SERVICE_API}`,
})
