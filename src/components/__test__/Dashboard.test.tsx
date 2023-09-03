import React from "react"
import { Provider } from "react-redux"
import { WeatherProvider } from "../../providers/weatherProvider"
import Dashboard from "../Dashboard"

import { render, screen, fireEvent, act } from "@testing-library/react"

import { fetchAirPolutionMockedResponse } from "../../services/__test__/airPollution.test"
import { forecastServiceMockedResponse } from "../../services/__test__/forecast.test"
import { weatherServiceMockedResponse } from "../../services/__test__/weather.test"
import * as WeatherService from "../../services/weather"
import * as ForecastService from "../../services/forecast"
import * as AirPollutionService from "../../services/airPollution"
import * as Utils from "../../utils/index"
import { store } from "../../store/store"

export interface WeatherProviderProps {
  children: React.ReactNode
}
const wrapper: React.FC<WeatherProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <WeatherProvider>{children}</WeatherProvider>
    </Provider>
  )
}
describe("Dashboard", () => {
  it("hides the welcome modal after clicking continue", async () => {
    // Clearing the localStorage so the modal appear
    localStorage.clear()

    render(<Dashboard />, { wrapper })
    const modalContainer = screen.getByTestId("modal-container") // <div data-testid="modal-container">
    expect(modalContainer).toBeVisible()

    const btnHideModal = screen.getByTestId("hide-modal-btn") // <button data-testid="hide-modal-btn" onClick={() => dispatch(actionAsyncThunk)}> // await API.get
    expect(btnHideModal).toBeVisible()

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await fireEvent.click(btnHideModal)
    })

    expect(modalContainer).not.toBeVisible()
  })
})

describe("Search", () => {
  it("search by city and the new data is update in the view", async () => {
    vi.spyOn(Utils, "getLocalStorageItem").mockImplementation(() => {
      return { lat: 100, lon: 100 }
    })

    vi.spyOn(Utils, "getBrowserGeoPosition").mockImplementation(() => {
      return Promise.resolve({ latitude: 100, longitude: 100 })
    })

    vi.spyOn(WeatherService, "getWeatherByLatLon").mockImplementation(() => {
      return Promise.resolve({ ...weatherServiceMockedResponse }) as any //todo set the type
    })

    vi.spyOn(AirPollutionService, "getAirPollutionByLatLon").mockImplementation(
      () => {
        return Promise.resolve({ ...fetchAirPolutionMockedResponse }) as any
      },
    )

    vi.spyOn(ForecastService, "getForecastByLatLon").mockImplementation(() => {
      return Promise.resolve({ ...forecastServiceMockedResponse }) as any
    })

    // to search by mocks

    vi.spyOn(ForecastService, "getForecastByCity").mockImplementation(() => {
      return Promise.resolve({
        ...forecastServiceMockedResponse,
        city: {
          ...forecastServiceMockedResponse.city,
          name: "Rotterdam",
        },
      }) as any
    })

    vi.spyOn(WeatherService, "getWeatherByCity").mockImplementation(() => {
      return Promise.resolve({
        ...weatherServiceMockedResponse,
        name: "Rotterdam",
      }) as any
    })

    vi.spyOn(AirPollutionService, "getAirPollutionByCity").mockImplementation(
      () => {
        return Promise.resolve({
          ...fetchAirPolutionMockedResponse,
          name: "Rotterdam",
        }) as any
      },
    )

    render(<Dashboard />, { wrapper })

    const searchInput = screen.getByTestId("input-search-by-city") // input data-testid=input-search-by-city
    const searchButton = screen.getByTestId("btn-search")

    fireEvent.change(searchInput, { target: { value: "Rotterdam" } })

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await fireEvent.click(searchButton)
    })

    expect(ForecastService.getForecastByCity).toHaveBeenCalled()
    expect(WeatherService.getWeatherByCity).toHaveBeenCalled()

    const locationWeather = screen.getByTestId("city-name") // div
    expect(locationWeather.textContent).toEqual("Rotterdam")
  })
})
