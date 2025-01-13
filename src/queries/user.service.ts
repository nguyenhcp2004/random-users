import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import queryString from 'query-string'
import config from '~/constants/config'
import { GetUserQuerySchemaType, GetUserResSchemaType } from '~/schemaValidation/user.schema'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
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
