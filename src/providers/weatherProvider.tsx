import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { WeatherContext } from "./weatherContext"
import * as WeatherThunkActions from "../features/thunks/weather"
import * as ForecastThunkActions from "../features/thunks/forecast"
import * as AirPollutionThunkActions from "../features/thunks/airPollution"
import * as WeatherActions from "../features/reducers/weather"
import * as Constants from "../utils/constants"
import * as Utils from "../utils/index"
import WeatherData from "../types/weatherTypes"
import { Coordinates } from "../features/thunks/types"
import AirPollutionData from "../types/airPollutionTypes"
import ForecastData from "../types/forecastTypes"
import { Dispatch } from "redux"

interface WeatherProviderProps {
  children: React.ReactNode
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({
  children,
}) => {
  // Redux state management
  const dispatch: Dispatch<any> = useDispatch()
  const weatherData = useSelector(
    (state: { weather: WeatherData }) => state.weather,
  )
  const forecastData = useSelector(
    (state: { forecast: ForecastData }) => state.forecast,
  )
  const airPollutionData = useSelector(
    (state: { airPollution: AirPollutionData }) => state.airPollution,
  )

  // Component states
  const [error, setError] = useState<string | undefined>(undefined)
  const [info, setInfo] = useState<string | undefined>(undefined)
  const [modal, setModal] = useState<boolean>(true)
  const [city, setCity] = useState<string>("")
  const [lat, setLat] = useState<number | undefined>(undefined)
  const [lon, setLon] = useState<number | undefined>(undefined)

  // Hide welcome modal and save to local storage
  const hideModal = () => {
    setModal((prevState) => !prevState)
    Utils.setLocalStorageItem(Constants.LOCAL_STORAGE_KEY_WELCOME_MODAL, true)
  }

  // Hide error notification and clear Redux error state
  const hideError = () => {
    setError(undefined)
    dispatch(WeatherActions.setError(false))
  }

  // Get user's geographic position
  const getGeoPositon = async () => {
    // Check if lat & lon are present in the URL
    if (
      Utils.getURLParam(Constants.URL_PARAM_LAT) &&
      Utils.getURLParam(Constants.URL_PARAM_LON)
    ) {
      setLat(Number(Utils.getURLParam(Constants.URL_PARAM_LAT)))
      setLon(Number(Utils.getURLParam(Constants.URL_PARAM_LON)))
      return
    }

    // Check if position is stored in local storage
    const positionLocalStorage = Utils.getLocalStorageItem(
      Constants.LOCAL_STORAGE_KEY_GPS_POSITION,
    )
    if (positionLocalStorage !== null) {
      setLat(positionLocalStorage.lat)
      setLon(positionLocalStorage.lon)
    }

    try {
      const { latitude, longitude } = await Utils.getBrowserGeoPosition()
      if (!positionLocalStorage) {
        setLat(latitude)
        setLon(longitude)
        Utils.savePosition(latitude, longitude)
      }
    } catch (e) {
      setError(String(e))
    }
  }

  useEffect(() => {
    getGeoPositon()
  }, [])

  // Fetch data on lat and lon change
  useEffect(() => {
    if (lat !== undefined && lon !== undefined) {
      const coordinates: Coordinates = { lat, lon }
      dispatch(WeatherThunkActions.getWeatherByLatLon(coordinates))
      dispatch(AirPollutionThunkActions.getAirPollutionByLatLon(coordinates))
      dispatch(ForecastThunkActions.getForecastByLatLon(coordinates))
    }
  }, [dispatch, lat, lon])

  // Search weather and forecast data by city name
  const searchByCity = () => {
    if (city && city !== "") {
      dispatch(WeatherThunkActions.getWeatherByCity({ city }))
      dispatch(ForecastThunkActions.getForecastByCity({ city }))
    }
  }

  // Copy and share URL
  const copyShareUrl = () => {
    Utils.placeLinkIntoClipBoard().then(() => {
      setInfo(Constants.MESSAGE_URL_COPIED)
    })
  }

  // Context value for WeatherContext
  const contextValue = {
    dispatch,
    error,
    hideError,
    city,
    setCity,
    lat,
    setLat,
    lon,
    setLon,
    modal,
    hideModal,
    info,
    setInfo,
    weatherData,
    airPollutionData,
    forecastData,
    searchByCity,
    copyShareUrl,
    setError,
  }

  // Provide context to children components
  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  )
}
