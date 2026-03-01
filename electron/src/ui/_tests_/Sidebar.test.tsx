import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "../components/uiPieces";

test("sidebar handles navigation clicks", () => {
  const onNavigate = jest.fn();
  render(<Sidebar onNavigate={onNavigate} activePath="/" />);

  // Only use buttons that actually exist in your sidebar code
  const settingsBtn = screen.getByRole("button", { name: /settings/i });
  fireEvent.click(settingsBtn);
  
  expect(onNavigate).toHaveBeenCalledWith("/settings");
});