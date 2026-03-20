import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./ui/App";
import "./ui/styles.css";
import axe from "axe-core";

if (import.meta.env.DEV) {
  import("@axe-core/react").then((axeReact) => {
    axeReact.default(React, ReactDOM, 1000);
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      axe.run(document).then((results) => {
        console.log("Accessibility Violations:", results.violations.length);
        console.log(results.violations);
      });
    }, 1500);
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);