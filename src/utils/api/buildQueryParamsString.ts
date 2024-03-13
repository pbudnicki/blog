// TODO: add unit tests
export const buildQueryParamsString = <T extends Record<string, string | number | boolean>>(
  queryParameters: T
): string => {
  const queryParams = new URLSearchParams()

  Object.entries(queryParameters).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString())
    }
  })

  return queryParams.toString()
}
