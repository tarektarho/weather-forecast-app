import { configureStore } from "@reduxjs/toolkit"
import { weatherSlice } from "../weather"
import * as WeatherService from "../../../services/weather"
import { getWeatherByLatLon, getWeatherByCity } from "../../thunks/weather"
import { weatherServiceMockedResponse } from "../../../services/__test__/weather.test"

describe("weatherReducer", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should get data fulfilled with lat and lon", async () => {
    vi.spyOn(WeatherService, "getWeatherByLatLon").mockResolvedValueOnce({
      ...weatherServiceMockedResponse,
    })
    const store = configureStore({ reducer: weatherSlice.reducer })
    await store.dispatch(getWeatherByLatLon({ lat: 1, lon: 1 }))
    expect(store.getState()).toEqual({
      loading: false,
      error: undefined,
      data: { ...weatherServiceMockedResponse },
    })
  })

  it("should get the error when rejected with lat and lon", async () => {
    vi.spyOn(WeatherService, "getWeatherByLatLon").mockRejectedValueOnce({
      message: "my error",
    })
    const store = configureStore({ reducer: weatherSlice.reducer })
    await store.dispatch(getWeatherByLatLon({ lat: 1, lon: 1 }))
    expect(WeatherService.getWeatherByLatLon).toHaveBeenCalledWith(1, 1)
    expect(store.getState()).toEqual({
      loading: false,
      error: "my error",
      data: {},
    })
  })
})

it("should post data fulfilled with city", async () => {
  vi.spyOn(WeatherService, "getWeatherByCity").mockResolvedValueOnce({
    ...weatherServiceMockedResponse,
  })
  const store = configureStore({ reducer: weatherSlice.reducer })
  await store.dispatch(getWeatherByCity({ city: "Miami" }))
  expect(store.getState()).toEqual({
    loading: false,
    error: undefined,
    data: { ...weatherServiceMockedResponse },
  })
})

it("should get the error when rejected with city", async () => {
  vi.spyOn(WeatherService, "getWeatherByCity").mockRejectedValueOnce({
    message: "my error",
  })
  const store = configureStore({ reducer: weatherSlice.reducer })
  await store.dispatch(getWeatherByCity({ city: "InvalidCityName" }))
  expect(WeatherService.getWeatherByCity).toHaveBeenCalledWith(
    "InvalidCityName",
  )
  expect(store.getState()).toEqual({
    loading: false,
    error: "my error",
    data: {},
  })
})
