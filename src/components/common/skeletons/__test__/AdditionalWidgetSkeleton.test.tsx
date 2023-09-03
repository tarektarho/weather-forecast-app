import { render, screen } from "@testing-library/react"
import AdditionalWidgetSkeleton from "../AdditionalWidgetSkeleton"

describe("AdditionalWidgetSkeleton", () => {
  it("renders the AdditionalWidgetSkeleton component with the correct structure", () => {
    render(<AdditionalWidgetSkeleton />)

    // Verify that the component contains elements with specific class names
    expect(screen.getAllByTestId("skeleton-test-id")[0]).toHaveClass(
      "skeleton long-title",
    )
    expect(screen.getAllByTestId("skeleton-test-id")[1]).toHaveClass(
      "skeleton icon-small",
    )
    expect(screen.getAllByTestId("skeleton-test-id")[2]).toHaveClass(
      "skeleton long-text",
    )

    // Verify the structure of the component
    const sunriseInfoContainer = screen.getAllByTestId("skeleton-test-id")[3]
    const sunsetInfoContainer = screen.getAllByTestId("skeleton-test-id")[4]

    expect(sunriseInfoContainer).toBeInTheDocument()
    expect(sunsetInfoContainer).toBeInTheDocument()
  })
})
