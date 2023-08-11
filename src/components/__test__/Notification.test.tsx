import { fireEvent, render, screen, act } from "@testing-library/react"
import Notification from "../Notification"
import { store } from "../../store/store"
import { Provider } from "react-redux"
import { WeatherProvider } from "../../providers/weatherProvider"
import * as WeatherService from "../../services/weather"
import * as ForecastService from "../../services/forecast"
import * as AirPollutionService from "../../services/airPollution"
import * as Utils from "../../utils/index"
import Dashboard from "../Dashboard"
import { weatherServiceMockedResponse } from "../../services/__test__/weather.test"
import { forecastServiceMockedResponse } from "../../services/__test__/forecast.test"
import { fetchAirPolutionMockedResponse } from "../../services/__test__/airPollution.test"
import { WeatherProviderProps } from "./Dashboard.test"
import AirPollutionData from "../../types/airPollution"

describe("Notification", () => {
  const wrapper: React.FC<WeatherProviderProps> = ({ children }) => {
    return (
      <Provider store={store}>
        <WeatherProvider>{children}</WeatherProvider>
      </Provider>
    )
  }

  it("renders error notification", () => {
    render(
      <Notification
        message="city not found"
        hideNotification={() => {}}
        type="error"
      />,
    )
    const div = screen.getByTestId("notification")
    const icon = screen.getByTestId("error-icon")

    expect(div).toBeVisible()
    expect(div).toHaveClass("error")
    expect(div.textContent).toEqual("city not found")
    expect(icon).toBeVisible()
  })

  it("renders info notification", () => {
    render(
      <Notification
        message="URL was copied to clipboard"
        hideNotification={() => {}}
        type="info"
      />,
    )

    const div = screen.getByTestId("notification")

    expect(div).toBeVisible()
    expect(div).toHaveClass("info")
    expect(div.textContent).toEqual("URL was copied to clipboard")
  })

  it("close error notification", async () => {
    vi.spyOn(Utils, "getLocalStorageItem").mockImplementation(() => {
      return { lat: 100, lon: 100 }
    })

    vi.spyOn(Utils, "getBrowserGeoPosition").mockImplementation(() => {
      return Promise.resolve({ latitude: 100, longitude: 100 })
    })

    vi.spyOn(WeatherService, "getWeatherByLatLon").mockImplementation(() => {
      return Promise.resolve({ ...weatherServiceMockedResponse }) as any
    })

    vi.spyOn(AirPollutionService, "getAirPollutionByLatLon").mockImplementation(
      () => {
        return Promise.resolve({
          ...fetchAirPolutionMockedResponse,
        }) as any
      },
    )

    vi.spyOn(ForecastService, "getForecastByLatLon").mockImplementation(() => {
      return Promise.resolve({ ...forecastServiceMockedResponse }) as any
    })

    // to search by mocks

    vi.spyOn(ForecastService, "getForecastByCity").mockImplementation(() => {
      return Promise.reject({ message: "city not found" })
    })

    vi.spyOn(WeatherService, "getWeatherByCity").mockImplementation(() => {
      return Promise.reject({ message: "city not found" })
    })

    render(<Dashboard />, { wrapper })

    const searchInput = screen.getByTestId("input-search-by-city") // input data-testid=input-search-by-city
    const searchButton = screen.getByTestId("btn-search")

    fireEvent.change(searchInput, { target: { value: "Amsterdam" } })

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await fireEvent.click(searchButton)
    })

    const div = screen.getByTestId("notification")
    expect(div.textContent).toEqual("city not found")
    const closeIcon = screen.getByTestId("close-icon")

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await fireEvent.click(closeIcon)
    })

    expect(div).not.toBeVisible()
  })
})
