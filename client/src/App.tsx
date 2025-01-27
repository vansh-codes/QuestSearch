import React, { useState, useCallback, useMemo, lazy, Suspense } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import { useQuestions } from './hooks/useQuestions'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { FiLoader, FiFilter } from 'react-icons/fi'
import FilterBadge from './components/Filters/FiltersBadge'
import { Error } from './components/Error/Error'
import { EmptyState } from './components/EmptyState/EmptyState'

const FilterModal = lazy(() => import('./components/Filters/FilterModal'))
const SearchResults = lazy(() => import('./components/SearchResults/SearchResults'))

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortField, setSortField] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [batchLimit, setBatchLimit] = useState<number>(10)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)

  const searchParams = useMemo(() => ({
    sortField,
    sortOrder,
    types: selectedTypes,
  }), [sortField, sortOrder, selectedTypes]);

  const { questions, totalPages, loading, error, refetch } = useQuestions(
    searchQuery,
    currentPage,
    batchLimit,
    searchParams
  )

  const handleTypeClick = useCallback((type: string) => {
    setSelectedTypes(prev => {
      if (!prev.includes(type)) {
        return [...prev, type];
      }
      return prev;
    });
    setCurrentPage(1);
  }, []);

  const handleTypeSelect = useCallback((types: string[]) => {
    setSelectedTypes(types)
    setCurrentPage(1)
  }, [])

  const handleTypeRemove = useCallback((type: string) => {
    setSelectedTypes(selectedTypes.filter((t) => t !== type))
    setCurrentPage(1)
  }, [selectedTypes])

  const handleSortChange = useCallback((field: string, order: 'asc' | 'desc') => {
    setSortField(field)
    setSortOrder(order)
    setCurrentPage(1)
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  const filterModalProps = useMemo(() => ({
    isOpen: isFilterModalOpen,
    onClose: () => setIsFilterModalOpen(false),
    selectedTypes,
    onTypeSelect: handleTypeSelect,
    sortField,
    sortOrder,
    onSortChange: handleSortChange,
    batchLimit,
    onBatchLimitChange: setBatchLimit,
  }), [isFilterModalOpen, selectedTypes, handleTypeSelect, sortField, sortOrder, handleSortChange, batchLimit])

  const searchResultsProps = useMemo(() => ({
    questions,
    query: searchQuery,
    currentPage,
    totalPages,
    onPageChange: setCurrentPage,
    onTypeClick: handleTypeClick,
  }), [questions, searchQuery, currentPage, totalPages, handleTypeClick]);

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
                className='p-3 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a2e] cursor-pointer'
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
          <Suspense fallback={
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
              <FiLoader className="w-8 h-8 text-white animate-spin" />
            </div>
          }>
            {isFilterModalOpen &&
              <FilterModal
                {...filterModalProps}
                aria-label='Filter and sort options'
              />
            }
          </Suspense>

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
            <Error error={error} onRetry={refetch} />
          )}

          {!loading && !error && questions.length === 0 && (
            <EmptyState />
          )}

          {!loading && !error && questions.length > 0 && (
            <Suspense fallback={
              <div className="flex justify-center py-8">
                <FiLoader className="w-8 h-8 text-[#ff5a2e] animate-spin" />
              </div>
            }>
              <section aria-label='Search results'>
                <SearchResults
                  {...searchResultsProps}
                />
              </section>
            </Suspense>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default React.memo(App)
