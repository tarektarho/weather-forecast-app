import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getWeatherByCity, getWeatherByLatLon } from "../thunks/weather"
import WeatherData from "../../types/weatherTypes"

// Define the state structure for the weather slice
interface WeatherState {
  loading: boolean // Indicates if weather data is currently being loaded
  error: string | undefined | boolean // Holds any error message related to fetching weather data
  data: WeatherData | {} // Holds the fetched weather data or an empty object
}

// Define the payload structure for rejected actions
interface RejectedActionPayload {
  message: string // Error message describing the reason for rejection
}

// Define the initial state for the weather slice
const initialState: WeatherState = {
  loading: false,
  error: undefined,
  data: {},
}

// Create a Redux slice for weather-related state management
export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    // Reducer to set an error message in the state
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = Boolean(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      // Extra reducers for handling thunks' pending, fulfilled, and rejected states
      .addCase(getWeatherByLatLon.pending, (state) => {
        state.error = undefined // Clear any previous error message
        state.loading = true // Set loading flag to indicate data fetching
      })
      .addCase(getWeatherByLatLon.fulfilled, (state, action) => {
        state.loading = false // Turn off loading flag
        state.data = action.payload // Update weather data in the state
      })
      .addCase(getWeatherByLatLon.rejected, (state, action) => {
        const { message } = action.payload as RejectedActionPayload
        state.error = message // Set error message from the rejected payload
        state.loading = false // Turn off loading flag
      })
      .addCase(getWeatherByCity.pending, (state) => {
        state.error = undefined // Clear any previous error message
        state.loading = true // Set loading flag to indicate data fetching
      })
      .addCase(getWeatherByCity.fulfilled, (state, action) => {
        state.loading = false // Turn off loading flag
        state.data = action.payload // Update weather data in the state
      })
      .addCase(getWeatherByCity.rejected, (state, action) => {
        const { message } = action.payload as RejectedActionPayload
        state.error = message // Set error message from the rejected payload
        state.loading = false // Turn off loading flag
      })
  },
})

// Action creators are generated for each case reducer function
export const { setError } = weatherSlice.actions

export default weatherSlice.reducer
