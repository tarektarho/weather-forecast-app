import { render, screen } from "@testing-library/react"
import AdditionalWidgetSkeleton from "../AdditionalWidgetSkeleton"

describe("AdditionalWidgetSkeleton", () => {
  it("renders the AdditionalWidgetSkeleton component with the correct structure", () => {
    render(<AdditionalWidgetSkeleton />)

    // Verify that the component contains elements with specific class names
    expect(screen.getAllByTestId("skeleton-test-id")[0]).toHaveClass(
      "skeleton long-title",
    )

    // Verify the structure of the component
    const title = screen.getAllByTestId("skeleton-test-id")[0]
    const weatherExtra = screen.getAllByTestId("skeleton-test-id")[1]

    expect(title).toBeInTheDocument()
    expect(weatherExtra).toBeInTheDocument()
  })
})
