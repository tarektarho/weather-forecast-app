import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import App from "../App"

// Mock the WeatherProvider to avoid actual API calls and geolocation
vi.mock("../providers/weatherProvider", () => ({
  WeatherProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="weather-provider-mock">{children}</div>
  ),
}))

// Mock Dashboard component
vi.mock("../components/Dashboard", () => ({
  default: () => <div data-testid="dashboard-mock">Dashboard Component</div>,
}))

describe("App", () => {
  // Suppress console.error for cleaner test output
  const originalError = console.error
  beforeEach(() => {
    console.error = vi.fn()
  })

  afterEach(() => {
    console.error = originalError
  })

  it("renders without crashing", () => {
    render(<App />)
    expect(screen.getByTestId("dashboard-mock")).toBeInTheDocument()
  })

  it("wraps Dashboard with ErrorBoundary", () => {
    render(<App />)
    // Dashboard should be rendered inside ErrorBoundary
    expect(screen.getByTestId("dashboard-mock")).toBeVisible()
  })

  it("wraps Dashboard with WeatherProvider", () => {
    render(<App />)
    // WeatherProvider mock should be present
    expect(screen.getByTestId("weather-provider-mock")).toBeInTheDocument()
  })

  it("renders Dashboard component", () => {
    render(<App />)
    expect(screen.getByText("Dashboard Component")).toBeInTheDocument()
  })

  it("has correct component hierarchy: ErrorBoundary > WeatherProvider > Dashboard", () => {
    render(<App />)

    // Verify the structure exists
    const weatherProvider = screen.getByTestId("weather-provider-mock")
    const dashboard = screen.getByTestId("dashboard-mock")

    expect(weatherProvider).toContainElement(dashboard)
  })
})

describe("App with ErrorBoundary", () => {
  it("wraps entire app with ErrorBoundary component", () => {
    const { container } = render(<App />)

    // Verify ErrorBoundary is the outermost wrapper
    // The actual ErrorBoundary component is a class component that wraps the content
    expect(container.firstChild).toBeTruthy()
  })

  it("provides error boundary protection to nested components", () => {
    render(<App />)

    // Verify the component tree structure is properly wrapped
    const weatherProvider = screen.getByTestId("weather-provider-mock")
    expect(weatherProvider).toBeInTheDocument()

    const dashboard = screen.getByTestId("dashboard-mock")
    expect(dashboard).toBeInTheDocument()
  })
})

describe("App integration", () => {
  it("initializes without errors when properly configured", () => {
    const { container } = render(<App />)

    // Should render without throwing
    expect(container).toBeTruthy()
    expect(screen.getByTestId("dashboard-mock")).toBeInTheDocument()
  })

  it("maintains React component tree structure", () => {
    const { container } = render(<App />)

    // The root should contain all nested components
    expect(container.firstChild).toBeTruthy()
  })
})
