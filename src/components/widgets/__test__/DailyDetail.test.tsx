import { render, screen } from "@testing-library/react"
import DailyDetail from "../DailyDetail"
import ForecastData from "../../../types/forecast"

interface ForecastMockedData extends ForecastData {
  ForecastItem: {
    dt: number
    clouds: { all: number }
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      sea_level: number
      grnd_level: number
      humidity: number
      temp_kf: number
    }
    weather: [{ id: number; main: string; description: string; icon: string }]
    wind: { speed: number; deg: number; gust: number }
    sys: { pod: string }
  }
}

describe("DailyDetail", () => {
  const description = "My description"

  const dataMock: ForecastMockedData["list"] = {
    dt: 1666048008,
    clouds: { all: 0 },
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      sea_level: 0,
      grnd_level: 0,
      humidity: 0,
      temp_kf: 0,
    },
    weather: [{ icon: "icon", description, main: "", id: 0 }],
    wind: { speed: 0, deg: 0, gust: 0 },
    visibility: 0,
    pop: 0,
    sys: { pod: "" },
    dt_txt: "",
  }

  it("renders with data", () => {
    render(<DailyDetail data={dataMock} />)

    const div = screen.getByTestId("daily-item")
    expect(div).toBeVisible()

    const pDescription = screen.getByTestId("daily-description")
    expect(pDescription).toBeVisible()
    expect(pDescription.textContent).toEqual(description)
  })

  it("renders null if no data is passed to the component in the props", () => {
    const { container } = render(<DailyDetail data={null} />)
    expect(container.innerHTML).toBe("")
  })
})
