import * as WeatherService from "../../services/weather"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Coordinates, CityPayload } from "./types"
import WeatherData from "../../types/weather"

/**
 * Async thunk action to get weather data by latitude and longitude.
 *
 * @param {Coordinates} { lat, lon } - Object containing latitude and longitude.
 * @param {Object} { rejectWithValue } - The callback to reject the promise with a value.
 * @returns {Promise} A promise that resolves to the weather data or rejects with an error.
 */
export const getWeatherByLatLon = createAsyncThunk(
  "weather/getWeatherByLatLon",
  async ({ lat, lon }: Coordinates, { rejectWithValue }) => {
    try {
      return await WeatherService.getWeatherByLatLon(lat, lon)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

/**
 * Async thunk action to get weather data by city name.
 *
 * @param {CityPayload} { city } - Object containing the city name.
 * @param {Object} { rejectWithValue } - The callback to reject the promise with a value.
 * @returns {Promise} A promise that resolves to the weather data or rejects with an error.
 */
export const getWeatherByCity = createAsyncThunk<WeatherData, CityPayload>(
  "weather/getWeatherByCity",
  async ({ city }: CityPayload, { rejectWithValue }) => {
    try {
      return await WeatherService.getWeatherByCity(city)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
