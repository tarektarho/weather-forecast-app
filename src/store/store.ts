import { configureStore } from "@reduxjs/toolkit"
import weatherReducer from "../features/reducers/weather"
import forecastReducer from "../features/reducers/forecast"
import airPollutionReducer from "../features/reducers/airPollution"

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    forecast: forecastReducer,
    airPollution: airPollutionReducer,
  },
})
