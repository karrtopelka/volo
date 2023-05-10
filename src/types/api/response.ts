export type PaginatedListResponse<T extends Record<string, unknown>> = {
  hasMore: boolean
  data: T[]
}

export type APIErrorResponse = {
  error: string
  message: string[] | string
  statusCode: number
}

export type ApiErrorResponseWrapper = {
  data: APIErrorResponse
}
