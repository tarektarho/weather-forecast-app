import { createAsyncThunk } from "@reduxjs/toolkit"
import * as AirPollutionService from "../../services/airPollution"
import { Coordinates } from "./types"

export const getAirPollutionByLatLon = createAsyncThunk(
  "airPollution/getAirPollution",
  async ({ lat, lon }: Coordinates, { rejectWithValue }) => {
    try {
      return await AirPollutionService.getAirPollutionByLatLon(lat, lon)
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)
