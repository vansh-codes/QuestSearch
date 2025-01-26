import { Question } from '../../types/question.types'

export interface SearchResultsProps {
  questions: Question[]
  query: string
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onTypeClick: (type: string) => void
}
