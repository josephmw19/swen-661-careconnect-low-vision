import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import SettingsPage from "../pages/SettingsPage";


// Mock react-router navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockNavigate,
}));

describe("SettingsPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders header, subtitle, and main sections", () => {
    render(
      <SettingsPage
        readAloud={false}
        voiceCommands={false}
        onToggleRead={jest.fn()}
        onToggleVoice={jest.fn()}
        onSOS={jest.fn()}
      />
    );

    expect(screen.getByRole("heading", { name: /settings/i })).toBeInTheDocument();
    expect(
      screen.getByText(/adjust display, interaction, and accessibility preferences/i)
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/vision and display settings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/read aloud and voice settings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/keyboard and navigation settings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/account and system settings/i)).toBeInTheDocument();
  });

  test("calls onSOS when SOS button in header is clicked", () => {
    const onSOS = jest.fn();

    render(
      <SettingsPage
        readAloud={false}
        voiceCommands={false}
        onToggleRead={jest.fn()}
        onToggleVoice={jest.fn()}
        onSOS={onSOS}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /sos emergency/i }));
    expect(onSOS).toHaveBeenCalledTimes(1);
  });

  test("calls onToggleRead and onToggleVoice when those toggles are clicked", () => {
    const onToggleRead = jest.fn();
    const onToggleVoice = jest.fn();

    render(
      <SettingsPage
        readAloud={false}
        voiceCommands={false}
        onToggleRead={onToggleRead}
        onToggleVoice={onToggleVoice}
        onSOS={jest.fn()}
      />
    );

    const readRow = screen.getByText(/read screen aloud/i).closest(".setRow");
    expect(readRow).toBeTruthy();
    const readToggle = readRow!.querySelector("button.setToggle") as HTMLButtonElement;
    fireEvent.click(readToggle);
    expect(onToggleRead).toHaveBeenCalledTimes(1);

    // There are multiple "Off" buttons, so target by nearby label text
    const readAloudSection = screen.getByRole("region", {
  name: /read aloud and voice settings/i,
});

    const voiceLabel = within(readAloudSection).getByText("Voice Commands", {
    selector: ".setLabel",
    });
    const voiceRow = voiceLabel.closest(".setRow");
    expect(voiceRow).toBeTruthy();
    const voiceOffBtn = voiceRow!.querySelector("button.setToggle") as HTMLButtonElement;
    fireEvent.click(voiceOffBtn);
    expect(onToggleVoice).toHaveBeenCalledTimes(1);
  });

  test("segmented controls change aria-pressed states", () => {
    render(
      <SettingsPage
        readAloud={false}
        voiceCommands={false}
        onToggleRead={jest.fn()}
        onToggleVoice={jest.fn()}
        onSOS={jest.fn()}
      />
    );

    // Text Size defaults to Large, click Maximum
    const textSizeGroup = screen.getByRole("group", { name: /text size/i });
    const maxBtn = within(textSizeGroup).getByRole("button", { name: "Maximum" });
    fireEvent.click(maxBtn);
    expect(maxBtn).toHaveAttribute("aria-pressed", "true");

    // Speech Speed defaults to Normal, click Fast
    const fastBtn = screen.getByRole("button", { name: "Fast" });
    fireEvent.click(fastBtn);
    expect(fastBtn).toHaveAttribute("aria-pressed", "true");
  });

  test("opens shortcut reference modal and closes via close button", () => {
    render(
      <SettingsPage
        readAloud={false}
        voiceCommands={false}
        onToggleRead={jest.fn()}
        onToggleVoice={jest.fn()}
        onSOS={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /view shortcut reference/i }));

    expect(
      screen.getByRole("dialog", { name: /keyboard shortcut reference/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close shortcut reference/i }));

    expect(
      screen.queryByRole("dialog", { name: /keyboard shortcut reference/i })
    ).not.toBeInTheDocument();
  });

  test("closes shortcut modal when clicking overlay", () => {
    render(
      <SettingsPage
        readAloud={false}
        voiceCommands={false}
        onToggleRead={jest.fn()}
        onToggleVoice={jest.fn()}
        onSOS={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /view shortcut reference/i }));
    const dialog = screen.getByRole("dialog", { name: /keyboard shortcut reference/i });

    // overlay is the dialog element itself (modalOverlay)
    fireEvent.click(dialog);

    expect(
      screen.queryByRole("dialog", { name: /keyboard shortcut reference/i })
    ).not.toBeInTheDocument();
  });

  test("closes shortcut modal on Escape key when open", () => {
    render(
      <SettingsPage
        readAloud={false}
        voiceCommands={false}
        onToggleRead={jest.fn()}
        onToggleVoice={jest.fn()}
        onSOS={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /view shortcut reference/i }));
    expect(
      screen.getByRole("dialog", { name: /keyboard shortcut reference/i })
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(
      screen.queryByRole("dialog", { name: /keyboard shortcut reference/i })
    ).not.toBeInTheDocument();
  });

  test("Sign Out navigates to /landing", () => {
    render(
      <SettingsPage
        readAloud={false}
        voiceCommands={false}
        onToggleRead={jest.fn()}
        onToggleVoice={jest.fn()}
        onSOS={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /sign out/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/landing");
  });

  test("Manage Password and Manage Notifications call onSOS", () => {
    const onSOS = jest.fn();

    render(
      <SettingsPage
        readAloud={false}
        voiceCommands={false}
        onToggleRead={jest.fn()}
        onToggleVoice={jest.fn()}
        onSOS={onSOS}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /manage password/i }));
    fireEvent.click(screen.getByRole("button", { name: /manage notifications/i }));

    expect(onSOS).toHaveBeenCalledTimes(2);
  });
});