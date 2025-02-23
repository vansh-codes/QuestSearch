import { Question } from '../../types/question.types'

export interface SearchResultsProps {
  questions: Question[]
  query: string
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onTypeClick: (type: string) => void
}

export interface QuestionCardProps {
  question: Question
  query: string
  isActive: boolean
  onViewClick: (id: string) => void
  onTypeClick: (type: string) => void
  renderOptions: (options: Question['options']) => React.ReactNode
  renderBlocks: (blocks: Question['blocks'], type: Question['anagramType']) => React.ReactNode
  highlightQuery: (title: string, query: string) => React.ReactNode
}

export interface ViewButtonProps {
  type: string
  isActive: boolean
  onClick: () => void
}

export interface QuestionContentProps {
  question: Question
  isActive: boolean
  renderOptions: (options: Question['options']) => React.ReactNode
  renderBlocks: (blocks: Question['blocks'], type: Question['anagramType']) => React.ReactNode
}
