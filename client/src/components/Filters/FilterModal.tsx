import React, { useState, useEffect, useCallback } from 'react'
import { FiX } from 'react-icons/fi'
import { FilterModalProps } from './interface'

const QUESTION_TYPES = [
  { value: 'ANAGRAM', label: 'Anagram' },
  { value: 'CONTENT_ONLY', label: 'Content Only' },
  { value: 'CONVERSATION', label: 'Conversation' },
  { value: 'MCQ', label: 'MCQ' },
  { value: 'READ_ALONG', label: 'Read Along' },
] as const

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Created Time (Latest)' },
  { value: 'type', label: 'Question Type' },
  { value: 'title', label: 'Title' },
] as const

const BATCH_LIMITS = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
] as const

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  selectedTypes,
  onTypeSelect,
  sortField,
  sortOrder,
  onSortChange,
  batchLimit,
  onBatchLimitChange,
}) => {
  // temp filkter states
  const [tempTypes, setTempTypes] = useState<string[]>(selectedTypes)
  const [tempSortField, setTempSortField] = useState<string>(sortField)
  const [tempSortOrder, setTempSortOrder] = useState<'asc' | 'desc'>(sortOrder)
  const [tempBatchLimit, setTempBatchLimit] = useState<number>(batchLimit)

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  // resets states when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempTypes(selectedTypes)
      setTempSortField(sortField)
      setTempSortOrder(sortOrder)
      setTempBatchLimit(batchLimit)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, selectedTypes, sortField, sortOrder, batchLimit, handleEscapeKey])

  const handleTypeToggle = (type: string) => {
    setTempTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleApplyFilters = useCallback(() => {
    onTypeSelect(tempTypes)
    onSortChange(tempSortField, tempSortOrder)
    onBatchLimitChange(tempBatchLimit)
    onClose()
  }, [
    tempTypes,
    tempSortField,
    tempSortOrder,
    tempBatchLimit,
    onTypeSelect,
    onSortChange,
    onBatchLimitChange,
    onClose,
  ])

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 z-50 overflow-y-auto'
      role='dialog'
      aria-labelledby='filter-modal-title'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-black/30 transition-opacity' aria-hidden='true' />

      <div className='relative min-h-screen flex items-center justify-center p-4'>
        <div className='relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 overflow-hidden'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-xl font-semibold text-gray-800'>Filters & Sort</h3>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a2e] rounded-full transition-colors'
              aria-label='Close modal'
            >
              <FiX className='w-5 h-5 text-gray-500' />
            </button>
          </div>

          <div className='mb-6' aria-labelledby='question-types-title'>
            <h4 className='text-sm font-medium text-gray-700 mb-3'>Question Types</h4>
            <div className='space-y-2'>
              {QUESTION_TYPES.map(({ value, label }) => (
                <label
                  key={value}
                  className='flex items-center px-3 py-0.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'
                >
                  <input
                    type='checkbox'
                    checked={tempTypes.includes(value)}
                    onChange={() => handleTypeToggle(value)}
                    className='w-4 h-4 accent-[#ff5a2e] rounded focus:outline-hidden focus:ring-2 focus:ring-[#ff5a2e] border-gray-300'
                    aria-label={`Filter by ${label}`}
                  />
                  <span className='ml-3 text-gray-700'>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='mb-6'>
            <h4 className='text-sm font-medium text-gray-700 mb-3'>Sort By</h4>
            <div className='space-y-2'>
              {SORT_OPTIONS.map(({ value, label }) => (
                <label
                  key={value}
                  className='flex items-center px-3 py-0.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'
                >
                  <input
                    type='radio'
                    checked={tempSortField === value}
                    onChange={() => setTempSortField(value)}
                    className='w-4 h-4 text-[#ff5a2e] accent-[#ff5a2e] focus:outline-hidden focus:ring-2 focus:ring-[#ff5a2e] border-gray-300'
                    aria-label={`Sort by ${label}`}
                  />
                  <span className='ml-3 text-gray-700'>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='mb-6'>
            <h4 className='text-sm font-medium text-gray-700 mb-3'>Sort Order</h4>
            <div className='flex gap-4'>
              {[
                { value: 'asc', label: 'Ascending' },
                { value: 'desc', label: 'Descending' },
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className='flex items-center px-3 py-0.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'
                >
                  <input
                    type='radio'
                    checked={tempSortOrder === value}
                    onChange={() => setTempSortOrder(value as 'asc' | 'desc')}
                    className='w-4 h-4 accent-[#ff5a2e] focus:ring-2 focus:ring-[#ff5a2e] border-gray-300'
                    name='sort-order'
                    aria-label={`Sort in ${label} order`}
                  />
                  <span className='ml-3 text-gray-700'>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='mb-6' role='group' aria-labelledby='batch-limit-title'>
            <h4 id='batch-limit-title' className='text-sm font-medium text-gray-700 mb-3'>
              Items Per Page
            </h4>
            <div className='flex flex-wrap gap-3'>
              {BATCH_LIMITS.map(({ value, label }) => (
                <label
                  key={value}
                  className='flex items-center px-3 py-0.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'
                >
                  <input
                    type='radio'
                    name='batch-limit'
                    value={value}
                    checked={tempBatchLimit === value}
                    onChange={() => setTempBatchLimit(value)}
                    className='w-4 h-4 accent-[#ff5a2e] focus:ring-2 focus:ring-[#ff5a2e] border-gray-300'
                    aria-label={`Show ${label}`}
                  />
                  <span className='ml-3 text-gray-700'>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='flex justify-end gap-3'>
            <button
              onClick={onClose}
              className='px-4 py-2 text-gray-600 hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a2e] rounded-lg transition-colors'
              aria-label='Cancel and close modal'
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className='px-4 py-2 bg-[#ff5a2e] text-white rounded-lg hover:bg-[#ff4615] transition-colors'
              aria-label='Apply filters and close modal'
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(FilterModal)
