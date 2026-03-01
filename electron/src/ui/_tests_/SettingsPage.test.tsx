import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SettingsPage from "../pages/SettingsPage";

jest.mock("../components/uiPieces", () => ({
  HeaderRow: ({ title }: any) => <h1>{title}</h1>,
}));

test("SettingsPage interaction push", () => {
  const props = { 
    readAloud: false, voiceCommands: false, 
    onToggleRead: jest.fn(), onToggleVoice: jest.fn(), onSOS: jest.fn() 
  };
  render(<MemoryRouter><SettingsPage {...props} /></MemoryRouter>);

  // 1. Click all toggles to hit state branches (Lines 142-269)
  const toggles = screen.getAllByRole("button", { name: /On|Off/i });
  toggles.forEach(t => fireEvent.click(t));

  // 2. Click segmented buttons (Text Size / Spacing)
  fireEvent.click(screen.getByText("Extra Large"));
  fireEvent.click(screen.getByText("Relaxed"));

  // 3. Open and close Modal (Lines 309-341)
  fireEvent.click(screen.getByText(/View Shortcut Reference/i));
  expect(screen.getByText("Keyboard Shortcuts")).toBeInTheDocument();
  
  fireEvent.click(screen.getByLabelText(/Close shortcut reference/i));
  expect(screen.queryByText("Keyboard Shortcuts")).not.toBeInTheDocument();
});