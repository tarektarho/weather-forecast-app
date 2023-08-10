import { createSlice } from "@reduxjs/toolkit"
import { getAirPollutionByLatLon } from "../thunks/airPollution"
import AirPollutionData from "../../types/airPollution"

interface airPollutionState {
  loading: boolean
  error: string | undefined
  data: AirPollutionData | {}
}

interface RejectedActionPayload {
  message: string | undefined
}

const initialState: airPollutionState = {
  loading: false,
  error: "",
  data: {},
}

export const airPollutionSlice = createSlice({
  name: "airPollution",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAirPollutionByLatLon.pending, (state) => {
        state.loading = true
      })
      .addCase(getAirPollutionByLatLon.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getAirPollutionByLatLon.rejected, (state, action) => {
        const { message } = action.payload as RejectedActionPayload
        state.error = message
        state.loading = false
      })
  },
})

export default airPollutionSlice.reducer
