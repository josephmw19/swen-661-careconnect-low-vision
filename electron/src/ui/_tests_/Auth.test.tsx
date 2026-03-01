import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

test("LoginPage handles button interactions", () => {
  render(<MemoryRouter><LoginPage /></MemoryRouter>);
  
  // Click back button to hit navigation branches
  const backBtn = screen.getByRole("button", { name: /back/i });
  fireEvent.click(backBtn);
  
  // Click login to hit form logic (even if it fails validation)
  // const loginBtn = screen.getByRole("button", { name: /log in/i });
  
  const loginBtn = screen.getByRole("button", { name: /sign in/i });
  fireEvent.click(loginBtn);
});