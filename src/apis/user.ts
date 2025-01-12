import { GetUserQuerySchemaType, GetUserResSchemaType } from '~/schemaValidation/user.schema'
import http from '~/utils/http'
import queryString from 'query-string'

export const userApiRequest = {
  getUsers: (query: GetUserQuerySchemaType) => {
    const stringified = queryString.stringify(query)
    return http.get<GetUserResSchemaType>(`/?${stringified}`)
  }
}
