import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface BreadCrumbsState {
  data: string[]
  status: "idle" | "loading" | "failed"
}
const initialState: BreadCrumbsState = {
  data: [],
  status: "idle",
}

export const updateBreadcrumbsAsync = createAsyncThunk(
  "/bc/update",
  async (data: string[]) => {
    const res = await fetchBreadCrumbs(data)
    return res.data
  },
)
export const breadcrumbsSlice = createSlice({
  name: "breadcrumbs",
  initialState: initialState,
  reducers: {
    update_breadcrums: (state, action: PayloadAction<string[]>) => {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBreadcrumbsAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateBreadcrumbsAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.data = action.payload
      })
  },
})

export async function fetchBreadCrumbs(
  data: string[] = [],
): Promise<{ data: string[] }> {
  const response = await fetch("/bc/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  })
  const result = await response.json()

  return result
}

export const selectBreadcrumbs = (state: RootState) => state.breadcrumbs.data

export const { update_breadcrums } = breadcrumbsSlice.actions

export default breadcrumbsSlice.reducer
