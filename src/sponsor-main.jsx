import React from "react";
import { createRoot } from "react-dom/client";
import SponsorJulekalenderPage from "@/pages/sponsor-julekalender.jsx";

document.addEventListener("contextmenu", (event) => {
  if (event.target instanceof Element && event.target.closest("input, textarea")) {
    return;
  }
  event.preventDefault();
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element with id "root" was not found.');
}

const root = createRoot(rootElement);
root.render(React.createElement(React.StrictMode, null, React.createElement(SponsorJulekalenderPage)));
