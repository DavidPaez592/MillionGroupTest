import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../ThemeToggle";

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.setAttribute("data-theme", "");
  });

  test("renders with default theme as light", () => {
    render(<ThemeToggle />);

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(screen.getByRole("button", { name: /cambiar a tema oscuro/i })).toBeInTheDocument();
  });

  test("applies saved theme from localStorage", () => {
    localStorage.setItem("ml-theme", "black");
    render(<ThemeToggle />);

    expect(document.documentElement.getAttribute("data-theme")).toBe("black");
    expect(screen.getByRole("button", { name: /cambiar a tema claro/i })).toBeInTheDocument();
  });

  test("toggles theme on button click", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /cambiar a tema oscuro/i });
    fireEvent.click(button);

    expect(document.documentElement.getAttribute("data-theme")).toBe("black");
    expect(localStorage.getItem("ml-theme")).toBe("black");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("aria-label", "Cambiar a tema claro");
  });

  test("persists theme in localStorage", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /cambiar a tema oscuro/i });
    fireEvent.click(button);

    expect(localStorage.getItem("ml-theme")).toBe("black");

    fireEvent.click(button);
    expect(localStorage.getItem("ml-theme")).toBe("light");
  });
});