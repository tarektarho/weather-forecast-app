import { getAirPollutionByLatLon, getAirPollutionByCity } from "../airPollution"
import {
  ERROR_INVALID_LAT_LON,
  ERROR_INVALID_CITY,
} from "../../utils/constants"

export const fetchAirPolutionMockedResponse = {
  coord: {
    lat: 52.1004,
    lon: 5.0563,
  },
  list: [
    {
      components: {
        co: 247,
        nh3: 6.33,
        no: 16.76,
        no2: 20.22,
        o3: 20.56,
        pm10: 16.76,
        pm2_5: 12.91,
        so2: 2.89,
      },
      dt: 1691654686,
      main: {
        aqi: 2,
      },
    },
  ] as any,
}

describe("airPollution service", () => {
  const latitude = 52.1004105
  const longitude = 5.0563431

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test("throws an error for when lat & lon are invalid", async () => {
    await expect(
      async () => await getAirPollutionByLatLon(0, 0),
    ).rejects.toThrowError(ERROR_INVALID_LAT_LON)
  })

  test("load airPollution data as expected", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fetchAirPolutionMockedResponse))
    const weatherServiceResponse = await getAirPollutionByLatLon(
      latitude,
      longitude,
    )
    expect(weatherServiceResponse).toEqual(fetchAirPolutionMockedResponse)
  })
  test("should throw an error when city is not found", async () => {
    await expect(() => getAirPollutionByCity("")).rejects.toThrowError(
      ERROR_INVALID_CITY,
    )
  })

  it("should throw an error for an invalid city", async () => {
    // Mock the fetchData function to return an empty array
    fetchMock.mockResponseOnce(JSON.stringify([]))

    // Call the function with an invalid city name
    await expect(getAirPollutionByCity("InvalidCity")).rejects.toThrowError(
      ERROR_INVALID_CITY,
    )
  })
})
