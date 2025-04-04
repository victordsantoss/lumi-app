export interface PaginatedResponse<T> {
  data: T[]
  limit: number
  page: number
  total: number
  totalPages: number
}
