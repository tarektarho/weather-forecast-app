import { createSlice } from "@reduxjs/toolkit"
import { getForecastByCity, getForecastByLatLon } from "../thunks/forecast"
import ForecastData from "../../types/forecastTypes"

interface ForecaseState {
  loading: boolean
  error: string | undefined
  data: ForecastData | {}
}

interface RejectedActionPayload {
  message: string
}

const initialState: ForecaseState = {
  loading: false,
  error: "",
  data: {},
}

export const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getForecastByLatLon.pending, (state) => {
        state.loading = true
      })
      .addCase(getForecastByLatLon.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getForecastByLatLon.rejected, (state, action) => {
        const { message } = action.payload as RejectedActionPayload
        state.error = message
        state.loading = false
      })
      .addCase(getForecastByCity.pending, (state) => {
        state.loading = true
      })
      .addCase(getForecastByCity.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getForecastByCity.rejected, (state, action) => {
        const { message } = action.payload as RejectedActionPayload
        state.error = message
        state.loading = false
      })
  },
})

export default forecastSlice.reducer
