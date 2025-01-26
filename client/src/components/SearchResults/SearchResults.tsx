import React, { useState } from 'react'
import { SearchResultsProps } from './interface'
import Pagination from '../Pagination/Pagination'
import { Question } from '../../types/question.types'

const SearchResults: React.FC<SearchResultsProps> = ({
  questions,
  query,
  currentPage,
  totalPages,
  onPageChange,
  onTypeClick,
}) => {
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null)

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

  const handleViewClick = (questionId: string) => {
    setActiveQuestionId(activeQuestionId === questionId ? null : questionId)
  }

  const renderOptions = (options: Question['options']) => (
    <div className='mt-4'>
      <h4 className='text-gray-700 font-semibold mb-2'>Options:</h4>
      <ul className='list-disc list-inside space-y-0.5 w-1/4'>
        {options.map((option, index) => (
          <li
            key={index}
            className={`p-2 rounded ${
              option.isCorrectAnswer ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  )

  const renderBlocks = (blocks: Question['blocks'], anagramType: Question['anagramType']) => (
    <div className='mt-4'>
      <h4 className='text-gray-700 font-semibold mb-2'>Blocks ({anagramType}):</h4>
      <div
        className={`grid ${anagramType === 'WORD' ? 'gap-2 grid-cols-8 md:grid-cols-12 lg:grid-cols-12' : 'gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}
      >
        {blocks
          .sort(() => Math.random() - 0.5)
          .map((block, index) => (
            <div key={index} className='p-3 border rounded shadow-sm bg-gray-50 border-gray-200'>
              <p className='text-gray-800'>{block.text}</p>
            </div>
          ))}
      </div>
    </div>
  )

  console.log('questions', questions)

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='grid gap-4 mb-8'>
        {questions.map((question) => (
          <div
            key={question._id}
            className='bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-gray-100'
          >
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                  {highlightQuery(question.title, query)}
                </h3>
                <div className='flex items-center space-x-2'>
                  <button
                    className='text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a2e]'
                    onClick={() => onTypeClick(question.type)}
                  >
                    {question.type}
                  </button>
                </div>
              </div>
            </div>

            {question.type === 'MCQ' && (
              <button
                onClick={() => handleViewClick(question._id)}
                className='mt-4 text-sm text-white bg-[#ff5a2e] px-3 py-2 rounded-lg hover:bg-[#e04d28] transition-colors'
              >
                {activeQuestionId === question._id ? 'Hide Options' : 'View Options'}
              </button>
            )}

            {question.type === 'ANAGRAM' && (
              <button
                onClick={() => handleViewClick(question._id)}
                className='mt-4 text-sm text-white bg-[#ff5a2e] px-3 py-2 rounded-lg hover:bg-[#e04d28] transition-colors'
              >
                {activeQuestionId === question._id ? 'Hide Blocks' : 'View Blocks'}
              </button>
            )}

            {activeQuestionId === question._id &&
              question.type === 'MCQ' &&
              question.options &&
              renderOptions(question.options)}

            {activeQuestionId === question._id &&
              question.type === 'ANAGRAM' &&
              question.blocks &&
              renderBlocks(question.blocks, question.anagramType)}

            {activeQuestionId === question._id && question.solution && (
              <div className='mt-4'>
                <h4 className='text-gray-700 font-semibold mb-2'>Solution:</h4>
                <p className='bg-green-100 text-green-700'>{question.solution}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
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

export default SearchResults
