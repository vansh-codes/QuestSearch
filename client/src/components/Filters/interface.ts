export interface FilterBadgeProps {
  label: string
  onRemove: () => void
}

export interface FilterBarProps {
  selectedTypes: string[]
  onTypeRemove: (type: string) => void
  sortOrder: 'asc' | 'desc'
  sortField: string
  onSortChange: (field: string, order: 'asc' | 'desc') => void
}
