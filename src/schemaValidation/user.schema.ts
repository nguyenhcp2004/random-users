import { z } from 'zod'

export const GetUserQuerySchema = z.object({
  page: z.number().optional(),
  results: z.number().optional(),
  gender: z.string().optional(),
  role: z.string().optional()
})

export type GetUserQuerySchemaType = z.TypeOf<typeof GetUserQuerySchema>

export const GetUserResSchema = z.object({
  results: z.array(
    z.object({
      gender: z.string(),
      name: z.object({
        title: z.string(),
        first: z.string(),
        last: z.string()
      }),
      location: z.object({
        street: z.object({
          number: z.number(),
          name: z.string()
        }),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        postcode: z.union([z.number(), z.string()]),
        coordinates: z.object({
          latitude: z.string(),
          longitude: z.string()
        }),
        timezone: z.object({
          offset: z.string(),
          description: z.string()
        })
      }),
      email: z.string().email(),
      login: z.object({
        uuid: z.string(),
        username: z.string(),
        password: z.string(),
        salt: z.string(),
        md5: z.string(),
        sha1: z.string(),
        sha256: z.string()
      }),
      dob: z.object({
        date: z.string(),
        age: z.number()
      }),
      registered: z.object({
        date: z.string(),
        age: z.number()
      }),
      phone: z.string(),
      cell: z.string(),
      id: z.object({
        name: z.string().nullable(),
        value: z.string().nullable()
      }),
      picture: z.object({
        large: z.string(),
        medium: z.string(),
        thumbnail: z.string()
      }),
      nat: z.string()
    })
  )
})

export type GetUserResSchemaType = z.TypeOf<typeof GetUserResSchema>
