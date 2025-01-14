import { createApi } from '@reduxjs/toolkit/query/react'
import queryString from 'query-string'
import { GetUserQuerySchemaType, GetUserResSchemaType } from '~/schemaValidation/user.schema'
import { axiosBaseQuery } from '~/utils/http'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getUsers: builder.query<GetUserResSchemaType, GetUserQuerySchemaType>({
      query: (query) => {
        const queryObject = queryString.stringify(query)
        return {
          url: `/?${queryObject}`
        }
      }
    })
  })
})

export const { useGetUsersQuery } = userApi
