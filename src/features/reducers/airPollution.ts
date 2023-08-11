import { createSlice } from "@reduxjs/toolkit"
import { getAirPollutionByLatLon } from "../thunks/airPollution"
import AirPollutionData from "../../types/airPollutionTypes"

// Define the state structure for the airPollution slice
interface airPollutionState {
  loading: boolean // Indicates if air pollution data is currently being loaded
  error: string | undefined // Holds any error message related to fetching air pollution data
  data: AirPollutionData | {} // Holds the fetched air pollution data or an empty object
}

// Define the payload structure for rejected actions
interface RejectedActionPayload {
  message: string | undefined // Error message describing the reason for rejection
}

// Define the initial state for the airPollution slice
const initialState: airPollutionState = {
  loading: false,
  error: "",
  data: {},
}

// Create a Redux slice for air pollution-related state management
export const airPollutionSlice = createSlice({
  name: "airPollution",
  initialState,
  reducers: {}, // No reducer actions defined in this slice
  extraReducers: (builder) => {
    builder
      // Extra reducers for handling thunks' pending, fulfilled, and rejected states
      .addCase(getAirPollutionByLatLon.pending, (state) => {
        state.loading = true // Set loading flag to indicate data fetching
      })
      .addCase(getAirPollutionByLatLon.fulfilled, (state, action) => {
        state.loading = false // Turn off loading flag
        state.data = action.payload // Update air pollution data in the state
      })
      .addCase(getAirPollutionByLatLon.rejected, (state, action) => {
        const { message } = action.payload as RejectedActionPayload
        state.error = message // Set error message from the rejected payload
        state.loading = false // Turn off loading flag
      })
  },
})

export default airPollutionSlice.reducer
