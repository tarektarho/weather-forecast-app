import { render, screen, waitFor } from "@testing-library/react"
import { weatherServiceMockedResponse } from "../../../services/__test__/weather.test"
import {
  WeatherContext,
  WeatherContextValue,
} from "../../../providers/weatherContext"
import CurrentWidget from "../CurrentWidget"
import { weatherContextMockedData } from "./testUtils"
import { SetStateAction } from "react"

interface WeatherContextMockedValue extends WeatherContextValue {}

describe("CurrentWidget", () => {
  const contextValueMocked: WeatherContextMockedValue = {
    ...weatherContextMockedData,
    setCity: vi.fn(),
    setInfo: vi.fn(),
    setError: vi.fn(),
  }
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
    const skeletonComponent = screen.getByRole("current-widget-skeleton")
    expect(skeletonComponent).toBeVisible()
  })

  it("renders is loading if weatherData.data is empty", async () => {
    renderComponent({
      ...weatherContextMockedData,
      weatherData: {
        loading: false,
        data: {},
      },
      setCity: function (value: SetStateAction<string>): void {
        throw new Error("Function not implemented." + value)
      },
      setInfo: function (value: SetStateAction<string | undefined>): void {
        throw new Error("Function not implemented." + value)
      },
      setError: function (value: SetStateAction<string | undefined>): void {
        throw new Error("Function not implemented." + value)
      },
    })
    const skeletonComponent = screen.getByRole("current-widget-skeleton")
    await waitFor(() => expect(skeletonComponent).toBeVisible())
  })

  it("renders if items present", () => {
    renderComponent({
      ...weatherContextMockedData,
      weatherData: {
        loading: false,
        data: weatherServiceMockedResponse,
      },
      setCity: function (value: SetStateAction<string>): void {
        throw new Error("Function not implemented." + value)
      },
      setInfo: function (value: SetStateAction<string | undefined>): void {
        throw new Error("Function not implemented." + value)
      },
      setError: function (value: SetStateAction<string | undefined>): void {
        throw new Error("Function not implemented." + value)
      },
    })
    const title = screen.getByTestId("city-name")
    expect(title).toBeVisible()
    expect(title).toHaveTextContent("Provincie Utrecht")
  })
})
