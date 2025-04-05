import { Chip } from '@mui/material'

interface FilterChipProps {
  label: string
  field: string
  handleDelete: (field: string) => void
}

export const FilterChip = ({ label, field, handleDelete }: FilterChipProps) => {
  return (
    <Chip
      label={label}
      variant="outlined"
      onDelete={() => handleDelete(field)}
    />
  )
}