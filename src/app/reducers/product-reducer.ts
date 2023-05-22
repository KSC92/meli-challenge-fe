import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Buffer } from "buffer"
// Modifique en caso de cambiar el autor de los requests
const author_name = "Karel"
const author_lastname = "Sánchez Cabrera"

const secret = Buffer.from(author_name + author_lastname).toString("base64")
const secretMW = (s: string) => s + `&secret=${secret}`

export const getProducts = createAsyncThunk(
  "products",
  async (search_param: string) => {
    const response = await axios.get(
      secretMW(`http://localhost:3000/api/items?q=${search_param || ""}`),
    )
    return response.data
  },
)

export const productsSlice = createSlice({
  name: "products",
  initialState: { data: [], error: "", loading: "inactivo" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      if (state.loading === "inactivo") {
        state.loading = "pendiente"
      }
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      if (state.loading === "pendiente") {
        state.data = action.payload
        state.loading = "inactivo"
      }
    })
    builder.addCase(getProducts.rejected, (state, action) => {
      if (state.loading === "pendiente") {
        state.loading = "inactivo"
        state.error =
          "Ocurrió un error intentando obtener los resultados de la búsqueda"
      }
    })
  },
})

export default productsSlice.reducer
