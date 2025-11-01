import React from "react";
import { createRoot } from "react-dom/client";
import AdminPage from "@/pages/admin.jsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element with id \"root\" was not found.");
}

const root = createRoot(rootElement);
root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(AdminPage, null),
  ),
);
