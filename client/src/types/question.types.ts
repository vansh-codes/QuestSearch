export interface Question {
  _id: string
  title: string
  type: 'ANAGRAM' | 'CONTENT_ONLY' | 'CONVERSATION' | 'MCQ' | 'READ_ALONG'
  anagramType: 'WORD' | 'SENTENCE'
  blocks: {
    text: string
    showInOption: string
    isAnswer: string
  }[]
  options: {
    text: string
    isCorrectAnswer: boolean
  }[]
  solution: string
  createdAt: string
}

// src/types/api.types.ts
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface SearchResponse {
  questions: Question[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}
