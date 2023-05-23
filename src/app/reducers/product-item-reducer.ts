import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { secretMW } from "./product-reducer"

export interface ProductsItemState {
  data: any
  loading: "inactivo" | "pendiente"
  error: string
}
const initialState: ProductsItemState = {
  data: {},
  loading: "inactivo",
  error: "",
}

export const getProduct = createAsyncThunk("product", async (id: string) => {
  const response = await axios.get(
    secretMW(`http://localhost:3000/api/items/${id}`),
  )
  return response.data
})

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state, action) => {
      if (state.loading === "inactivo") {
        state.loading = "pendiente"
      }
    })
    builder.addCase(getProduct.fulfilled, (state, action) => {
      if (state.loading === "pendiente") {
        state.data = action.payload
        state.loading = "inactivo"
      }
    })
    builder.addCase(getProduct.rejected, (state, action) => {
      if (state.loading === "pendiente") {
        state.loading = "inactivo"
        state.error =
          "Ocurrió un error intentando obtener los resultados de la búsqueda"
      }
    })
  },
})

export default productSlice.reducer
