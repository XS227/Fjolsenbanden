"use client";

import React from "react";
import LoginModal from "@/components/LoginModal";
import { SiteConfigProvider } from "@/fragments/admin/context/SiteConfigContext";
import AdminShell from "@/fragments/admin/AdminShell";
import { useAdminAuth } from "@/lib/admin-auth";

export default function AdminDashboard() {
    const auth = useAdminAuth();

    if (!auth.state.isAuthenticated) {
        return (
            React.createElement("div", { className: "min-h-screen bg-slate-100" },
                React.createElement(LoginModal, {
                    open: true,
                    auth: auth,
                    title: "Admininnlogging",
                    description: "Logg inn med oppgitt brukernavn og passord for å administrere siden.",
                    accent: "emerald",
                }))
        );
    }

    return (
        React.createElement(SiteConfigProvider, null,
            React.createElement(AdminShell, null))
    );
}
