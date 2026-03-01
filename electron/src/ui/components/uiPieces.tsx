import React from "react";

// Standardize these as named exports
export const QuickActionsBar = (props: any) => (
  <div aria-label="Quick Actions Toolbar" className="quickActions" role="banner">
    <div className="toolbar">
      <button onClick={props.onToggleRead}>Read Aloud</button>
      <button onClick={props.onToggleVoice}>Voice Commands</button>
    </div>
  </div>
);

export const Sidebar = (props: any) => (
  <nav aria-label="Primary Navigation" className="sidebar">
    <div className="appname">CareConnect</div>
    <ul className="navlist">
      <li><button onClick={() => props.onNavigate("/settings")}>Settings</button></li>
    </ul>
  </nav>
);

export const StatusBar = (props: any) => (
  <footer aria-label="Status Bar" className="statusbar">
    <div>Last sync: {props.lastSync}</div>
  </footer>
);

export const HeaderRow = (props: any) => (
  <div className="headerRow">
    <h1>{props.title}</h1>
    <button onClick={props.onSOS}>SOS</button>
  </div>
);