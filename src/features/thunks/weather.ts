import * as WeatherService from "../../services/weather"

import { createAsyncThunk } from "@reduxjs/toolkit"
import { Coordinates, CityPayload } from "./types"

export const getWeatherByLatLon = createAsyncThunk(
  "weather/getWeatherByLatLon",
  async ({ lat, lon }: Coordinates, { rejectWithValue }) => {
    try {
      return await WeatherService.getWeatherByLatLon(lat, lon)
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const getWeatherByCity = createAsyncThunk(
  "weather/getWeatherByCity",
  async ({ city }: CityPayload, { rejectWithValue }) => {
    try {
      return await WeatherService.getWeatherByCity(city)
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)
