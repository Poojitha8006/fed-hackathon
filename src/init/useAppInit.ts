import { useEffect } from 'react'
import { useDataStore } from '../stores/dataStore'

export function useAppInit() {
  const seed = useDataStore(s => s.ensureSeeded)
  useEffect(() => {
    seed()
  }, [seed])
}

