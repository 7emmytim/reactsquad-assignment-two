import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyComponent } from "./empty-component";

describe("EmptyComponent", () => {
  it("renders default message", () => {
    render(<EmptyComponent />);

    expect(screen.getByText("Nothing to show):")).toBeInTheDocument();
  });

  it("renders custom message", () => {
    render(<EmptyComponent message="No data here" />);

    expect(screen.getByText("No data here")).toBeInTheDocument();
  });
});
