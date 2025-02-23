import React, { useMemo } from 'react'
import { ViewButtonProps } from './interface'

const ViewButton = React.memo(({ type, isActive, onClick }: ViewButtonProps) => {
  const buttonText = useMemo(() => {
    if (type === 'MCQ') {
      return isActive ? 'Hide Options' : 'View Options'
    }
    if (type === 'ANAGRAM') {
      return isActive ? 'Hide Blocks' : 'View Blocks'
    }
    return ''
  }, [type, isActive])

  if (!['MCQ', 'ANAGRAM'].includes(type)) {
    return null
  }

  return (
    <button
      onClick={onClick}
      className='mt-4 text-sm text-white bg-[#ff5a2e] px-3 py-2 rounded-lg hover:bg-[#e04d28] transition-colors'
      aria-expanded={isActive}
    >
      {buttonText}
    </button>
  )
})

export default ViewButton
