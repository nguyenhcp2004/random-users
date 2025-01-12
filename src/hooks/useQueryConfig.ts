import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from '~/hooks/useQueryParams'
import { GetUserQuerySchemaType } from '~/schemaValidation/user.schema'

export type QueryConfig = {
  [key in keyof GetUserQuerySchemaType]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      results: queryParams.results || 10,
      gender: queryParams.gender || '',
      role: queryParams.role || 'dev'
    },
    isUndefined
  )

  return queryConfig
}
