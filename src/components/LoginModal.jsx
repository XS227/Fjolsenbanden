"use client";
import { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const accentStyles = {
    cyan: {
        icon: "bg-cyan-500/10 text-cyan-200",
        button: "bg-cyan-500 text-cyan-950 hover:bg-cyan-400",
    },
    emerald: {
        icon: "bg-emerald-500/10 text-emerald-200",
        button: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400",
    },
};
export default function LoginModal({ open, auth, title, description, submitLabel = "Logg inn", usernameLabel = "Brukernavn", passwordLabel = "Passord", accent = "cyan", onClose, }) {
    var _a;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!open) {
            setError(null);
            setUsername("");
            setPassword("");
        }
    }, [open]);
    if (!open) {
        return null;
    }
    const accentStyle = (_a = accentStyles[accent]) !== null && _a !== void 0 ? _a : accentStyles.cyan;
    const handleSubmit = async (event) => {
        var _a;
        event.preventDefault();
        setError(null);
        const result = await auth.login({ username, password });
        if (!result.success) {
            setError((_a = result.error) !== null && _a !== void 0 ? _a : "Kunne ikke logge inn.");
            return;
        }
        setUsername("");
        setPassword("");
        onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    const handleOverlayClick = () => {
        onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    const preventPropagation = (event) => {
        event.stopPropagation();
    };
    return (React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-10" },
        React.createElement("div", { className: "absolute inset-0", onClick: handleOverlayClick, "aria-hidden": "true" }),
        React.createElement("div", { className: "relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur", role: "dialog", "aria-modal": "true", onClick: preventPropagation },
            React.createElement("div", { className: "space-y-6 px-8 py-10" },
                React.createElement("div", { className: `mx-auto flex h-12 w-12 items-center justify-center rounded-full ${accentStyle.icon}` },
                    React.createElement(Lock, { className: "h-5 w-5" })),
                React.createElement("div", { className: "space-y-3 text-center" },
                    React.createElement("h2", { className: "text-2xl font-semibold text-white" }, title),
                    React.createElement("p", { className: "text-sm text-slate-300" }, description)),
                React.createElement("form", { className: "space-y-4", onSubmit: handleSubmit },
                    React.createElement("div", { className: "space-y-2 text-left" },
                        React.createElement(Label, { htmlFor: "login-username", className: "text-slate-200" }, usernameLabel),
                        React.createElement(Input, { id: "login-username", name: "username", type: "text", autoComplete: "username", value: username, onChange: (event) => setUsername(event.target.value), placeholder: "Skriv inn brukernavn", className: "bg-slate-950/40 text-white placeholder:text-slate-400", disabled: auth.isVerifying, required: true })),
                    React.createElement("div", { className: "space-y-2 text-left" },
                        React.createElement(Label, { htmlFor: "login-password", className: "text-slate-200" }, passwordLabel),
                        React.createElement(Input, { id: "login-password", name: "password", type: "password", autoComplete: "current-password", value: password, onChange: (event) => setPassword(event.target.value), placeholder: "Skriv inn passord", className: "bg-slate-950/40 text-white placeholder:text-slate-400", disabled: auth.isVerifying, required: true })),
                    error ? (React.createElement("p", { className: "text-sm text-rose-300" }, error)) : auth.hint ? (React.createElement("p", { className: "text-xs text-slate-400" }, auth.hint)) : null,
                    React.createElement(Button, { type: "submit", className: `w-full ${accentStyle.button}`, disabled: auth.isVerifying }, auth.isVerifying ? (React.createElement(React.Fragment, null,
                        React.createElement(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                        " Verifiserer\u2026")) : (submitLabel)))))));
}
