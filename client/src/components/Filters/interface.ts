export interface FilterBadgeProps {
  label: string
  onRemove: () => void
}

export interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  selectedTypes: string[]
  onTypeSelect: (types: string[]) => void
  sortField: string
  sortOrder: 'asc' | 'desc'
  onSortChange: (field: string, order: 'asc' | 'desc') => void
  batchLimit: number
  onBatchLimitChange: (limit: number) => void
}
