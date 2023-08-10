import React, { useCallback, useEffect } from "react"
import { useWeather } from "../providers/weatherContext"

const Search: React.FC = () => {
  const { city, setCity, searchByCity } = useWeather()

  // Using useCallback to prevent redefinition of the function on each render
  const handleKeyboard = useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        searchByCity()
      }
    },
    [searchByCity],
  )

  // Attaching and detaching the event listener using useEffect
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard)

    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }
  }, [handleKeyboard, setCity, searchByCity, city])
  return (
    <div className="search">
      <input
        data-testid="input-search-by-city"
        type="text"
        placeholder="Search by city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      ></input>
      <button
        onClick={searchByCity}
        className="my-first-step"
        data-testid="btn-search"
      >
        Search
      </button>
    </div>
  )
}

export default Search
