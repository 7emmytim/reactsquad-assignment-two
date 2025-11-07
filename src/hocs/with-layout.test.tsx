import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { withLayout } from "./with-layout";

describe("withLayout HOC", () => {
  const DummyComponent = ({ text }: { text: string }) => <div>{text}</div>;

  const Wrapped = withLayout(DummyComponent);

  it("renders navigation links", () => {
    render(<Wrapped text="Hello world" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Experiments")).toBeInTheDocument();
  });

  it("renders the wrapped component inside the layout", () => {
    render(<Wrapped text="Wrapped content" />);

    expect(screen.getByText("Wrapped content")).toBeInTheDocument();
  });

  it("passes props to the wrapped component", () => {
    render(<Wrapped text="Prop test" />);

    expect(screen.getByText("Prop test")).toBeInTheDocument();
  });

  it("renders correct hrefs for navigation links", () => {
    render(<Wrapped text="nav test" />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Search" })).toHaveAttribute(
      "href",
      "/search"
    );
    expect(screen.getByRole("link", { name: "Experiments" })).toHaveAttribute(
      "href",
      "/experiments/pricing"
    );
  });
});
