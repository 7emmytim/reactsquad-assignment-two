import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SearchResultComponent } from "./search-results-component";

describe("SearchResultComponent", () => {
  const mockProducts = [
    { id: 1, title: "Product A" },
    { id: 2, title: "Product B" },
  ] as Product[];

  it("shows prompt when query is empty", () => {
    render(<SearchResultComponent products={[]} query="" />);
    expect(
      screen.getByText("Please input search to show products ):")
    ).toBeInTheDocument();
  });

  it("shows error message when error exists", () => {
    render(
      <SearchResultComponent
        products={[]}
        query="phone"
        error="Network error"
      />
    );
    expect(screen.getByText("Error: Network error")).toBeInTheDocument();
  });

  it("shows empty result message when no products found", () => {
    render(<SearchResultComponent products={[]} query="nonexistent" />);
    expect(
      screen.getByText("No results found for “nonexistent”")
    ).toBeInTheDocument();
  });

  it("renders product titles when products exist", () => {
    render(<SearchResultComponent products={mockProducts} query="mock" />);
    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();
  });
});
