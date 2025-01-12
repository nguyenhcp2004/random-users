import { useQuery } from '@tanstack/react-query'
import { userApiRequest } from '~/apis/user'
import { GetUserQuerySchemaType } from '~/schemaValidation/user.schema'

export const useGetUser = (query: GetUserQuerySchemaType) => {
  return useQuery({
    queryKey: ['users', query],
    queryFn: () => userApiRequest.getUsers(query)
  })
}
