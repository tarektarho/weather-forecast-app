import React, { useCallback, useEffect } from "react"
import { useWeather } from "../providers/weatherContext"

const Search: React.FC = () => {
  // Destructuring properties from the weather context
  const { city, setCity, searchByCity } = useWeather()

  // Defining the keydown event handler using useCallback for better performance
  const handleKeyboard = useCallback(
    (event: KeyboardEvent) => {
      if (event.key.toLocaleLowerCase() === "enter") {
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
  }, [handleKeyboard])

  return (
    <div className="search">
      <input
        data-testid="input-search-by-city"
        type="text"
        placeholder="Search by city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={searchByCity} data-testid="btn-search">
        Search
      </button>
    </div>
  )
}

export default Search
