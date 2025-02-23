import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { PaginationProps } from './interface'

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const [jumpToPage, setJumpToPage] = useState('')

  // calc visible page nums
  const getVisiblePages = () => {
    const numPages = 2 // num of pages to show on each side of current page
    const range = []
    const rangeWithDots = []
    let l

    // less than 7 pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // first page included always!
    range.push(1)

    for (let i = currentPage - numPages; i <= currentPage + numPages; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i)
      }
    }

    // last page included always!
    range.push(totalPages)

    // add dots in between
    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    }

    return rangeWithDots
  }

  const handleJumpToPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const page = parseInt(jumpToPage)
      if (page >= 1 && page <= totalPages) {
        onPageChange(page)
        setJumpToPage('')
      }
    }
  }

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-center gap-4 selection:text-black ${className}`}
    >
      <div className='flex items-center gap-2'>
        <span className='text-sm text-gray-500 whitespace-nowrap'>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <div className='flex items-center gap-2'>
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className='hidden sm:flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer'
          aria-label='First page'
        >
          <FiChevronsLeft className='w-4 h-4' />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer'
          aria-label='Previous page'
        >
          <FiChevronLeft className='w-4 h-4' />
        </button>

        {/* Page Numbers */}
        <div className='flex items-center gap-3'>
          {getVisiblePages().map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`sm:flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200 cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#ff5a2e] text-white'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className='px-1 text-gray-600'>
                {page}
              </span>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer'
          aria-label='Next page'
        >
          <FiChevronRight className='w-4 h-4' />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className='hidden sm:flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer'
          aria-label='Last page'
        >
          <FiChevronsRight className='w-4 h-4' />
        </button>
      </div>

      {/* jump to page input box */}
      <div className='flex items-center gap-2'>
        <div className='flex items-center gap-2'>
          <input
            type='number'
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            onKeyDown={handleJumpToPage}
            placeholder='Jump to'
            className='w-22 px-2 py-1 text-sm border rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#ff5a2e]'
            min='1'
            max={totalPages}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Pagination)
