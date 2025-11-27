import React, { useEffect, useRef } from "react";
import bodyHtml from "@/fragments/sponsor-julekalender-body.html?raw";
import "./sponsor-julekalender.css";

export default function SponsorJulekalenderPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const existingCdn = document.querySelector("script[data-tailwind-cdn]");
    if (existingCdn) {
      return undefined;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    script.defer = true;
    script.setAttribute("data-tailwind-cdn", "true");
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const htmlEl = document.documentElement;
    const langButtons = container.querySelectorAll("[data-lang-btn]");
    const yearEl = container.querySelector("#year");

    const setLanguage = (lang) => {
      htmlEl.setAttribute("data-lang", lang);
      htmlEl.setAttribute("lang", lang === "no" ? "no" : "en");
      langButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
      });
    };

    const handleLangClick = (event) => {
      const lang = event.currentTarget.getAttribute("data-lang-btn");
      setLanguage(lang);
    };

    langButtons.forEach((btn) => btn.addEventListener("click", handleLangClick));
    setLanguage("no");

    if (yearEl) {
      yearEl.textContent = new Date().getFullYear().toString();
    }

    return () => {
      langButtons.forEach((btn) => btn.removeEventListener("click", handleLangClick));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="sponsor-julekalender-page"
      dangerouslySetInnerHTML={{ __html: bodyHtml }}
    />
  );
}
