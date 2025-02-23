import React from 'react'
import { QuestionCardProps } from './interface'
import ViewButton from './ViewButton'
import { QuestionContent } from './QuestionContent'

const QuestionCard = React.memo(
  ({
    question,
    query,
    isActive,
    onViewClick,
    onTypeClick,
    renderOptions,
    renderBlocks,
    highlightQuery,
  }: QuestionCardProps) => (
    <div className='bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-gray-100'>
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

      <ViewButton
        type={question.type}
        isActive={isActive}
        onClick={() => onViewClick(question._id)}
      />

      {isActive && (
        <QuestionContent
          question={question}
          isActive={isActive}
          renderOptions={renderOptions}
          renderBlocks={renderBlocks}
        />
      )}
    </div>
  )
)

export default QuestionCard
