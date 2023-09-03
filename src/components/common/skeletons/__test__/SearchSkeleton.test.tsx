import { render, screen } from "@testing-library/react"
import SearchSkeleton from "../SearchSkeleton"

describe("SearchSkeleton", () => {
  it("renders the SearchSkeleton component with input and button skeletons", () => {
    render(<SearchSkeleton />)

    // Verify that the SearchSkeleton component renders input and button skeletons
    const inputSkeleton = screen.getByRole("search")
    const buttonSkeleton = screen.getByRole("button")

    expect(inputSkeleton).toBeInTheDocument()
    expect(buttonSkeleton).toBeInTheDocument()

    // Check the role attributes of the skeletons
    expect(inputSkeleton).toHaveAttribute("role", "search")
    expect(buttonSkeleton).toHaveAttribute("role", "button")
  })
})
