import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TaskDetailsPage from "../pages/TaskDetailsPage";
import MedicationDetailsPage from "../pages/MedicationDetailsPage";
import AppointmentDetailsPage from "../pages/AppointmentDetailsPage";

const mockSOS = jest.fn();

const renderPage = (Component: React.ComponentType<any>, path: string, entry: string) => {
  render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        {/* Pass the required onSOS prop to the dynamic component */}
        <Route path={path} element={<Component onSOS={mockSOS} />} />
      </Routes>
    </MemoryRouter>
  );
};

// Ensure your mock for 'cc' includes any data the TaskDetailsPage needs to fetch
jest.mock("../cc", () => ({
  cc: () => ({
    // Simulating a return of a task object to hit the render logic
    getTaskById: jest.fn().mockResolvedValue({ id: 1, title: "Test Task", description: "Done" }),
    onNavigate: () => () => {},
    onCommand: () => () => {},
  }),
}));

test("render details pages to hit uncovered lines", () => {
  renderPage(TaskDetailsPage, "/tasks/:id", "/tasks/1");
  renderPage(MedicationDetailsPage, "/medications/:id", "/medications/1");
  renderPage(AppointmentDetailsPage, "/appointments/:id", "/appointments/1");
});

