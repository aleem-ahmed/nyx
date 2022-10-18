import { configureStore } from "@reduxjs/toolkit";

import App from "../AppSlice";

export const store = configureStore({
	reducer: {
		App: App,
	}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch