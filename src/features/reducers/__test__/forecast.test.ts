import { configureStore } from "@reduxjs/toolkit"
import * as ForecastService from "../../../services/forecast"
import { forecastSlice } from "../forecast"
import { getForecastByLatLon, getForecastByCity } from "../../thunks/forecast"

describe("forecastReducer", () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it("should get data fulfilled with lat and lon", async () => {
    vi.spyOn(ForecastService, "getForecastByLatLon").mockResolvedValueOnce({
      sample: "info",
    })
    const store = configureStore({ reducer: forecastSlice.reducer })
    await store.dispatch(getForecastByLatLon({ lat: 1, lon: 1 }))
    expect(store.getState()).toEqual({
      loading: false,
      error: "",
      data: { sample: "info" },
    })
  })

  it("should get the error when rejected with lat and lon", async () => {
    vi.spyOn(ForecastService, "getForecastByLatLon").mockRejectedValueOnce({
      message: "my error",
    })
    const store = configureStore({ reducer: forecastSlice.reducer })
    await store.dispatch(getForecastByLatLon({ lat: 1, lon: 1 }))
    expect(store.getState()).toEqual({
      loading: false,
      error: "my error",
      data: {},
    })
  })

  it("should get data fulfilled with city", async () => {
    vi.spyOn(ForecastService, "getForecastByCity").mockResolvedValueOnce({
      sample: "info",
    })
    const store = configureStore({ reducer: forecastSlice.reducer })
    await store.dispatch(getForecastByCity({ city: "Miami" }))
    expect(store.getState()).toEqual({
      loading: false,
      error: "",
      data: { sample: "info" },
    })
  })

  it("should get the error when rejected with city", async () => {
    vi.spyOn(ForecastService, "getForecastByCity").mockRejectedValueOnce({
      message: "my error",
    })
    const store = configureStore({ reducer: forecastSlice.reducer })
    await store.dispatch(getForecastByCity({ city: "Miami" }))
    expect(store.getState()).toEqual({
      loading: false,
      error: "my error",
      data: {},
    })
  })
})
