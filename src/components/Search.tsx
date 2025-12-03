import React, {
  useCallback,
  useEffect,
  useTransition,
  useActionState,
} from "react"
import { useWeather } from "../providers/weatherContext"

const Search: React.FC = () => {
  // Destructuring properties from the weather context
  const { city, setCity, searchByCity } = useWeather()

  // React 19: useTransition for better UX with pending states
  const [isPending, startTransition] = useTransition()

  // React 19: useActionState for form actions (async state management)
  const searchAction = useCallback(
    async (prevState: { success: boolean }, formData: FormData) => {
      const cityValue = formData.get("city") as string
      if (cityValue && cityValue.trim() !== "") {
        setCity(cityValue)
        startTransition(() => {
          searchByCity()
        })
      }
      return { success: true }
    },
    [searchByCity, setCity],
  )

  const [, formAction, isFormPending] = useActionState(searchAction, {
    success: false,
  })

  // Wrap search action in transition for better UX (for button click)
  const handleSearch = useCallback(() => {
    startTransition(() => {
      searchByCity()
    })
  }, [searchByCity])

  // Defining the keydown event handler using useCallback for better performance
  const handleKeyboard = useCallback(
    (event: KeyboardEvent) => {
      if (event.key?.toLocaleLowerCase() === "enter") {
        handleSearch()
      }
    },
    [handleSearch],
  )

  // Attaching and detaching the event listener using useEffect
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard)
    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }
  }, [handleKeyboard])

  const isLoading = isPending || isFormPending

  return (
    <form className="search" action={formAction}>
      <input
        data-testid="input-search-by-city"
        type="text"
        name="city"
        placeholder="Search by city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="button"
        onClick={handleSearch}
        data-testid="btn-search"
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  )
}

export default Search
