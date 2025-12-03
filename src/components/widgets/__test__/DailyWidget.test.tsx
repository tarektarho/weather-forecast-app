import { render, screen, waitFor } from "@testing-library/react"
import { forecastServiceMockedResponse } from "../../../services/__test__/forecast.test"
import {
  WeatherContext,
  WeatherContextValue,
} from "../../../providers/weatherContext"
import DailyWidget from "../DailyWidget"
import { weatherContextMockedData } from "./testUtils"

interface WeatherContextMockedValue extends WeatherContextValue {}

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
    const skeletonComponent = screen.getByRole("daily-widget-skeleton")
    expect(skeletonComponent).toBeVisible()
  })

  it("renders is loading if forecast.data is empty", async () => {
    renderComponent({
      ...weatherContextMockedData,
      forecastData: {
        loading: true,
        data: {},
      },
    })
    await waitFor(() => {
      const skeletonComponent = screen.getByRole("daily-widget-skeleton")
      expect(skeletonComponent).toBeVisible()
    })
  })

  it("renders if items present", () => {
    renderComponent({
      ...weatherContextMockedData,
      forecastData: {
        loading: false,
        data: forecastServiceMockedResponse,
      },
    })
    const title = screen.getByTestId("daily-widget-title")
    expect(title).toBeVisible()
    expect(title).toHaveTextContent("Forecast next 5 days")
  })
})
