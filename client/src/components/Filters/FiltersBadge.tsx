import React from 'react'
import { FiX } from 'react-icons/fi'
import { FilterBadgeProps } from './interface'

const FilterBadge: React.FC<FilterBadgeProps> = ({ label, onRemove }) => (
  <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-fullbg-[#fff1ed] text-[#ff5a2e] text-sm font-medium border border-[#ffd1c2] transition-all duration-200 hover:bg-[#ffe4db] selection:text-[#7578f2]'>
    {label}
    <button
      onClick={onRemove}
      className='inline-flex items-center justify-center w-4 h-4 hover:bg-[#ff5a2e] hover:text-white rounded-full transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a2e] focus:ring-offset-1'
      aria-label={`Remove ${label} filter`}
    >
      <FiX className='w-3 h-3' />
    </button>
  </span>
)

export default React.memo(FilterBadge)
