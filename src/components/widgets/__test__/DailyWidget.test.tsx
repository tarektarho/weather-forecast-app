import { render, screen } from "@testing-library/react"
import { weatherServiceMockedResponse } from "../../../services/__test__/weather.test"
import {
  WeatherContext,
  WeatherContextValue,
} from "../../../providers/weatherContext"
import DailyWidget from "../DailyWidget"
import { SetStateAction } from "react"

interface WeatherContextMockedValue extends WeatherContextValue {}
const weatherContextMockedData = {
  forecastData: {
    loading: true,
    data: {},
  },
  city: "",
  setCity: (value: SetStateAction<string>): void => {},
  searchByCity: (): void => {},
  weatherData: undefined,
  airPollutionData: undefined,
  copyShareUrl: (): void => {},
  modal: false,
  hideModal: (): void => {},
  error: undefined,
  hideError: (): void => {},
  info: undefined,
  setInfo: (value: SetStateAction<string | undefined>): void => {},
}

describe("DailyWidget", () => {
  const contextValueMocked: WeatherContextMockedValue = weatherContextMockedData

  const renderComponent = (
    contextValue = contextValueMocked,
    propsValues = {},
  ) => {
    render(
      <WeatherContext.Provider value={contextValue}>
        <DailyWidget {...propsValues} />
      </WeatherContext.Provider>,
    )
  }

  it("renders is loading if forecast.loading is true", () => {
    renderComponent()
    const loadingComponent = screen.getByTestId("puff-svg")
    expect(loadingComponent).toBeVisible()
  })

  it("renders is loading if forecast.data is empty", () => {
    renderComponent({
      ...weatherContextMockedData,
      forecastData: {
        loading: true,
        data: {},
      },
    })
    const loadingComponent = screen.getByTestId("puff-svg")
    expect(loadingComponent).toBeVisible()
  })

  it("renders if items present", () => {
    renderComponent({
      ...weatherContextMockedData,
      forecastData: {
        loading: false,
        data: weatherServiceMockedResponse,
      },
    })
    const title = screen.getByTestId("daily-widget-title")
    expect(title).toBeVisible()
    expect(title).toHaveTextContent("Forecast next 7 days")
  })
})
