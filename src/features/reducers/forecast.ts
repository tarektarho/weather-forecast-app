import { createSlice } from "@reduxjs/toolkit"
import { getForecastByCity, getForecastByLatLon } from "../thunks/forecast"
import ForecastData from "../../types/forecastTypes"

// Define the state structure for the forecast slice
interface ForecaseState {
  loading: boolean // Indicates if forecast data is currently being loaded
  error?: string // Holds any error message related to fetching forecast data
  data: ForecastData | {} // Holds the fetched forecast data or an empty object
}

// Define the payload structure for rejected actions
interface RejectedActionPayload {
  message: string // Error message describing the reason for rejection
}

// Define the initial state for the forecast slice
const initialState: ForecaseState = {
  loading: false,
  error: "",
  data: {},
}

// Create a Redux slice for forecast-related state management
export const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {}, // No reducer actions defined in this slice
  extraReducers: (builder) => {
    builder
      // Extra reducers for handling thunks' pending, fulfilled, and rejected states
      .addCase(getForecastByLatLon.pending, (state) => {
        state.loading = true // Set loading flag to indicate data fetching
      })
      .addCase(getForecastByLatLon.fulfilled, (state, action) => {
        state.loading = false // Turn off loading flag
        state.data = action.payload // Update forecast data in the state
      })
      .addCase(getForecastByLatLon.rejected, (state, action) => {
        const { message } = action.payload as RejectedActionPayload
        state.error = message // Set error message from the rejected payload
        state.loading = false // Turn off loading flag
      })
      .addCase(getForecastByCity.pending, (state) => {
        state.loading = true // Set loading flag to indicate data fetching
      })
      .addCase(getForecastByCity.fulfilled, (state, action) => {
        state.loading = false // Turn off loading flag
        state.data = action.payload // Update forecast data in the state
      })
      .addCase(getForecastByCity.rejected, (state, action) => {
        const { message } = action.payload as RejectedActionPayload
        state.error = message // Set error message from the rejected payload
        state.loading = false // Turn off loading flag
      })
  },
})

export default forecastSlice.reducer
