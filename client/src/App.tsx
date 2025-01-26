import React, { useState } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import { useQuestions } from './hooks/useQuestions'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { FiLoader, FiAlertCircle, FiFilter } from 'react-icons/fi'
import FilterBadge from './components/Filters/FiltersBadge'
import FilterModal from './components/Filters/FilterModal'

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortField, setSortField] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)
  const ITEMS_PER_PAGE = 10

  const { questions, totalPages, loading, error, refetch } = useQuestions(
    searchQuery,
    currentPage,
    ITEMS_PER_PAGE,
    {
      sortField,
      sortOrder,
      types: selectedTypes,
    }
  )

  const handleTypeClick = (type: string) => {
    if (!selectedTypes.includes(type)) {
      setSelectedTypes([...selectedTypes, type])
      setCurrentPage(1)
    }
  }

  const handleTypeSelect = (types: string[]) => {
    setSelectedTypes(types)
    setCurrentPage(1)
  }

  const handleTypeRemove = (type: string) => {
    setSelectedTypes(selectedTypes.filter((t) => t !== type))
    setCurrentPage(1)
  }

  const handleSortChange = (field: string, order: 'asc' | 'desc') => {
    setSortField(field)
    setSortOrder(order)
    setCurrentPage(1)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  return (
    <ErrorBoundary>
      <div className='min-h-screen bg-gray-50 selection:bg-[#ff7a56]' role='main'>
        <div className='container mx-auto px-4 py-8 '>
          <h1
            className='text-3xl font-bold text-center text-gray-800 mb-8'
            aria-label='QuestSearch by SpeakX'
          >
            QuestSearch by <span className='text-[#ff5a2e] selection:text-[#7578f2]'>SpeakX</span>
          </h1>

          <div className='relative max-w-2xl mx-auto mb-8'>
            <div className='flex items-center gap-4'>
              <div className='flex-1'>
                <SearchBar onSearch={handleSearch} aria-label='Search questions' />
              </div>
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className='p-3 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a2e]'
                aria-label='Open filters'
                title='Open filters and sorting options'
              >
                <FiFilter className='w-5 h-5 text-gray-600' />
              </button>
            </div>

            {/* Active Filters (centered below SearchBar) */}
            {selectedTypes.length > 0 && (
              <div className='mt-4' role='region' aria-label='Active filters'>
                <div className='flex flex-wrap justify-center gap-2'>
                  {selectedTypes.map((type) => (
                    <FilterBadge
                      key={type}
                      label={type}
                      onRemove={() => handleTypeRemove(type)}
                      aria-label={`Remove ${type} filter`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filter Modal */}
          <FilterModal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            selectedTypes={selectedTypes}
            onTypeSelect={handleTypeSelect}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            aria-label='Filter and sort options'
          />

          {loading && (
            <div
              className='flex justify-center items-center py-12'
              role='status'
              aria-label='Loading results'
            >
              <FiLoader className='w-8 h-8 text-[#ff5a2e] animate-spin' />
              <span className='sr-only'>Loading results...</span>
            </div>
          )}

          {error && (
            <>
              <div
                className='max-w-md mx-auto bg-red-50 p-4 rounded-lg flex items-center justify-between'
                role='alert'
              >
                <div className='flex items-center space-x-3'>
                  <FiAlertCircle className='text-red-500 w-5 h-5' />
                  <span className='text-red-700'>{error}</span>
                </div>
                <button
                  onClick={refetch}
                  className='px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200'
                  aria-label='Retry search'
                >
                  Retry
                </button>
              </div>
              <div className='flex justify-center items-center py-12' aria-label='Search Failed'>
                <img src='./fail.svg' alt='Search Failed' className='h-48 w-48' draggable={false} />
              </div>
            </>
          )}

          {!loading && !error && questions.length === 0 && (
            <div
              className='flex flex-col items-center justify-center py-12 text-gray-500 selection:text-black'
              role='status'
              aria-label='No results found'
            >
              <img
                src='./search.svg'
                alt='Placeholder search icon'
                draggable={false}
                className='h-16 w-16 mb-4 text-gray-400'
                loading='lazy'
              />
              <p className='text-lg font-medium'>Start searching!</p>
              <p className='text-sm text-gray-400 mt-1'>
                Enter a keyword or phrase to find relevant questions.
              </p>
            </div>
          )}

          {!loading && !error && questions.length > 0 && (
            <section aria-label='Search results'>
              <SearchResults
                questions={questions}
                query={searchQuery}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onTypeClick={handleTypeClick}
              />
            </section>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
