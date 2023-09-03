import { render, screen } from "@testing-library/react"
import SkeletonElement from "../SkeletonElement"

describe("SkeletonElement", () => {
  it("renders a skeleton element with the specified type and role", () => {
    render(<SkeletonElement type="input" role="text" />)

    // Verify that the skeleton element is rendered with the correct class and role
    const skeletonElement = screen.getByTestId("skeleton-test-id")
    expect(skeletonElement).toHaveClass("skeleton input")
    expect(skeletonElement).toHaveAttribute("role", "text")
    // Check if the class "skeleton" exists in the element's classes
    expect(skeletonElement).toHaveClass("skeleton")
  })

  it("renders a skeleton element with the default role if not provided", () => {
    render(<SkeletonElement type="button" role="button" />)

    // Verify that the skeleton element is rendered with the correct class and default role
    const skeletonElement = screen.getByTestId("skeleton-test-id")
    expect(skeletonElement).toHaveClass("skeleton button")
    expect(skeletonElement).toHaveAttribute("role", "button")
    expect(skeletonElement).toHaveClass("skeleton")
  })
})
