import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppointmentDetailsPage from "../pages/AppointmentDetailsPage";
import MedicationDetailsPage from "../pages/MedicationDetailsPage";
import TaskDetailsPage from "../pages/TaskDetailsPage";

const renderWithId = (Component: React.ComponentType, path: string, route: string) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={<Component />} />
      </Routes>
    </MemoryRouter>
  );
};

test("renders details pages to clear 0% coverage", () => {
  renderWithId(AppointmentDetailsPage, "/appointments/:id", "/appointments/1");
  renderWithId(MedicationDetailsPage, "/medications/:id", "/medications/1");
  renderWithId(TaskDetailsPage, "/tasks/:id", "/tasks/1");
});