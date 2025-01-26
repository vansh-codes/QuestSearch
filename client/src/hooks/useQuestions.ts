import { useState, useEffect, useCallback, useRef } from 'react'
import { Question } from '../types/question.types'
import { ApiResponse, SearchResponse } from '../types/question.types'
import axios from 'axios'
import debounce from 'lodash/debounce'

interface UseQuestionsReturn {
  questions: Question[]
  totalPages: number
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

interface UseQuestionsOptions {
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  types?: string[]
}

interface CacheData {
  data: SearchResponse
  timestamp: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const CACHE_DURATION = 5 * 60 * 1000 // 5mins

// axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
})

// create cache outside the hook to persist between renders
const globalCache = new Map<string, CacheData>()

export const useQuestions = (
  searchQuery: string,
  currentPage: number,
  limit: number = 10,
  options: UseQuestionsOptions = {}
): UseQuestionsReturn => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { sortField = 'createdAt', sortOrder = 'asc', types = [] } = options

  // useRef to ref abort controller
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchQuestions = useCallback(async () => {
    // cancel previous request if it exists
    if (abortControllerRef.current) {
      // console.log("aborting previous request");
      abortControllerRef.current.abort()
    }

    // create new abort controller for this request
    abortControllerRef.current = new AbortController()

    setLoading(true)
    setError(null)

    const cacheKey = `${searchQuery}-${currentPage}-${limit}-${types.join(',')}-${sortField}-${sortOrder}`
    const cachedData = globalCache.get(cacheKey)

    // check if alid cache exists
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      // console.log("Using cached data for:", cacheKey)
      setQuestions(cachedData.data.questions)
      setTotalPages(cachedData.data.pagination.totalPages)
      setLoading(false)
      return
    }

    try {
      const response = await api.get<ApiResponse<SearchResponse>>('/api/search', {
        params: {
          query: searchQuery,
          page: currentPage,
          limit,
          sort: sortField,
          order: sortOrder,
          types: types.join(','),
        },
        signal: abortControllerRef.current.signal,
      })

      const { questions, pagination } = response.data.data

      // cache the new data
      globalCache.set(cacheKey, {
        data: response.data.data,
        timestamp: Date.now(),
      })

      setQuestions(questions)
      setTotalPages(pagination.totalPages)
    } catch (err) {
      // don't set error if request was cancelled
      if (axios.isCancel(err)) {
        console.log('request cancelled')
        return
      }

      let errorMessage = 'An error occurred while fetching questions'

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message
      }

      setError(errorMessage)
      setQuestions([])
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, currentPage, limit, sortField, sortOrder, types])

  // Ddebounce the fetch function for search query changes
  const debouncedFetch = useCallback(
    debounce((query: string) => {
      if (query.trim() == '' && currentPage == 1) {
        setQuestions([])
        setTotalPages(0)
        return
      }
      fetchQuestions()
    }, 300),
    [fetchQuestions]
  )

  useEffect(() => {
    debouncedFetch(searchQuery)
    return () => {
      debouncedFetch.cancel()
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [searchQuery, debouncedFetch])

  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now()
      for (const [key, value] of globalCache.entries()) {
        if (now - value.timestamp > CACHE_DURATION) {
          globalCache.delete(key)
        }
      }
    }, CACHE_DURATION)
    return () => clearInterval(cleanup)
  }, [])

  // expose a refetch method for manual refreshes
  const refetch = useCallback(async () => {
    // clear cache for current query before refetching
    const cacheKey = `${searchQuery}-${currentPage}-${limit}`
    globalCache.delete(cacheKey)
    await fetchQuestions()
  }, [fetchQuestions, searchQuery, currentPage, limit])

  return {
    questions,
    totalPages,
    loading,
    error,
    refetch,
  }
}
