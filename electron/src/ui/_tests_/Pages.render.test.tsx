import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppointmentsPage from "../pages/AppointmentsPage";
import MedicationsPage from "../pages/MedicationsPage";
import TasksPage from "../pages/TasksPage";

const mockFn = jest.fn();

// Update these lines in src/ui/_tests_/Pages.render.test.tsx
render(<AppointmentsPage onSOS={mockFn} />, { wrapper: PageWrapper });
render(<MedicationsPage onSOS={mockFn} />, { wrapper: PageWrapper });
render(<TasksPage onSOS={mockFn} />, { wrapper: PageWrapper });