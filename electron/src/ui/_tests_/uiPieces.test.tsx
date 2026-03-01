import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// Add HeaderRow to the imports
// import { StatusItem, ActionButton, HeaderRow } from "../uiPieces"; 
import { StatusItem, ActionButton, HeaderRow } from "../components/uiPieces";

describe("uiPieces Components", () => {
  test("HeaderRow renders title and handles SOS click", () => {
    const handleSOS = jest.fn();
    render(<HeaderRow title="Test Header" onSOS={handleSOS} />);
    
    expect(screen.getByText("Test Header")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /sos/i }));
    expect(handleSOS).toHaveBeenCalled();
  });

  test("StatusItem renders correct text and status", () => {
    render(<StatusItem label="Sync" value="Success" />);
    expect(screen.getByText(/Sync/i)).toBeInTheDocument();
    expect(screen.getByText(/Success/i)).toBeInTheDocument();
  });

  test("ActionButton handles clicks", () => {
    const handleClick = jest.fn();
    render(<ActionButton label="Click Me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});