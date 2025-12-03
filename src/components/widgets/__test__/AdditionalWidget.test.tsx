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
  forecastData: {
    loading: true,
    data: {},
  },
  airPollutionData: {
    loading: true,
    data: {},
  },
  city: "",
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  setCity: (value: SetStateAction<string>): void => {},
  searchByCity: (): void => {},
  copyShareUrl: (): void => {},
  modal: false,
  hideModal: (): void => {},
  error: undefined,
  hideError: (): void => {},
  info: undefined,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  setInfo: (value: SetStateAction<string | undefined>): void => {},
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  setError: (value: SetStateAction<string | undefined>): void => {},
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
    const skeletonComponent = screen.getAllByTestId("skeleton-test-id")[0]
    expect(skeletonComponent).toBeVisible()
  })

  it("renders is loading if airPollutionData.data is empty", () => {
    renderComponent({
      ...WeatherContextMockedData,
      weatherData: {
        loading: false,
        data: {},
      },
    })
    const skeletonComponent = screen.getAllByTestId("skeleton-test-id")[0]
    expect(skeletonComponent).toBeVisible()
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
