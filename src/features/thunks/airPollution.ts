import { createAsyncThunk } from "@reduxjs/toolkit"
import * as AirPollutionService from "../../services/airPollution"
import { Coordinates } from "./types"
import AirPollutionData from "../../types/airPollution"

/**
 * Async thunk action to get air pollution data by latitude and longitude.
 *
 * @param {Coordinates} { lat, lon } - Object containing latitude and longitude.
 * @param {Object} { rejectWithValue } - The callback to reject the promise with a value.
 * @returns {Promise} A promise that resolves to the air pollution data or rejects with an error.
 */
export const getAirPollutionByLatLon = createAsyncThunk<
  AirPollutionData,
  Coordinates
>(
  "airPollution/getAirPollution",
  async ({ lat, lon }: Coordinates, { rejectWithValue }) => {
    try {
      return await AirPollutionService.getAirPollutionByLatLon(lat, lon)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
