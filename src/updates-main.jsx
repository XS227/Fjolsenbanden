import React from "react";
import { createRoot } from "react-dom/client";
import UpdatesPage from "@/pages/updates.jsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element with id \"root\" was not found.");
}

const root = createRoot(rootElement);
root.render(
  React.createElement(React.StrictMode, null, React.createElement(UpdatesPage)),
);
