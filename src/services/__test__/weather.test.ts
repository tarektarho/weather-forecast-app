import {
  ERROR_INVALID_CITY,
  ERROR_INVALID_LAT_LON,
} from "../../utils/constants"
import { getWeatherByLatLon, getWeatherByCity } from "../weather"
import WeatherData from "../../types/weatherTypes"

export const weatherServiceMockedResponse: WeatherData = {
  base: "stations",
  clouds: {
    all: 66,
  },
  cod: 200,
  coord: {
    lat: 52,
    lon: 5.25,
  },
  dt: 1691658720,
  id: 2745909,
  main: {
    feels_like: 292.13,
    humidity: 69,
    pressure: 1021,
    temp: 292.35,
    temp_max: 293.75,
    temp_min: 291.16,
  },
  name: "Provincie Utrecht",
  sys: {
    country: "NL",
    id: 2011892,
    sunrise: 1691640861,
    sunset: 1691694876,
    type: 2,
  },
  timezone: 7200,
  visibility: 10000,
  weather: [
    {
      description: "broken clouds",
      icon: "04d",
      id: 803,
      main: "Clouds",
    },
  ] as any,
  wind: {
    deg: 219,
    gust: 1.34,
    speed: 1.34,
  },
}

describe("forecast service", () => {
  const latitude = 25.9445
  const longitude = -80.1747
  const city = "Utrecht"
  const invalidCity = "Invalid City"

  const weatherApiCityInvalidMockedResponse = {
    cod: "404",
    message: "city not found",
  }

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test("should throw an error when city is not found", async () => {
    await expect(() => getWeatherByCity("")).rejects.toThrowError(
      ERROR_INVALID_CITY,
    )
  })

  it("returns an error if invalid city", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify(weatherApiCityInvalidMockedResponse),
    )
    const weatherApiResponse = await getWeatherByCity(invalidCity)
    expect(weatherApiResponse).toEqual(weatherApiCityInvalidMockedResponse)
  })

  test("should throw an error for invalid lon & lat", async () => {
    await expect(() => getWeatherByLatLon(0, 0)).rejects.toThrowError(
      ERROR_INVALID_LAT_LON,
    )
  })

  test("should return weather data based on city name", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(weatherServiceMockedResponse))
    const response = await getWeatherByCity(city)
    expect(response).toEqual(weatherServiceMockedResponse)
  })
  test("should return weather data based on lon & lat", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(weatherServiceMockedResponse))
    const response = await getWeatherByLatLon(latitude, longitude)
    expect(response).toEqual(weatherServiceMockedResponse)
  })
})
