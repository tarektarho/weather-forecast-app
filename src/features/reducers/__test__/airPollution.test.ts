import { configureStore } from "@reduxjs/toolkit"
import { airPollutionSlice } from "../airPollution"
import * as AirPollutionAPI from "../../../services/airPollution"
import { getAirPollutionByLatLon } from "../../thunks/airPollution"

describe("airPollutionReducer", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should post data fulfilled", async () => {
    vi.spyOn(AirPollutionAPI, "getAirPollutionByLatLon").mockResolvedValueOnce({
      sample: "info",
    })
    const store = configureStore({ reducer: airPollutionSlice.reducer })
    await store.dispatch(getAirPollutionByLatLon({ lat: 1, lon: 1 }))
    expect(store.getState()).toEqual({
      loading: false,
      error: "",
      data: { sample: "info" },
    })
  })

  it("should get the error when rejected", async () => {
    vi.spyOn(AirPollutionAPI, "getAirPollutionByLatLon").mockRejectedValueOnce({
      message: "my error",
    })
    const store = configureStore({ reducer: airPollutionSlice.reducer })
    await store.dispatch(getAirPollutionByLatLon({ lat: 1, lon: 1 }))
    expect(AirPollutionAPI.getAirPollutionByLatLon).toHaveBeenCalledWith(1, 1)
    expect(store.getState()).toEqual({
      loading: false,
      error: "my error",
      data: {},
    })
  })
})