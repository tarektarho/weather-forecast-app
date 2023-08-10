import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getWeatherByCity, getWeatherByLatLon } from "../thunks/weather"
import WeatherData from "../../types/weatherTypes"

interface WeatherState {
  loading: boolean
  error?: string
  data: WeatherData | {}
}

interface RejectedActionPayload {
  message: string
}

const initialState: WeatherState = {
  loading: false,
  error: "",
  data: {},
}

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherByLatLon.pending, (state) => {
        state.error = ""
        state.loading = true
      })
      .addCase(getWeatherByLatLon.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getWeatherByLatLon.rejected, (state, action) => {
        const { message } = action.payload as RejectedActionPayload
        state.error = message
        state.loading = false
      })
      .addCase(getWeatherByCity.pending, (state) => {
        state.error = ""
        state.loading = true
      })
      .addCase(getWeatherByCity.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getWeatherByCity.rejected, (state, action) => {
        const { message } = action.payload as RejectedActionPayload
        state.error = message
        state.loading = false
      })
  },
})

// Action creators are generated for each case reducer function
export const { setError } = weatherSlice.actions

export default weatherSlice.reducer
