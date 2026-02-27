import { app, BrowserWindow, Menu, dialog, ipcMain } from "electron";
import path from "node:path";

console.log("MAIN ENTRY RUNNING:", __filename, "BUILD:", new Date().toISOString());

const isDev = !app.isPackaged;

let mainWindow: BrowserWindow | null = null;

function createMenu() {
  const template: Electron.MenuItemConstructorOptions[] = [
    ...(process.platform === "darwin"
      ? ([
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideOthers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ] as Electron.MenuItemConstructorOptions[])
      : []),

    {
      label: "File",
      submenu: [
        {
          label: "Open Settings",
          accelerator: "CommandOrControl+,",
          click: () => {
            mainWindow?.webContents.send("cc:navigate", "/settings");
          },
        },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: process.platform === "darwin" ? "Command+Q" : "Alt+F4",
          click: () => app.quit(),
        },
      ],
    },

    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" },
      ],
    },

    {
      label: "View",
      submenu: [
        {
          label: "Refresh",
          accelerator: "CommandOrControl+R",
          click: () => mainWindow?.webContents.reload(),
        },
        {
          label: "Toggle Critical Medical Information",
          accelerator: "CommandOrControl+Shift+C",
          click: () => {
            mainWindow?.webContents.send("cc:command", { type: "toggleCritical" });
          },
        },
        {
          label: "Toggle Read Aloud",
          accelerator: "CommandOrControl+Shift+R",
          click: () => {
            mainWindow?.webContents.send("cc:command", { type: "toggleReadAloud" });
          },
        },
        {
          label: "Toggle Voice Commands",
          accelerator: "CommandOrControl+Shift+V",
          click: () => {
            mainWindow?.webContents.send("cc:command", { type: "toggleVoice" });
          },
        },
        { type: "separator" },
        { role: "togglefullscreen" },

        // DevTools should be visible in dev. Optional in prod.
        ...(isDev ? [{ role: "toggleDevTools" as const }] : []),
      ],
    },

    {
      label: "Navigate",
      submenu: [
        {
          label: "Home (Dashboard)",
          accelerator: "CommandOrControl+1",
          click: () => mainWindow?.webContents.send("cc:navigate", "/"),
        },
        {
          label: "Medications",
          accelerator: "CommandOrControl+2",
          click: () => mainWindow?.webContents.send("cc:navigate", "/medications"),
        },
        {
          label: "Tasks",
          accelerator: "CommandOrControl+3",
          click: () => mainWindow?.webContents.send("cc:navigate", "/tasks"),
        },
        {
          label: "Appointments",
          accelerator: "CommandOrControl+4",
          click: () => mainWindow?.webContents.send("cc:navigate", "/appointments"),
        },
        {
          label: "Settings",
          accelerator: "CommandOrControl+5",
          click: () => mainWindow?.webContents.send("cc:navigate", "/settings"),
        },
        { type: "separator" },
        {
          label: "Focus Sidebar",
          accelerator: "CommandOrControl+L",
          click: () => mainWindow?.webContents.send("cc:command", { type: "focusSidebar" }),
        },
        {
          label: "Skip to Main Content",
          accelerator: "CommandOrControl+K",
          click: () => mainWindow?.webContents.send("cc:command", { type: "skipToMain" }),
        },
      ],
    },

    {
      label: "Help",
      submenu: [
        {
          label: "About CareConnect",
          click: () => mainWindow?.webContents.send("cc:command", { type: "about" }),
        },
        {
          label: "Trigger SOS (Demo)",
          accelerator: "CommandOrControl+Alt+S",
          click: () => mainWindow?.webContents.send("cc:command", { type: "sos" }),
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 800,
    show: false,
    backgroundColor: "#0b0b0b",
    title: "CareConnect Desktop",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,

      // Optional: true is stricter, but can break some setups if you rely on Node APIs in preload incorrectly.
      // Keep your current behavior for now.
      sandbox: false,
    },
  });

  createMenu();

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(process.cwd(), "dist", "index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("cc:showNativeDialog", async (_evt, message: string) => {
  if (!mainWindow) return;
  await dialog.showMessageBox(mainWindow, {
    type: "info",
    title: "CareConnect",
    message,
  });
});