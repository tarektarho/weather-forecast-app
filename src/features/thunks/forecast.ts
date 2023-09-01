import { createAsyncThunk } from "@reduxjs/toolkit"
import * as ForecastService from "../../services/forecast"
import { Coordinates, CityPayload } from "./types"
import ForecastData from "../../types/forecast"

/**
 * Async thunk action to get forecast data by latitude and longitude.
 *
 * @param {Coordinates} { lat, lon } - Object containing latitude and longitude.
 * @param {Object} { rejectWithValue } - The callback to reject the promise with a value.
 * @returns {Promise} A promise that resolves to the forecast data or rejects with an error.
 */
export const getForecastByLatLon = createAsyncThunk<ForecastData, Coordinates>(
  "forecast/getForecastByLatLon",
  async ({ lat, lon }: Coordinates, { rejectWithValue }) => {
    try {
      return await ForecastService.getForecastByLatLon(lat, lon)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

/**
 * Async thunk action to get forecast data by city name.
 *
 * @param {CityPayload} { city } - Object containing the city name.
 * @param {Object} { rejectWithValue } - The callback to reject the promise with a value.
 * @returns {Promise} A promise that resolves to the forecast data or rejects with an error.
 */
export const getForecastByCity = createAsyncThunk(
  "forecast/getForecastByCity",
  async ({ city }: CityPayload, { rejectWithValue }) => {
    try {
      return await ForecastService.getForecastByCity(city)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
