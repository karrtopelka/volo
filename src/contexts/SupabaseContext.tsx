import 'react-native-url-polyfill/auto'
import { createContext, useContext, useState, useEffect } from 'react'
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { ReactChildren } from '@/types'
import { SUPABASE_URL, SUPABASE_API } from '@env'

type SupabaseContextType = SupabaseClient | null

const SupabaseContext = createContext<SupabaseContextType>(null)

export const useSupabase = () => useContext(SupabaseContext)

export const SupabaseProvider = ({ children }: ReactChildren) => {
  const [supabase, setSupabase] = useState<null | SupabaseClient>(null)

  useEffect(() => {
    const initSupabase = () => {
      const client = createClient(SUPABASE_URL, SUPABASE_API)

      setSupabase(client)
    }

    initSupabase()
  }, [])

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  )
}
