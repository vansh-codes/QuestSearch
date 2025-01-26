import React, { useState, useCallback, useRef, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { SearchBarProps } from './interface'
import { FiSearch, FiX } from 'react-icons/fi'

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      onSearch(searchTerm)
    }, 500),
    [onSearch]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    debouncedSearch(value)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch('')
    inputRef.current?.focus()
  }

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <div className='relative group'>
        <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200 group-hover:text-[#ff5a2e]' />
        <input
          type='text'
          value={query}
          ref={inputRef}
          onChange={handleChange}
          placeholder='Search questions...'
          className='w-full pl-12 pr-4 py-4 rounded-lg border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a2e] transition-all duration-300 bg-white shadow-sm hover:shadow-md text-gray-800 placeholder-gray-400 text-base'
        />
        {query && (
          <button
            onClick={clearSearch}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#ff5a2e] focus:outline-none hover:cursor-pointer'
            aria-label='Clear search'
          >
            <FiX className='w-5 h-5 text-gray-500' />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
