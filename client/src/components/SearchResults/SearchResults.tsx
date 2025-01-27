import React, { useCallback, useMemo, useState } from 'react'
import { SearchResultsProps } from './interface'
import Pagination from '../Pagination/Pagination'
import { Question } from '../../types/question.types'
import QuestionCard from './QuestionCard'
import OptionItem from './OptionsItem'
import BlockItem from './BlockItem'

const SearchResults: React.FC<SearchResultsProps> = ({
  questions,
  query,
  currentPage,
  totalPages,
  onPageChange,
  onTypeClick,
}) => {
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null)

  const handleViewClick = (questionId: string) => {
    setActiveQuestionId(activeQuestionId === questionId ? null : questionId)
  }

  const highlightQuery = (title: string, query: string): React.ReactNode => {
    if (!query) return title
    const parts = title.split(new RegExp(`(${query})`, 'gi'))
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className='bg-orange-300'>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    )
  }

  const renderOptions = useCallback((options: Question['options']) => (
    <div className='mt-4'>
      <h4 className='text-gray-700 font-semibold mb-2'>Options:</h4>
      <ul className='list-disc list-inside space-y-0.5 w-full md:w-1/3 lg:w-1/4'>
        {options.map((option, index) => (
          <OptionItem key={index} option={option} />
        ))}
      </ul>
    </div>
  ), [])

  const renderBlocks = useCallback((blocks: Question['blocks'], anagramType: Question['anagramType']) => (
    <div className='mt-4'>
      <h4 className='text-gray-700 font-semibold mb-2'>Blocks ({anagramType}):</h4>
      <div
        className={`grid ${anagramType === 'WORD' ? 'gap-2 grid-cols-8 md:grid-cols-12 lg:grid-cols-12' : 'gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}
      >
        {blocks
          .sort(() => Math.random() - 0.5)
          .map((block, index) => (
            <BlockItem key={`${block.text}-${index}`} block={block} />
          ))}
      </div>
    </div>
  ), [])

  // Memoize pagination visibility
  const showPagination = useMemo(() => totalPages > 1, [totalPages])

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='grid gap-4 mb-8'>
        {questions.map((question) => (
          <QuestionCard
            key={question._id}
            question={question}
            query={query}
            isActive={activeQuestionId === question._id}
            onViewClick={handleViewClick}
            onTypeClick={onTypeClick}
            renderOptions={renderOptions}
            renderBlocks={renderBlocks}
            highlightQuery={highlightQuery}
          />
        ))}
      </div>

      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className='mb-8'
        />
      )}
    </div>
  )
}

export default React.memo(SearchResults)
