import { render, screen } from "@testing-library/react"
import { fetchAirPolutionMockedResponse } from "../../../services/__test__/airPollution.test"
import {
  WeatherContext,
  WeatherContextValue,
} from "../../../providers/weatherContext"
import AirPollutionWidget from "../AirPollutionWidget"
import { SetStateAction } from "react"

interface WeatherContextMockedValue extends WeatherContextValue {}
const WeatherContextMockedData = {
  airPollutionData: {
    loading: true,
  },
  city: "",
  setCity: (value: SetStateAction<string>): void => {},
  searchByCity: (): void => {},
  forecastData: undefined,
  weatherData: undefined,
  copyShareUrl: (): void => {},
  modal: false,
  hideModal: (): void => {},
  error: undefined,
  hideError: (): void => {},
  info: undefined,
  setInfo: (value: SetStateAction<string | undefined>): void => {},
}

describe("AirPollutionWidget", () => {
  const contextValueMocked: WeatherContextMockedValue = WeatherContextMockedData

  const renderComponent = (
    contextValue = contextValueMocked,
    propsValues = {},
  ) => {
    render(
      <WeatherContext.Provider value={contextValue}>
        <AirPollutionWidget {...propsValues} />
      </WeatherContext.Provider>,
    )
  }

  it("renders is loading if airPollutionData.loading is true", () => {
    renderComponent()
    const loadingComponent = screen.getByTestId("puff-svg")
    expect(loadingComponent).toBeVisible()
  })
  it("renders is loading if airPollutionData.data is empty", () => {
    renderComponent({
      ...WeatherContextMockedData,
      airPollutionData: {
        loading: false,
        data: {},
      },
    })
    const loadingComponent = screen.getByTestId("puff-svg")
    expect(loadingComponent).toBeVisible()
  })

  it("renders if items present", () => {
    renderComponent({
      ...WeatherContextMockedData,
      airPollutionData: {
        loading: false,
        data: fetchAirPolutionMockedResponse,
      },
    })
    const title = screen.getByTestId("airpollution-widget-title")
    const co = screen.getByTestId("airpollution-co")

    expect(title).toBeVisible()
    expect(title).toHaveTextContent("Your Current Air Pollution")
    expect(co).toHaveTextContent("247")
  })
})
