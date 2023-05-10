export type SearchRequestParams = {
  limit?: number
  offset?: number
  search?: string
} & Partial<Record<string, string | number>>
