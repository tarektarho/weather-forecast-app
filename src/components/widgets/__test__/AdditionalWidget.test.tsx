import { render, screen } from "@testing-library/react"
import { weatherServiceMockedResponse } from "../../../services/__test__/weather.test"
import {
  WeatherContext,
  WeatherContextValue,
} from "../../../providers/weatherContext"
import { getHour } from "../../../utils/index"
import AdditionalWidget from "../AdditionalWidget"
import { SetStateAction } from "react"

interface WeatherContextMockedValue extends WeatherContextValue {}
const WeatherContextMockedData = {
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
  setError: (value: SetStateAction<string | boolean | undefined>): void => {},
}

describe("AdditionalWidget", () => {
  const contextValueMocked: WeatherContextMockedValue = WeatherContextMockedData
  const renderComponent = (
    contextValue = contextValueMocked,
    propsValues: any = {},
  ) => {
    render(
      <WeatherContext.Provider value={contextValue}>
        <AdditionalWidget {...propsValues} />
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
      ...WeatherContextMockedData,
      weatherData: {
        loading: false,
        data: weatherServiceMockedResponse,
      },
    })
    const sunrise = screen.getByTestId("sunrise")
    const sunset = screen.getByTestId("sunset")

    expect(sunrise).toBeVisible()
    expect(sunrise).toHaveTextContent(getHour(1691640861))

    expect(sunset).toBeVisible()
    expect(sunset).toHaveTextContent(getHour(1691694876))
  })
})
