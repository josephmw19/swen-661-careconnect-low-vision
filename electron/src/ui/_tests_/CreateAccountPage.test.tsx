import { render, screen, fireEvent } from "@testing-library/react";
import CreateAccountPage from "../pages/CreateAccountPage";
import { MemoryRouter } from "react-router-dom";

test("CreateAccountPage triggers form logic", () => {
  render(<MemoryRouter><CreateAccountPage /></MemoryRouter>);
  const submitBtn = screen.getByRole("button", { name: /create account/i });
  fireEvent.click(submitBtn); // Triggers the logic block in lines 104-227
});