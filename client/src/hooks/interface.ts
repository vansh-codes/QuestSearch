import { Question } from '../types/question.types'
import { SearchResponse } from '../types/question.types'

export interface UseQuestionsReturn {
    questions: Question[]
    totalPages: number
    loading: boolean
    error: string | null
    refetch: () => Promise<void>
}

export interface UseQuestionsOptions {
    sortField?: string
    sortOrder?: 'asc' | 'desc'
    types?: string[]
}

export interface CacheData {
    data: SearchResponse
    timestamp: number
}