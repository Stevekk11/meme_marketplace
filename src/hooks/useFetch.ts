import { useEffect, useState } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  const [reloadIndex, setReloadIndex] = useState(0)

  useEffect(() => {
    let cancelled = false

    setState((prev) => ({ ...prev, loading: true, error: null }))

    fetcher()
      .then((data) => {
        if (cancelled) return
        setState({ data, loading: false, error: null })
      })
      .catch((error: Error) => {
        if (cancelled) return
        setState({ data: null, loading: false, error })
      })

    return () => {
      cancelled = true
    }
  }, [...deps, reloadIndex])

  const refetch = () => setReloadIndex((i) => i + 1)

  return { ...state, refetch }
}

