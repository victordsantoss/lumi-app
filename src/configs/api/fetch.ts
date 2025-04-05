import { IFetchErrorResponse, IFetchSuccessResponse } from '@/common/dtos/fetch.dto'

export const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {},
  queryParams?: Record<string, string | number | boolean | undefined>,
): Promise<T> => {
  const { body, ...rest } = options

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`)


  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  })

  const data = await response.json()

  return {
    ok: response.ok,
    status: response.status,
    response: data,
  } as T
}

export const handleApiError = <T>(
  response: IFetchSuccessResponse<T> | IFetchErrorResponse,
  defaultMessage?: string,
): T => {
  if (!response.ok) {
    throw new Error(
      `Error ${response?.status}: ${response?.response?.message || defaultMessage}`,
    )
  }
  return response.response as T
}