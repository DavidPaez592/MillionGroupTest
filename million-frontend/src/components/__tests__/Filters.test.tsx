import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../Filters";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

test("muestra un mensaje de error si los campos requeridos están vacíos", () => {
  render(<Filters />);

  const formElement = screen.getByRole("form", { name: /filtros/i });
  fireEvent.submit(formElement);

  const errorMessage = screen.getByTestId("error-message");
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent("Por favor complete los campos requeridos");
});
