import * as Utils from "../index"

describe("Utils", () => {
  // Thu Aug 10 2023 22:43:42 GMT+0200 (Central European Summer Time)
  const unix_date = 1691700222

  afterAll(() => {
    localStorage.clear()
  })

  describe("getDay", () => {
    it("returns the day of the month from a unix timestamp datetime", () => {
      const result = Utils.getDay(unix_date)
      expect(result).toEqual(10)
    })
  })

  describe("getHour", () => {
    it("returns the hour of a date-time unix timestamp datetime value", () => {
      const result = Utils.getHour(unix_date)
      expect(result).toEqual("22:43:42")
    })
  })

  describe("getMonth", () => {
    it("returns the month from the unix timestamp value", () => {
      const result = Utils.getMonth(unix_date)
      expect(result).toEqual("Aug")
    })
  })

  describe("convertKelvinToFahrenheit", () => {
    it("returns a value converted", () => {
      const result = Utils.convertKelvinToFahrenheit(140)
      expect(result).toEqual(-207)
    })
  })

  describe("convertKelvinToCelsius", () => {
    it("returns a value converted", () => {
      const result = Utils.convertKelvinToCelsius(293.89)
      expect(result).toEqual(20)
    })
  })

  describe("getWeatherIcon", () => {
    it("returns an icon", () => {
      const iconName = "my_icon"
      const expected = `https://openweathermap.org/img/wn/${iconName}@2x.png`
      expect(Utils.getWeatherIcon(iconName)).toEqual(expected)
    })
  })

  describe("savePosition", () => {
    it("stores the lat and lon", () => {
      Utils.savePosition(100, 300)

      const lStorageResult = JSON.parse(
        localStorage.getItem("gps_position") || "",
      )
      expect(lStorageResult.lat).toEqual(100)
      expect(lStorageResult.lon).toEqual(300)
    })

    it("updates the existing localStorage lat and lon", () => {
      Utils.savePosition(100, 300)

      let lStorageResult = JSON.parse(
        localStorage.getItem("gps_position") || "",
      )
      expect(lStorageResult.lat).toEqual(100)
      expect(lStorageResult.lon).toEqual(300)

      Utils.savePosition(550, 300)
      lStorageResult = JSON.parse(localStorage.getItem("gps_position") || "")
      expect(lStorageResult.lat).toEqual(550)
      expect(lStorageResult.lon).toEqual(300)
    })
  })

  describe("setLocalStorageItem", () => {
    it("returns data from the localStorage", () => {
      Utils.setLocalStorageItem("user", "anagonm@gmail.com")
      let result = JSON.parse(localStorage.getItem("user") || "")
      expect(result).toEqual("anagonm@gmail.com")
    })
  })

  describe("getLocalStorageItem", () => {
    it("returns data from the localStorage", () => {
      Utils.setLocalStorageItem("name", "weatherapp")
      const result = Utils.getLocalStorageItem("name")
      expect(result).toEqual("weatherapp")
    })

    it("returns null if the value does not exists", () => {
      const result = Utils.getLocalStorageItem("my-key-value")
      expect(result).toEqual(null)
    })
  })

  describe("resetApp", () => {
    it("resets the data", () => {
      Utils.setLocalStorageItem("gps_position", { lat: 1, lon: 1 })
      let result = Utils.getLocalStorageItem("gps_position")
      expect(result).toEqual({ lat: 1, lon: 1 })

      Utils.resetApp()

      result = Utils.getLocalStorageItem("gps_position")
      expect(result).toEqual(null)
    })
  })
})
