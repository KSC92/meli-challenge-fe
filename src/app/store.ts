import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import productsReducer from "./reducers/product-reducer"
import breadcrumbsReducer from "./reducers/breadcrumb-reducer"
import productReducer from "./reducers/product-item-reducer"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    breadcrumbs: breadcrumbsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
