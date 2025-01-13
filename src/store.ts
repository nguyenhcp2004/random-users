import { configureStore } from '@reduxjs/toolkit'
// import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from '~/queries/user.service'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer // thêm reducer được tạo từ api slice
  },

  //Thêm apio middleware để enable các tính năng như caching, invalidation, polling của rtk query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
})

//optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconnect
// setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
