import { render, screen } from "@testing-library/react"
import { weatherServiceMockedResponse } from "../../../services/__test__/weather.test"
import {
  WeatherContext,
  WeatherContextValue,
} from "../../../providers/weatherContext"
import { SetStateAction } from "react"
import CurrentWidget from "../CurrentWidget"

interface WeatherContextMockedValue extends WeatherContextValue {}
const weatherContextMockedData = {
  weatherData: {
    loading: true,
    data: {},
  },
  city: "",
  setCity: (value: SetStateAction<string>): void => {},
  searchByCity: (): void => {},
  forecastData: undefined,
  airPollutionData: undefined,
  copyShareUrl: (): void => {},
  modal: false,
  hideModal: (): void => {},
  error: undefined,
  hideError: (): void => {},
  info: undefined,
  setInfo: (value: SetStateAction<string | undefined>): void => {},
}

describe("CurrentWidget", () => {
  const contextValueMocked: WeatherContextMockedValue = weatherContextMockedData
  const renderComponent = (
    contextValue = contextValueMocked,
    propsValues: any = {},
  ) => {
    render(
      <WeatherContext.Provider value={contextValue}>
        <CurrentWidget {...propsValues} />
      </WeatherContext.Provider>,
    )
  }

  it("renders is loading if weatherData.loading is true", () => {
    renderComponent()
    const loadingComponent = screen.getByTestId("puff-svg")
    expect(loadingComponent).toBeVisible()
  })

  it("renders is loading if weatherData.data is empty", () => {
    renderComponent({
      ...weatherContextMockedData,
      weatherData: {
        loading: false,
        data: {},
      },
    })
    const loadingComponent = screen.getByTestId("puff-svg")
    expect(loadingComponent).toBeVisible()
  })

  it("renders if items present", () => {
    renderComponent({
      ...weatherContextMockedData,
      weatherData: {
        loading: false,
        data: weatherServiceMockedResponse,
      },
    })
    const title = screen.getByTestId("city-name")
    expect(title).toBeVisible()
    expect(title).toHaveTextContent("Provincie Utrecht")
  })
})
