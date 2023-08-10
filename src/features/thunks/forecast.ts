import { createAsyncThunk } from "@reduxjs/toolkit"
import * as ForecastService from "../../services/forecast"
import { Coordinates, CityPayload } from "./types"

export const getForecastByLatLon = createAsyncThunk(
  "forecast/getForecast",
  async ({ lat, lon }: Coordinates, { rejectWithValue }) => {
    try {
      return await ForecastService.getForecastByLatLon(lat, lon)
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const getForecastByCity = createAsyncThunk(
  "forecast/getForecastByCity",
  async ({ city }: CityPayload, { rejectWithValue }) => {
    try {
      return await ForecastService.getForecastByCity(city)
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)
