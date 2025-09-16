import React from "react";

import { render, screen } from "@testing-library/react";
import Logo from "../Logo";

describe("Logo Component", () => {
  it("renders the logo correctly", () => {
    render(<Logo />);
    const logoElement = screen.getByRole("img", { name: /logo/i });
    expect(logoElement).toBeInTheDocument();
  });
});
