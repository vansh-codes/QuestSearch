import React from 'react'
import { QuestionContentProps } from './interface'

export const QuestionContent = React.memo(
  ({ question, isActive, renderOptions, renderBlocks }: QuestionContentProps) => {
    if (!isActive) return null

    return (
      <div className='space-y-4'>
        {question.type === 'MCQ' && question.options && (
          <div className='animate-fadeIn'>{renderOptions(question.options)}</div>
        )}

        {question.type === 'ANAGRAM' && question.blocks && (
          <div className='animate-fadeIn'>
            {renderBlocks(question.blocks, question.anagramType)}
          </div>
        )}

        {question.solution && (
          <div className='animate-fadeIn mt-4'>
            <h4 className='text-gray-700 font-semibold mb-2'>Solution:</h4>
            <p className='bg-green-100 text-green-700 p-3 rounded-lg'>{question.solution}</p>
          </div>
        )}
      </div>
    )
  }
)
