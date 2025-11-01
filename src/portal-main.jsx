import React from "react";
import { createRoot } from "react-dom/client";
import PortalLandingPage from "@/pages/portal-landing.jsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element with id \"root\" was not found.");
}

const root = createRoot(rootElement);
root.render(
  React.createElement(React.StrictMode, null, React.createElement(PortalLandingPage)),
);
